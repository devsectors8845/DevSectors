import { ButtonLink } from "@/components/button-link";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function CtaBand({
  eyebrow = "Have a product in mind?",
  title = "Turn the next idea into a clear build plan.",
  description = "Tell us what needs to change. We will help shape the scope, identify the fastest useful release, and map a practical way forward."
}: CtaBandProps) {
  return (
    <section className="wide-shell pb-2 sm:pb-4">
      <div className="sector-grid-dark relative overflow-hidden rounded-[1.35rem] bg-mineral px-5 py-16 text-white sm:rounded-[2rem] sm:px-10 lg:py-24">
        <div className="absolute -right-12 -top-20 size-64 rounded-full border-[42px] border-signal/20" />
        <div className="content-shell relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <span className="eyebrow text-signal">{eyebrow}</span>
            <h2 className="heading-section mt-6 max-w-4xl">{title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {description}
            </p>
          </div>
          <ButtonLink href="/contact" variant="primary" className="w-fit">
            Start a conversation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
