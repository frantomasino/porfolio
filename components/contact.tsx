import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { profile } from "@/lib/content"

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: profile.phoneDisplay,
    href: profile.phoneHref,
    icon: MessageCircle,
  },
  {
    label: "LinkedIn",
    value: "francisco-tomasino",
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "frantomasino",
    href: profile.github,
    icon: Github,
  },
]

export function Contact() {
  return (
    <section id="contacto" className="py-20 sm:py-28 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/6 to-transparent p-8 sm:p-12">
          <p className="eyebrow mb-3">Siguiente paso</p>
          <h2 className="font-display text-4xl sm:text-6xl text-balance max-w-3xl">
            ¿Hablamos de un rol o de un producto?
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed">
            Estoy buscando sumarme a un equipo de desarrollo. También puedo mostrar en detalle
            cualquiera de los proyectos.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-background/50 px-4 py-4 hover:border-primary/40 transition-colors"
              >
                <channel.icon className="h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted-foreground">{channel.label}</span>
                  <span className="text-sm font-medium">{channel.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
