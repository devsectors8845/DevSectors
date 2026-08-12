import { spawn } from "node:child_process";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3100";
const profileDirectory = "/tmp/devsectors-browser-smoke-profile";
const chrome = spawn(
  process.env.CHROME_PATH ?? "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-extensions",
    "--disable-background-networking",
    `--user-data-dir=${profileDirectory}`,
    "--window-size=390,844",
    "--remote-debugging-pipe",
    "about:blank"
  ],
  { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] }
);

let sequence = 0;
let buffer = "";
const pending = new Map();
const events = [];
const failures = [];
let stderr = "";
let started = false;

chrome.stderr.setEncoding("utf8");
chrome.stderr.on("data", (chunk) => {
  stderr += chunk;
});

chrome.stdio[4].setEncoding("utf8");
chrome.stdio[4].on("data", (chunk) => {
  buffer += chunk;
  let boundary = buffer.indexOf("\0");
  while (boundary !== -1) {
    const raw = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary + 1);
    if (raw) {
      const message = JSON.parse(raw);
      if (message.id) {
        const waiter = pending.get(message.id);
        if (waiter) {
          pending.delete(message.id);
          if (message.error) {
            waiter.reject(message.error);
          } else {
            waiter.resolve(message.result);
          }
        }
      } else if (message.method) {
        events.push(message);
      }
    }
    boundary = buffer.indexOf("\0");
  }
});

