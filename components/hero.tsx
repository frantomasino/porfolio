"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            {"Hola, soy "}
            <span className="text-primary">{"Tu Nombre"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance">
            {"Desarrollador Full Stack especializado en crear experiencias digitales excepcionales"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" onClick={() => scrollToSection("projects")}>
              Ver Proyectos
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Contáctame
            </Button>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="mt-16 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}
