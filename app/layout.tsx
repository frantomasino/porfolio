import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Francisco Tomasino Solari — Desarrollador Full Stack",
    template: "%s · Francisco Tomasino",
  },
  description:
    "Portfolio de Francisco Tomasino Solari. Desarrollador Full Stack. Shopify, Liquid, Gemini IA y productos reales: Lambda 3D, MS Motors, Zibra, Remito y Nexa.",
  keywords: [
    "Francisco Tomasino",
    "desarrollador full stack",
    "Next.js",
    "TypeScript",
    "Shopify",
    "Liquid",
    "Gemini",
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
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className="font-sans min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
