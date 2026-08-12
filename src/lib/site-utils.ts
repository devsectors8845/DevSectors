import {
  courses,
  faqs,
  industries,
  insights,
  navigation,
  services,
  talentRoles,
  workItems,
  type Course,
  type FaqCategory,
  type FaqItem,
  type Industry,
  type IndustrySlug,
  type InsightArticle,
  type InternalHref,
  type NavigationItem,
  type RepresentativeWorkItem,
  type Service,
  type ServiceSlug,
  type TalentNetworkRole,
} from "@/data/site";

interface Slugged {
  readonly slug: string;
}

function includesString(values: readonly string[], value: string): boolean {
  return values.includes(value);
}

export function findBySlug<T extends Slugged>(
  items: readonly T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return services.some((service) => service.slug === slug);
}

export function isIndustrySlug(slug: string): slug is IndustrySlug {
  return industries.some((industry) => industry.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return findBySlug(services, slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return findBySlug(industries, slug);
}

export function getWorkItemBySlug(slug: string): RepresentativeWorkItem | undefined {
  return findBySlug(workItems, slug);
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return findBySlug(insights, slug);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return findBySlug(courses, slug);
}

export function getTalentRoleBySlug(slug: string): TalentNetworkRole | undefined {
  return findBySlug(talentRoles, slug);
}

export function getIndustriesForService(serviceSlug: string): readonly Industry[] {
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return [];
  }

  return industries.filter((industry) =>
    includesString(service.relatedIndustrySlugs, industry.slug),
  );
}

export function getServicesForIndustry(industrySlug: string): readonly Service[] {
  const industry = getIndustryBySlug(industrySlug);

  if (!industry) {
    return [];
  }

  return services.filter((service) =>
    includesString(industry.relatedServiceSlugs, service.slug),
  );
}

export function getWorkItemsForService(
  serviceSlug: string,
): readonly RepresentativeWorkItem[] {
  if (!isServiceSlug(serviceSlug)) {
    return [];
  }

  return workItems.filter((item) =>
    includesString(item.relatedServiceSlugs, serviceSlug),
  );
}

export function getWorkItemsForIndustry(
  industrySlug: string,
): readonly RepresentativeWorkItem[] {
  if (!isIndustrySlug(industrySlug)) {
    return [];
  }

  return workItems.filter((item) => item.industrySlug === industrySlug);
}

export function getFaqsByCategory(category: FaqCategory): readonly FaqItem[] {
  return faqs.filter((faq) => faq.category === category);
}

export function getNavigationItemByHref(
  href: InternalHref,
): NavigationItem | undefined {
  const navigationItems: readonly NavigationItem[] = navigation;

  for (const item of navigationItems) {
    if (item.href === href) {
      return item;
    }

    const child = item.children?.find((candidate) => candidate.href === href);

    if (child) {
      return child;
    }
  }

  return undefined;
}
