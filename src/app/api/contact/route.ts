import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { services } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  projectUrl?: unknown;
  service?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  website?: unknown;
  consent?: unknown;
};

type CleanInquiry = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectUrl: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const requestLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_RATE_KEYS = 5_000;
const MAX_BODY_BYTES = 50_000;
let lastRatePruneAt = Date.now();
const allowedServices = new Set([
  ...services.map((service) => service.slug),
  "courses",
  "internship",
  "career",
  "other"
]);

class BodyTooLargeError extends Error {}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isInquiryPayload(value: unknown): value is InquiryPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validate(payload: InquiryPayload) {
  const inquiry = {
    name: asString(payload.name),
    email: asString(payload.email).toLowerCase(),
    phone: asString(payload.phone),
    company: asString(payload.company),
    projectUrl: asString(payload.projectUrl),
    service: asString(payload.service),
    budget: asString(payload.budget),
    timeline: asString(payload.timeline),
    message: asString(payload.message),
    website: asString(payload.website),
    consent: asString(payload.consent)
  };
  const errors: string[] = [];

  if (inquiry.name.length < 2 || inquiry.name.length > 80) {
    errors.push("Please enter a name between 2 and 80 characters.");
  }
  if (
    inquiry.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)
  ) {
    errors.push("Please enter a valid email address.");
  }
  if (inquiry.phone.length > 30) errors.push("The phone number is too long.");
  if (inquiry.company.length > 100) errors.push("The company name is too long.");
  if (inquiry.projectUrl.length > 300) {
    errors.push("The website address is too long.");
  }
  if (inquiry.projectUrl && !/^https?:\/\/[^\s]+$/i.test(inquiry.projectUrl)) {
    errors.push(
      "Please enter a full website address beginning with http:// or https://."
    );
  }
  if (!allowedServices.has(inquiry.service)) {
    errors.push("Please choose a service.");
  }
  if (inquiry.budget.length > 40) errors.push("The budget value is invalid.");
  if (inquiry.timeline.length > 40) errors.push("The timeline value is invalid.");
  if (inquiry.message.length < 20 || inquiry.message.length > 4000) {
    errors.push("Please share between 20 and 4,000 characters about the project.");
  }
  if (inquiry.consent !== "accepted") {
    errors.push("Please confirm that we may respond to your enquiry.");
  }

  return { inquiry, errors };
}

function pruneRateLog(now: number) {
  for (const [key, timestamps] of requestLog) {
    const recent = timestamps.filter(
      (timestamp) => now - timestamp < RATE_WINDOW_MS
    );
    if (recent.length === 0) requestLog.delete(key);
    else requestLog.set(key, recent);
  }

  while (requestLog.size >= MAX_RATE_KEYS) {
    const oldestKey = requestLog.keys().next().value as string | undefined;
    if (!oldestKey) break;
    requestLog.delete(oldestKey);
  }
}

function isRateLimited(key: string) {
  const now = Date.now();
  if (
    requestLog.size >= MAX_RATE_KEYS ||
    now - lastRatePruneAt >= RATE_WINDOW_MS
  ) {
    pruneRateLog(now);
    lastRatePruneAt = now;
  }
  const recent = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

function getRateKey(request: Request) {
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const candidate =
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwardedFor ||
    "local";

  return candidate.slice(0, 128);
}

async function readLimitedBody(request: Request) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers?: HeadersInit
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      ...Object.fromEntries(new Headers(headers))
    }
  });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      })[character] ?? character
  );
}

async function sendWithResend(inquiry: CleanInquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const configuredValues = [apiKey, to, from].filter(Boolean).length;
  if (configuredValues === 0) return false;
  if (configuredValues !== 3) {
    throw new Error("Contact email delivery is only partially configured.");
  }

  const fields = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone || "Not supplied"],
    ["Company", inquiry.company || "Not supplied"],
    ["Website / product URL", inquiry.projectUrl || "Not supplied"],
    ["Service", inquiry.service],
    ["Budget", inquiry.budget || "Not decided"],
    ["Timeline", inquiry.timeline || "Open"]
  ];
  const htmlRows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 16px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inquiry.email,
      subject: `New DevSectors enquiry: ${inquiry.service}`,
      text: `${fields.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${inquiry.message}`,
      html: `<h2>New DevSectors website enquiry</h2><table>${htmlRows}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</p><p>Reference: ${inquiry.id}</p>`
    })
  });

  if (!response.ok) {
    throw new Error("Configured email delivery returned an error.");
  }

  return true;
}

async function persistLocally(inquiry: CleanInquiry) {
  const relativePath = process.env.CONTACT_STORAGE_PATH || ".data/inquiries.ndjson";
  const root = path.resolve(process.cwd());
  const target = path.resolve(root, relativePath);

  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    throw new Error("CONTACT_STORAGE_PATH must remain inside the application root.");
  }

  await mkdir(path.dirname(target), { recursive: true, mode: 0o700 });
  const file = await open(target, "a", 0o600);
  try {
    await file.chmod(0o600);
    await file.appendFile(`${JSON.stringify(inquiry)}\n`, "utf8");
  } finally {
    await file.close();
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return jsonResponse(
      { message: "This endpoint accepts JSON requests only." },
      415
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse(
      { message: "The submitted project brief is too large." },
      413
    );
  }

  const rateKey = getRateKey(request);
  if (isRateLimited(rateKey)) {
    return jsonResponse(
      { message: "Too many messages were sent. Please try again in ten minutes." },
      429,
      { "Retry-After": String(RATE_WINDOW_MS / 1000) }
    );
  }

  let payload: InquiryPayload;
  try {
    const rawBody = await readLimitedBody(request);
    const parsed: unknown = JSON.parse(rawBody);
    if (!isInquiryPayload(parsed)) {
      return jsonResponse({ message: "Invalid request body." }, 400);
    }
    payload = parsed;
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return jsonResponse(
        { message: "The submitted project brief is too large." },
        413
      );
    }
    return jsonResponse({ message: "Invalid request body." }, 400);
  }

  const { inquiry, errors } = validate(payload);

  // Quietly accept bot submissions caught by the honeypot without storing them.
  if (inquiry.website) {
    return jsonResponse({ message: "Thanks — your message was received." });
  }

  if (errors.length > 0) {
    return jsonResponse(
      { message: "Please correct the highlighted information.", errors },
      400
    );
  }

  const cleanInquiry: CleanInquiry = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    company: inquiry.company,
    projectUrl: inquiry.projectUrl,
    service: inquiry.service,
    budget: inquiry.budget,
    timeline: inquiry.timeline,
    message: inquiry.message
  };

  try {
    const sent = await sendWithResend(cleanInquiry);
    if (!sent) await persistLocally(cleanInquiry);
  } catch (error) {
    console.error("Contact enquiry delivery failed.", {
      inquiryId: cleanInquiry.id,
      error: error instanceof Error ? error.message : "Unknown delivery error"
    });
    return jsonResponse(
      {
        message:
          "We could not safely store the message. Please email devsectors@gmail.com."
      },
      500
    );
  }

  return jsonResponse({
    message: "Thanks — we will review your brief and reply within two business days."
  });
}
