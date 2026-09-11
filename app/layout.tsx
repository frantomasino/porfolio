import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
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
    <html lang="es" className={`${geist.variable} ${geistMono.variable} dark`}>
      <body className="font-sans min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