function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out waiting for ${method}`));
    }, 10_000);
    pending.set(id, {
      resolve: (result) => {
        clearTimeout(timeout);
        resolve(result);
      },
      reject: (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    });
    chrome.stdio[3].write(
      `${JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })}\0`
    );
  });
}

async function waitForLoad(sessionId) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const index = events.findIndex(
      (event) =>
        event.sessionId === sessionId && event.method === "Page.loadEventFired"
    );
    if (index >= 0) {
      events.splice(index, 1);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error("Page load event timed out");
}

async function evaluate(sessionId, expression) {
  const result = await send(
    "Runtime.evaluate",
    { expression, awaitPromise: true, returnByValue: true },
    sessionId
  );
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description ??
        result.exceptionDetails.text ??
        "Browser evaluation failed"
    );
  }
  return result.result.value;
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function navigate(sessionId, path) {
  events.length = 0;
  await send("Page.navigate", { url: `${baseUrl}${path}` }, sessionId);
  await waitForLoad(sessionId);
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const ready = await evaluate(
      sessionId,
      `document.readyState === 'complete' && !document.querySelector('[role="status"][aria-busy="true"]')`
    );
    if (ready) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`Hydration timed out for ${path}`);
}

async function run() {
  await send("Browser.getVersion");
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send(
    "Target.attachToTarget",
    { targetId, flatten: true }
  );
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send("Log.enable", {}, sessionId);

  await navigate(sessionId, "/");
  const initial = await evaluate(
    sessionId,
    `({
      title: document.title,
      mainCount: document.querySelectorAll('main#main-content').length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      menuButton: Boolean(document.querySelector('button[aria-controls="mobile-primary-navigation"]'))
    })`
  );
  assert(initial.title.includes("DevSectors"), "Homepage title is missing");
  assert(initial.mainCount === 1, "Homepage must have one main landmark");
  assert(!initial.overflow, "Homepage has horizontal overflow at 390px");
  assert(initial.menuButton, "Mobile menu button is missing");

  const opened = await evaluate(
    sessionId,
    `(async () => {
      const button = document.querySelector('button[aria-controls="mobile-primary-navigation"]');
      button.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        expanded: button.getAttribute('aria-expanded'),
        menu: Boolean(document.querySelector('#mobile-primary-navigation'))
      };
    })()`
  );
  assert(opened.expanded === "true" && opened.menu, "Mobile navigation did not open");
  const escaped = await evaluate(
    sessionId,
    `(async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 100));
      const button = document.querySelector('button[aria-controls="mobile-primary-navigation"]');
      return { expanded: button.getAttribute('aria-expanded'), menu: Boolean(document.querySelector('#mobile-primary-navigation')) };
    })()`
  );
  assert(escaped.expanded === "false" && !escaped.menu, "Escape did not close mobile navigation");

  const planner = await evaluate(
    sessionId,
    `(async () => {
      const plannerRoot = [...document.querySelectorAll('h3')]
        .find(h => h.textContent.includes('What needs to move forward?'))
        ?.closest('.overflow-hidden');
      if (!plannerRoot) return { found: false };
      const firstChoice = [...plannerRoot.querySelectorAll('button')].find(item => item.textContent.includes('Launch a digital product'));
      firstChoice.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      const selected = [...plannerRoot.querySelectorAll('button')].find(item => item.textContent.includes('Launch a digital product'));
      const continueButton = [...plannerRoot.querySelectorAll('button')].find(item => item.textContent.includes('Continue'));
      return {
        found: true,
        selected: selected?.getAttribute('aria-pressed') ?? '',
        continueEnabled: Boolean(continueButton && !continueButton.disabled)
      };
    })()`
  );
  assert(planner.found, "Project planner was not found");
  assert(planner.selected === "true", "Project planner did not retain its selected option");
  assert(planner.continueEnabled, "Project planner did not enable its next action");

  await navigate(sessionId, "/insights");
  const insightFilter = await evaluate(
    sessionId,
    `(() => {
      const input = document.querySelector('#insight-search');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'cloud reliability');
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      return true;
    })()`
  );
  const insightFilterRendered = await evaluate(
    sessionId,
    `(async () => {
      await new Promise(resolve => setTimeout(resolve, 120));
      return {
        count: document.querySelector('#insight-results')?.children.length ?? 0,
        text: document.body.innerText
      };
    })()`
  );
  assert(insightFilter === true && insightFilterRendered.count === 1, "Insight search did not narrow to one result");
  assert(insightFilterRendered.text.includes("A practical cloud reliability checklist"), "Expected insight result is missing");

  await navigate(sessionId, "/work");
  const workFilter = await evaluate(
    sessionId,
    `(() => {
      const button = [...document.querySelectorAll('button')].find(item => item.textContent.trim() === 'Startups and SaaS');
      if (!button) return { found: false };
      button.click();
      return {
        found: true,
        initialPressed: button.getAttribute('aria-pressed')
      };
    })()`
  );
  const workFilterRendered = await evaluate(
    sessionId,
    `(async () => {
      await new Promise(resolve => setTimeout(resolve, 120));
      const button = [...document.querySelectorAll('button')].find(item => item.textContent.trim() === 'Startups and SaaS');
      return {
        pressed: button?.getAttribute('aria-pressed'),
        status: [...document.querySelectorAll('[aria-live="polite"]')]
          .map(item => item.textContent.trim())
          .find(text => text.startsWith('Showing')) ?? ''
      };
    })()`
  );
  assert(workFilter.found && workFilterRendered.pressed === "true", "Work sector filter did not activate");
  assert(/^Showing \d+ representative scenarios?$/.test(workFilterRendered.status), "Work filter count was not updated");

  await navigate(
    sessionId,
    "/contact?service=custom-software-development&brief=QA%20prefilled%20brief%20with%20enough%20detail"
  );
  const contact = await evaluate(
    sessionId,
    `({
      service: document.querySelector('select[name="service"]')?.value,
      message: document.querySelector('textarea[name="message"]')?.value,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    })`
  );
  assert(contact.service === "custom-software-development", "Contact service was not prefilled");
  assert(contact.message.includes("QA prefilled brief"), "Contact brief was not prefilled");
  assert(!contact.overflow, "Contact page has horizontal overflow at 390px");

  const severeConsoleEvents = events.filter(
    (event) =>
      (event.method === "Log.entryAdded" && ["error", "warning"].includes(event.params.entry.level)) ||
      event.method === "Runtime.exceptionThrown"
  );
  assert(severeConsoleEvents.length === 0, `Browser console reported ${severeConsoleEvents.length} warning/error event(s)`);

  console.log(
    JSON.stringify(
      { ok: failures.length === 0, initial, opened, escaped, planner, insightCount: insightFilterRendered.count, workFilter: { found: workFilter.found, pressed: workFilterRendered.pressed }, contact, failures },
      null,
      2
    )
  );
  await send("Browser.close");
  if (failures.length > 0) process.exitCode = 1;
}

const startup = setTimeout(() => {
  console.error(stderr || "Chrome did not accept remote debugging commands");
  chrome.kill("SIGKILL");
  process.exit(1);
}, 10_000);

async function start() {
  if (started) return;
  started = true;
  clearTimeout(startup);
  try {
    await run();
  } catch (error) {
    console.error(error);
    console.error(stderr);
    chrome.kill("SIGKILL");
    process.exitCode = 1;
  }
}

chrome.once("spawn", start);
