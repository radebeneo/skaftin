import type { Metadata } from "next"
import { EskortHomepage } from "@/eskort-homepage-new"

export const metadata: Metadata = {
  title: "Eskort | From Our Table To Yours",
  description:
    "Eskort quality pork products, specials, recipes and stores across South Africa.",
  icons: {
    icon: "/images1/eskort@4x-32x32.png",
  },
}

export default function Page() {
  return <EskortHomepage />
}
