import { ExternalLink, Github } from "lucide-react"
import { featuredProjects } from "@/lib/content"
import { ProjectCover } from "@/components/project-cover"

export function Projects() {
  const [lead, ...rest] = featuredProjects

  return (
    <section id="trabajo" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">Trabajo seleccionado</p>
            <h2 className="font-display text-4xl sm:text-5xl text-balance">Proyectos propios</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Productos reales para clientes y operaciones. No son ejercicios de curso: están pensados
            para vender, operar o comunicar un negocio.
          </p>
        </div>

        <article className="group overflow-hidden rounded-3xl border border-white/10 bg-card transition-colors hover:border-primary/25">
          <ProjectCover accent={lead.accent} title={lead.title} image={lead.image} className="h-64 sm:h-80" />
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">
                {lead.year} · {lead.client}
              </p>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl">{lead.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{lead.description}</p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {lead.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {lead.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ProjectLinks demo={lead.demo} github={lead.github} />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card transition-colors hover:border-primary/25"
            >
              <ProjectCover
                accent={project.accent}
                title={project.title}
                image={project.image}
                className="h-52 sm:h-56"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="eyebrow">
                  {project.year} · {project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks demo={project.demo} github={project.github} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectLinks({
  demo,
  github,
}: {
  demo: string | null
  github: string | null
}) {
  if (!demo && !github) {
    return <p className="text-xs text-muted-foreground">Proyecto de cliente · demo privada</p>
  }

  return (
    <div className="flex flex-wrap gap-4">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          Código
        </a>
      )}
    </div>
  )
}
