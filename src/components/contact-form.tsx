"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

type ServiceOption = {
  slug: string;
  title: string;
};

type ContactFormProps = {
  serviceOptions: ServiceOption[];
  defaultService?: string;
  defaultMessage?: string;
  compact?: boolean;
};

type FormStatus =
  | { state: "idle"; message: "" }
  | { state: "submitting"; message: string }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-muted bg-white px-4 text-[0.95rem] text-ink shadow-sm transition placeholder:text-muted hover:border-ink focus:border-mineral focus:ring-4 focus:ring-mineral/10";

export function ContactForm({
  serviceOptions,
  defaultService = "",
  defaultMessage = "",
  compact = false
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const shouldReturnToFormRef = useRef(false);

  useEffect(() => {
    if (status.state === "success") {
      successRef.current?.focus();
      return;
    }

    if (status.state === "idle" && shouldReturnToFormRef.current) {
      shouldReturnToFormRef.current = false;
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="name"]')
        ?.focus();
    }
  }, [status.state]);

  function sendAnotherMessage() {
    shouldReturnToFormRef.current = true;
    setStatus({ state: "idle", message: "" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({
      state: "submitting",
      message: "Sending your project brief…"
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const payload = (await response.json()) as {
        message?: string;
        errors?: string[];
      };

      if (!response.ok) {
        throw new Error(
          payload.errors?.[0] ??
            payload.message ??
            "We could not send your message. Please try again."
        );
      }

      form.reset();
      setStatus({
        state: "success",
        message:
          payload.message ?? "Thanks — your project brief is safely on its way."
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email devsectors@gmail.com instead."
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={successRef}
        className="flex min-h-[28rem] flex-col items-start justify-center rounded-[1.5rem] border border-signal-dark/30 bg-signal/20 p-7 sm:p-10"
        role="region"
        aria-labelledby="contact-success-heading"
        aria-describedby="contact-success-message"
        tabIndex={-1}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-ink text-signal">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h2
          id="contact-success-heading"
          className="font-display mt-7 text-4xl font-black tracking-[-0.045em] text-ink"
        >
          Brief received.
        </h2>
        <p
          id="contact-success-message"
          className="mt-4 max-w-md leading-7 text-muted"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
        <button
          type="button"
          className="button-base button-dark mt-8"
          onClick={sendAnotherMessage}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-label="Project enquiry"
      aria-busy={status.state === "submitting"}
      className={`rounded-[1.5rem] border border-ink/10 bg-paper shadow-soft ${
        compact ? "p-5 sm:p-7" : "p-5 sm:p-8 lg:p-10"
      }`}
    >
      <p className="mb-5 text-xs leading-5 text-muted">
        Fields marked <span aria-hidden="true">*</span> are required.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-ink">
          Your name <span aria-hidden="true" className="text-coral-ink">*</span>
          <input
            className={inputClass}
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="Full name"
            required
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Work email <span aria-hidden="true" className="text-coral-ink">*</span>
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            required
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Phone / WhatsApp
          <input
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Optional"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Company
          <input
            className={inputClass}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={100}
            placeholder="Company or project name"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          What can we help with?{" "}
          <span aria-hidden="true" className="text-coral-ink">*</span>
          <select
            className={inputClass}
            name="service"
            defaultValue={defaultService}
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="courses">Courses and training</option>
            <option value="internship">Internship programme</option>
            <option value="career">Career opportunity</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <label className="text-sm font-bold text-ink">
          Approximate budget
          <select className={inputClass} name="budget" defaultValue="">
            <option value="">Not decided yet</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000–$5,000</option>
            <option value="5k-15k">$5,000–$15,000</option>
            <option value="15k-plus">$15,000+</option>
          </select>
        </label>
        <label className="text-sm font-bold text-ink">
          Current website / product URL
          <input
            className={inputClass}
            name="projectUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            maxLength={300}
            placeholder="https://example.com"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Ideal timeline
          <select className={inputClass} name="timeline" defaultValue="">
            <option value="">Open / still exploring</option>
            <option value="asap">As soon as possible</option>
            <option value="1-2-months">Within 1–2 months</option>
            <option value="3-6-months">Within 3–6 months</option>
            <option value="later">More than 6 months away</option>
          </select>
        </label>
        <label className="text-sm font-bold text-ink sm:col-span-2">
          Tell us about the problem{" "}
          <span aria-hidden="true" className="text-coral-ink">*</span>
          <textarea
            className={`${inputClass} min-h-36 resize-y py-3.5`}
            name="message"
            defaultValue={defaultMessage}
            minLength={20}
            maxLength={4000}
            placeholder="What are you trying to improve, who is it for, and what would a useful first release look like?"
            required
          />
        </label>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          className="mt-1 size-4 shrink-0 accent-mineral"
          name="consent"
          type="checkbox"
          value="accepted"
          required
        />
        <span>
          I agree that DevSectors may use these details to respond to this enquiry.
          No mailing-list opt-in is implied.{" "}
          <span aria-hidden="true" className="text-coral-ink">*</span>
        </span>
      </label>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="button-base button-dark min-w-44 disabled:cursor-wait disabled:opacity-65"
        >
          {status.state === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send project brief
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
        <p className="max-w-xs text-xs leading-5 text-muted">
          Prefer email? Write directly to{" "}
          <a
            className="font-bold text-mineral underline underline-offset-4"
            href="mailto:devsectors@gmail.com"
          >
            devsectors@gmail.com
          </a>
          .
        </p>
      </div>

      <div
        id="contact-form-status"
        className={`mt-5 min-h-6 text-sm font-semibold ${
          status.state === "error" ? "text-red-700" : "text-muted"
        }`}
        role={status.state === "error" ? "alert" : "status"}
        aria-live={status.state === "error" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        {status.message}
      </div>
    </form>
  );
}
