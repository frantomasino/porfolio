import type { Metadata, Viewport } from "next"
import { Fraunces, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
})

export const metadata: Metadata = {
  title: "P&P Caja",
  description: "Caja interna de Pollería P&P. Armá el pedido por kilo y emití el ticket.",
  applicationName: "P&P Caja",
  icons: { icon: "/favicon.svg" },
  appleWebApp: {
    capable: true,
    title: "P&P Caja",
    statusBarStyle: "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: "#8b1c1c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="font-sans min-h-dvh antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
