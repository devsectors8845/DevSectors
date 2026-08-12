"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCcw,
  Sparkles
} from "lucide-react";

type Option = {
  value: string;
  label: string;
  description: string;
};

type PlannerStep = {
  key: "goal" | "stage" | "pace";
  eyebrow: string;
  question: string;
  options: Option[];
};

const steps: PlannerStep[] = [
  {
    key: "goal",
    eyebrow: "01 / Outcome",
    question: "What needs to move forward?",
    options: [
      {
        value: "launch-product",
        label: "Launch a digital product",
        description: "A new SaaS, portal, marketplace, or internal platform."
      },
      {
        value: "automate-work",
        label: "Automate repetitive work",
        description: "Connect tools, reduce manual steps, or add practical AI."
      },
      {
        value: "modernize-web",
        label: "Modernise a web presence",
        description: "Improve speed, clarity, conversion, and manageability."
      },
      {
        value: "improve-experience",
        label: "Improve a product experience",
        description: "Research, redesign, and simplify an existing journey."
      }
    ]
  },
  {
    key: "stage",
    eyebrow: "02 / Starting point",
    question: "Where are you today?",
    options: [
      {
        value: "idea",
        label: "Early idea",
        description: "The opportunity is clear, but the scope is still open."
      },
      {
        value: "designed",
        label: "Requirements or designs",
        description: "You have material ready for technical review and build."
      },
      {
        value: "existing",
        label: "Existing product",
        description: "There is live software, data, or a legacy system to evolve."
      }
    ]
  },
  {
    key: "pace",
    eyebrow: "03 / Delivery pace",
    question: "What kind of timeline fits?",
    options: [
      {
        value: "focused",
        label: "Focused first release",
        description: "Prioritise one valuable outcome and learn quickly."
      },
      {
        value: "planned",
        label: "Planned multi-stage build",
        description: "Coordinate a broader scope across clear milestones."
      },
      {
        value: "continuous",
        label: "Ongoing product support",
        description: "Add a reliable delivery layer to an active roadmap."
      }
    ]
  }
];

const recommendations: Record<
  string,
  { service: string; title: string; summary: string }
> = {
  "launch-product": {
    service: "custom-software-development",
    title: "Product discovery + custom software",
    summary:
      "Start with a compact discovery sprint, then shape the smallest release that can create real user value."
  },
  "automate-work": {
    service: "ai-workflow-automation",
    title: "Automation opportunity sprint",
    summary:
      "Map the workflow, identify the safest high-leverage step, and prototype the automation before scaling it."
  },
  "modernize-web": {
    service: "web-experience-design",
    title: "Web strategy + engineering",
    summary:
      "Align content, conversion goals, SEO, and the technical platform in one modernisation plan."
  },
  "improve-experience": {
    service: "web-experience-design",
    title: "Product experience audit",
    summary:
      "Combine user-journey evidence with interface and accessibility review, then prioritise the highest-impact improvements."
  }
};

function getOptionLabel(stepKey: PlannerStep["key"], value: string) {
  return steps
    .find((step) => step.key === stepKey)
    ?.options.find((option) => option.value === value)?.label;
}

