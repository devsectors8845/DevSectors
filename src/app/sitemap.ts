import type { MetadataRoute } from "next";
import {
  courses,
  industries,
  insights,
  services,
  siteConfig,
  talentRoles,
  workItems
} from "@/data/site";

const published = new Date("2026-08-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => `${siteConfig.identity.url}${path}`;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: published, changeFrequency: "weekly", priority: 1 },
    { url: absolute("/services"), lastModified: published, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/industries"), lastModified: published, changeFrequency: "monthly", priority: 0.85 },
    { url: absolute("/work"), lastModified: published, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/about"), lastModified: published, changeFrequency: "monthly", priority: 0.75 },
    { url: absolute("/insights"), lastModified: published, changeFrequency: "weekly", priority: 0.8 },
    { url: absolute("/courses"), lastModified: published, changeFrequency: "monthly", priority: 0.7 },
    { url: absolute("/internship"), lastModified: published, changeFrequency: "monthly", priority: 0.65 },
    { url: absolute("/talent"), lastModified: published, changeFrequency: "monthly", priority: 0.6 },
    { url: absolute("/engagement"), lastModified: published, changeFrequency: "monthly", priority: 0.65 },
    { url: absolute("/faq"), lastModified: published, changeFrequency: "monthly", priority: 0.6 },
    { url: absolute("/contact"), lastModified: published, changeFrequency: "monthly", priority: 0.85 },
    { url: absolute("/privacy"), lastModified: published, changeFrequency: "yearly", priority: 0.2 },
    { url: absolute("/terms"), lastModified: published, changeFrequency: "yearly", priority: 0.2 }
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absolute(`/services/${service.slug}`),
    lastModified: published,
    changeFrequency: "monthly",
    priority: 0.8
  }));
  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: absolute(`/industries/${industry.slug}`),
    lastModified: published,
    changeFrequency: "monthly",
    priority: 0.7
  }));
  const workRoutes: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: absolute(`/work/${item.slug}`),
    lastModified: published,
    changeFrequency: "monthly",
    priority: 0.65
  }));
  const insightRoutes: MetadataRoute.Sitemap = insights.map((article) => ({
    url: absolute(`/insights/${article.slug}`),
    lastModified: published,
    changeFrequency: "yearly",
    priority: 0.65
  }));
  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absolute(`/courses/${course.slug}`),
    lastModified: published,
    changeFrequency: "monthly",
    priority: 0.6
  }));
  const talentRoutes: MetadataRoute.Sitemap = talentRoles.map((role) => ({
    url: absolute(`/talent/${role.slug}`),
    lastModified: published,
    changeFrequency: "monthly",
    priority: 0.45
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...workRoutes,
    ...insightRoutes,
    ...courseRoutes,
    ...talentRoutes
  ];
}
