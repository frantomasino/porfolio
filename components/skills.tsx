import { skillGroups } from "@/lib/content"

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow mb-3">Stack</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">Skills</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-card p-6 sm:p-7">
              <h3 className="text-sm font-medium text-primary">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