export function ProjectPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusStepRef = useRef(false);
  const finished = currentStep >= steps.length;
  const step = steps[Math.min(currentStep, steps.length - 1)];

  const recommendation = recommendations[answers.goal] ?? recommendations["launch-product"];
  const contactHref = useMemo(() => {
    if (!finished) return "/contact";
    const brief = [
      "Project planner summary:",
      `Goal: ${getOptionLabel("goal", answers.goal) ?? "Not selected"}`,
      `Starting point: ${getOptionLabel("stage", answers.stage) ?? "Not selected"}`,
      `Preferred pace: ${getOptionLabel("pace", answers.pace) ?? "Not selected"}`
    ].join("\n");
    const params = new URLSearchParams({
      service: recommendation.service,
      brief
    });
    return `/contact?${params.toString()}`;
  }, [answers, finished, recommendation.service]);

  useEffect(() => {
    if (!shouldFocusStepRef.current) return;
    shouldFocusStepRef.current = false;
    stepHeadingRef.current?.focus();
  }, [currentStep]);

  function choose(value: string) {
    setAnswers((current) => ({ ...current, [step.key]: value }));
  }

  function reset() {
    setAnswers({});
    shouldFocusStepRef.current = true;
    setCurrentStep(0);
  }

  function moveToStep(nextStep: number) {
    shouldFocusStepRef.current = true;
    setCurrentStep(nextStep);
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white text-ink shadow-2xl">
      <div className="grid lg:grid-cols-[16rem_1fr]">
        <aside
          className="sector-grid bg-ink p-6 text-white sm:p-8"
          aria-labelledby="planner-overview-heading"
        >
          <span className="eyebrow text-signal">Project fit</span>
          <h3
            id="planner-overview-heading"
            className="font-display mt-6 text-3xl font-black leading-none tracking-[-0.04em]"
          >
            Build a useful starting brief.
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/55">
            Three decisions. About one minute. No account or email required.
          </p>

          <ol className="mt-10 space-y-3" aria-label="Planner progress">
            {steps.map((item, index) => {
              const complete = currentStep > index;
              const active = currentStep === index;
              return (
                <li
                  key={item.key}
                  aria-current={active ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                    active
                      ? "border-signal/60 bg-signal/10 text-white"
                      : "border-white/10 text-white/55"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.65rem] font-bold ${
                      complete
                        ? "bg-signal text-ink"
                        : active
                          ? "border border-signal text-signal"
                          : "border border-white/20"
                    }`}
                  >
                    {complete ? <Check aria-hidden="true" className="size-4" /> : index + 1}
                  </span>
                  {item.key === "goal"
                    ? "Outcome"
                    : item.key === "stage"
                      ? "Starting point"
                      : "Delivery pace"}
                  {complete && <span className="sr-only"> — complete</span>}
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="min-h-[35rem] p-5 sm:p-9 lg:p-12">
          {!finished ? (
            <div className="flex h-full flex-col">
              <div>
                <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-mineral">
                  {step.eyebrow}
                </span>
                <h3
                  ref={stepHeadingRef}
                  id={`planner-${step.key}-heading`}
                  tabIndex={-1}
                  className="font-display mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl"
                >
                  {step.question}
                </h3>
              </div>

              <div
                className="mt-8 grid gap-3 sm:grid-cols-2"
                role="group"
                aria-labelledby={`planner-${step.key}-heading`}
              >
                {step.options.map((option) => {
                  const selected = answers[step.key] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(option.value)}
                      className={`min-h-32 rounded-2xl border p-5 text-left transition ${
                        selected
                          ? "border-mineral bg-mist/55 ring-4 ring-mineral/10"
                          : "border-muted bg-canvas hover:border-ink hover:bg-paper"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <strong className="text-base leading-5">{option.label}</strong>
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-mineral bg-mineral text-white"
                              : "border-ink/20"
                          }`}
                        >
                          {selected && <Check aria-hidden="true" className="size-3" />}
                        </span>
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-muted">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                <button
                  type="button"
                  onClick={() => moveToStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="button-base button-outline disabled:invisible"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => moveToStep(currentStep + 1)}
                  disabled={!answers[step.key]}
                  className="button-base button-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentStep === steps.length - 1 ? "See starting point" : "Continue"}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-signal text-ink">
                <Sparkles aria-hidden="true" className="size-5" />
              </span>
              <span className="font-mono mt-8 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-mineral">
                Suggested starting point
              </span>
              <h3
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl"
              >
                {recommendation.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                {recommendation.summary}
              </p>

              <dl className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {(["goal", "stage", "pace"] as const).map((key) => (
                  <div key={key} className="rounded-xl bg-paper p-4">
                    <dt className="font-mono text-[0.58rem] font-bold uppercase tracking-wider text-muted">
                      {key === "goal" ? "Outcome" : key === "stage" ? "Stage" : "Pace"}
                    </dt>
                    <dd className="mt-2 text-sm font-bold leading-5">
                      {getOptionLabel(key, answers[key])}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={contactHref} className="button-base button-dark">
                  Send this brief
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <button type="button" onClick={reset} className="button-base button-outline">
                  <RefreshCcw aria-hidden="true" className="size-4" />
                  Start again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
