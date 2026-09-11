import { experience } from "@/lib/content"

export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow mb-3">Recorrido</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">Experiencia</h2>
        <ol className="space-y-0">
          {experience.map((item, index) => (
            <li
              key={`${item.company}-${item.role}`}
              className="grid gap-4 border-t border-white/8 py-8 sm:grid-cols-[220px_1fr] sm:gap-10"
            >
              <div>
                <p className="font-medium">{item.company}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.period}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {item.role}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    0{index + 1}
                  </span>
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
