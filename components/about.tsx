import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">Sobre Mí</h2>
        <Card className="p-8">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {
                "Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras que resuelven problemas reales. Con experiencia en desarrollo web full-stack, me especializo en construir aplicaciones escalables y eficientes."
              }
            </p>
            <p>
              {
                "Mi enfoque se centra en escribir código limpio, mantener las mejores prácticas y colaborar efectivamente con equipos multidisciplinarios. Me encanta aprender nuevas tecnologías y mantenerme actualizado con las últimas tendencias del desarrollo."
              }
            </p>
            <p>
              {
                "Cuando no estoy programando, disfruto contribuir a proyectos de código abierto, leer sobre nuevas tecnologías y compartir conocimientos con la comunidad de desarrolladores."
              }
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
