import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AQUARIS — Premium Table Water",
    short_name: "AQUARIS",
    description:
      "Seven-stage purified Nigerian table water, sealed at the source and delivered to your door.",
    start_url: "/",
    display: "standalone",
    background_color: "#03141d",
    theme_color: "#03141d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
