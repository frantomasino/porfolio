import { certifications } from "@/lib/content"

export function Certifications() {
  return (
    <section id="formacion" className="py-20 sm:py-28 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow mb-3">Coderhouse</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-4">Formación</h2>
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Carreras y cursos de desarrollo, más Gemini IA. Donde hay certificado, se abre en una
          pestaña nueva.
        </p>

        <h3 className="mb-4 text-sm font-medium">Carreras</h3>
        <div className="grid gap-4 md:grid-cols-2 mb-12">
          {certifications.careers.map((cert) => (
            <CertCard key={cert.title} {...cert} />
          ))}
        </div>

        <h3 className="mb-4 text-sm font-medium">Cursos</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.courses.map((cert) => (
            <CertCard key={cert.title} {...cert} compact />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({
  title,
  institution,
  period,
  grade,
  image,
  compact,
}: {
  title: string
  institution: string
  period: string
  grade?: string
  image?: string
  compact?: boolean
}) {
  const className =
    "group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-card p-5 hover:border-primary/40 hover:bg-white/3 transition-colors"
  const inner = (
    <>
      <div>
        <h4 className={`font-medium ${compact ? "text-sm" : "text-base"}`}>{title}</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          {institution} · {period}
        </p>
        {image ? <p className="mt-3 text-xs text-primary">Ver certificado →</p> : null}
      </div>
      {grade ? (
        <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium">
          {grade}
        </span>
      ) : null}
    </>
  )

  if (image) {
    return (
      <a href={image} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }

  return <article className={className}>{inner}</article>
}
