import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
})

export const metadata: Metadata = {
  title: {
    default: "Francisco Tomasino Solari — Desarrollador Full Stack",
    template: "%s · Francisco Tomasino",
  },
  description:
    "Portfolio de Francisco Tomasino Solari. Desarrollador Full Stack. Productos reales: Lambda 3D, MS Motors, Zibra Consultores, Remito y Nexa.",
  keywords: [
    "Francisco Tomasino",
    "desarrollador full stack",
    "Next.js",
    "TypeScript",
    "portfolio",
    "Buenos Aires",
  ],
  authors: [{ name: "Francisco Tomasino Solari" }],
  openGraph: {
    title: "Francisco Tomasino Solari — Desarrollador Full Stack",
    description:
      "Productos web para empresas reales: catálogos, plataformas 3D y sistemas de gestión.",
    locale: "es_AR",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} ${instrument.variable} dark`}>
      <body className="font-sans min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
