import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { verticals } from "@/config/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const verticalEntries: MetadataRoute.Sitemap = verticals.map((vertical) => ({
    url: `${siteConfig.url}/verticals/${vertical.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...verticalEntries,
  ];
}
