import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, Issue ${site.issue.number}`,
    short_name: site.name,
    description: site.issue.dek,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0E6",
    theme_color: "#F5F0E6",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
