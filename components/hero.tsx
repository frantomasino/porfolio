import { ArrowDownRight, Download, MapPin } from "lucide-react"
import { profile } from "@/lib/content"

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-line opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {profile.availability}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </span>
        </div>

        <h1 className="font-display text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-7xl text-balance max-w-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-display italic text-2xl sm:text-3xl text-primary/90">
          {profile.role}
        </p>
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Diseño y desarrollo productos web para empresas reales: catálogos, plataformas 3D y
          sistemas de gestión. Código limpio, interfaces claras y foco en que el negocio funcione.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#trabajo"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ver proyectos
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href={profile.cv}
            download
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Download className="h-4 w-4" />
            Descargar CV
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/8 pt-8">
          {[
            { label: "Productos propios", value: "5" },
            { label: "Stack principal", value: "Next.js" },
            { label: "Formación", value: "Full Stack" },
            { label: "Base", value: "Buenos Aires" },
          ].map((item) => (
            <div key={item.label}>
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mt-2 text-xl font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
