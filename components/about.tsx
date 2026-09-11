export function About() {
  return (
    <section id="sobre-mi" className="py-20 sm:py-28 border-t border-white/8">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-3">Sobre mí</p>
          <h2 className="font-display text-4xl sm:text-5xl text-balance">
            Construyo software que un negocio puede usar mañana.
          </h2>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Soy Francisco Tomasino Solari, desarrollador full stack en Buenos Aires. Vengo de
            operaciones reales —ventas, stock, remitos, atención al cliente— y por eso diseño
            productos que se entienden en el mostrador, no solo en Figma.
          </p>
          <p>
            Trabajo con <strong className="text-foreground font-medium">Next.js</strong>,{" "}
            <strong className="text-foreground font-medium">TypeScript</strong>,{" "}
            <strong className="text-foreground font-medium">Supabase</strong> y{" "}
            <strong className="text-foreground font-medium">Tailwind CSS</strong>. En el día a día
            también desarrollo tiendas en{" "}
            <strong className="text-foreground font-medium">Shopify</strong> con{" "}
            <strong className="text-foreground font-medium">Liquid</strong>, y uso{" "}
            <strong className="text-foreground font-medium">Gemini</strong> para acelerar análisis,
            documentación y trabajo operativo. En paralelo entrego sitios y sistemas a medida:
            catálogos, paneles y herramientas internas.
          </p>
          <p>
            Me interesa sumarme a un equipo donde el código tenga impacto: interfaces claras,
            backends simples y producto que se pueda mantener.
          </p>
        </div>
      </div>
    </section>
  )
}
