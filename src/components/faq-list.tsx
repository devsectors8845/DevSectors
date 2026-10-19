import { FaqAccordion } from "@/components/faq-accordion";
import type { FaqItem } from "@/data/site";

type FaqListProps = {
  items: readonly FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return <FaqAccordion items={items} idPrefix="faq-page" />;
}