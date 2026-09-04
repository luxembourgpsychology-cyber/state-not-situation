import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "State. Not Situation.",
    short_name: "State. Not Situation.",
    background_color: "#f7f3ec",
    theme_color: "#b5291c",
    display: "browser",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
