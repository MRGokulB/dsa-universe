import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://linked-lists.vercel.app";
  const lastModified = new Date();
  return ["", "/analogy", "/memory", "/operations", "/patterns", "/sandbox", "/quiz"].map((route) => ({
    url: `${domain}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
