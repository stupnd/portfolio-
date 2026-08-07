import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} Portfolio`,
    short_name: site.name,
    description: site.subheadline,
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
