import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = site.projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${site.siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    }));

  return [
    { url: site.siteUrl, lastModified: new Date(), priority: 1 },
    ...projectPages,
  ];
}
