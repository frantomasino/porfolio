import type { ReactNode } from "react"
import { ArrowDownRight, Download, MapPin } from "lucide-react"
import { featuredProjects, profile } from "@/lib/content"
import { ProjectCover } from "@/components/project-cover"
import { cn } from "@/lib/utils"

type MosaicProject = (typeof featuredProjects)[number]

function MosaicLink({
  project,
  className,
  children,
}: {
  project: MosaicProject
  className?: string
  children: ReactNode
}) {
  const classes = cn(
    "overflow-hidden rounded-2xl border border-white/10 hover:border-primary/40 transition-colors",
    className,
  )

  if (project.demo) {
    return (
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver sitio de ${project.title}`}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <a href="#trabajo" aria-label={project.title} className={classes}>
      {children}
    </a>
  )
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-line opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
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

            <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] text-balance">
              {profile.name}
            </h1>
            <p className="mt-4 font-display italic text-2xl sm:text-3xl text-primary/90">
              {profile.role}
            </p>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Diseño y desarrollo productos web para empresas reales: tiendas Shopify, catálogos,
              plataformas 3D y sistemas de gestión. Código limpio, Liquid cuando hace falta, y foco
              en que el negocio funcione.
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
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-3">
            <MosaicLink project={featuredProjects[0]} className="col-span-2 h-40">
              <ProjectCover accent={featuredProjects[0].accent} title={featuredProjects[0].title} className="h-full" />
            </MosaicLink>
            {featuredProjects.slice(1, 5).map((project) => (
              <MosaicLink key={project.slug} project={project} className="h-28">
                <ProjectCover accent={project.accent} title={project.title} className="h-full" />
              </MosaicLink>
            ))}
          </div>
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
