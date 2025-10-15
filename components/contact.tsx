"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Form submitted:", formData)
    alert("¡Gracias por tu mensaje! Te contactaré pronto.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Contacto</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{"Envíame un mensaje"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tu mensaje"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{"Información de Contacto"}</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-primary" />
                  <span>{"tu.email@ejemplo.com"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={20} className="text-primary" />
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {"linkedin.com/in/tunombre"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-primary" />
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {"github.com/tunombre"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter size={20} className="text-primary" />
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {"@tunombre"}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-lg font-semibold mb-2">{"¿Listo para trabajar juntos?"}</h3>
              <p className="text-sm opacity-90">
                {"Estoy disponible para proyectos freelance y oportunidades de colaboración. ¡Hablemos!"}
              </p>
            </Card>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p>{"© 2025 Tu Nombre. Todos los derechos reservados."}</p>
        </footer>
      </div>
    </section>
  )
}
