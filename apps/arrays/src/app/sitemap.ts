import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://arrays-rho.vercel.app";
  const lastModified = new Date();

  const routes = [
    "",
    "/analogy",
    "/memory",
    "/big-o",
    "/sandbox",
    "/patterns",
    "/quiz",
  ].map((route) => ({
    url: `${domain}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
