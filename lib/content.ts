export const profile = {
  name: "Francisco Tomasino Solari",
  shortName: "FTS",
  role: "Desarrollador Full Stack",
  location: "Buenos Aires, Argentina",
  email: "franciscotomasino2@gmail.com",
  phoneDisplay: "+54 9 11 3125-6510",
  phoneHref: "https://wa.me/5491131256510",
  github: "https://github.com/frantomasino",
  linkedin: "https://www.linkedin.com/in/francisco-tomasino/",
  cv: "/francisco-tomasino-cv.pdf",
  availability: "Abierto a nuevas oportunidades",
}

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "Sass", "Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vite"],
  },
  {
    title: "Backend & datos",
    items: ["Node.js", "Express", "REST APIs", "Firebase", "Supabase", "MongoDB", "PostgreSQL", "NoSQL"],
  },
  {
    title: "Producto & ops",
    items: ["GitHub", "Docker", "Testing", "SEO", "Shopify", "Liquid", "WordPress"],
  },
  {
    title: "Negocio",
    items: ["Odoo ERP", "Tango Gestión", "Excel avanzado", "Google Workspace"],
  },
]

export const featuredProjects = [
  {
    slug: "lambda-3d",
    title: "Lambda 3D",
    client: "Producto en producción",
    year: "2025",
    category: "Salud · 3D · Plataforma web",
    summary:
      "Plataforma web y visualizador 3D para biomodelos médicos. Médicos e instituciones exploran anatomía a partir de estudios reales y convierten esos modelos en piezas físicas.",
    description:
      "Diseñé y desarrollé, junto al equipo, el sitio y el visor interactivo de Lambda 3D. El producto conecta imágenes médicas, segmentación y visualización 3D para planificación quirúrgica, comunicación clínica y docencia. La interfaz es moderna, accesible y pensada para usarse en consultorio o en aula.",
    highlights: [
      "Visualizador 3D interactivo de biomodelos",
      "Sitio institucional con casos clínicos reales",
      "Flujo desde estudio médico hasta modelo físico o digital",
    ],
    stack: ["Next.js", "TypeScript", "Three.js", "Firebase", "Tailwind CSS"],
    demo: "https://www.lambda3d.com.ar/",
    github: "https://github.com/frantomasino/Lambda",
    accent: "lambda",
  },
  {
    slug: "ms-motors",
    title: "MS Motors",
    client: "Concesionario · Quilmes",
    year: "2025",
    category: "Catálogo · E-commerce light",
    summary:
      "Catálogo web de autos usados para un concesionario real. Los clientes filtran, ven ficha e imágenes y contactan por WhatsApp sin fricción.",
    description:
      "Construí de punta a punta el sitio de MS Motors: listado de stock, fichas de vehículo, filtros, testimonios y un panel para administrar el catálogo. El objetivo era que un negocio local venda con una presencia online seria, rápida y pensada para celular.",
    highlights: [
      "Catálogo con filtros, orden y fichas detalladas",
      "Gestión de stock e imágenes",
      "Contacto directo por WhatsApp y SEO local",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    demo: "https://www.msmotors.com.ar/",
    github: "https://github.com/frantomasino/ms-motors",
    accent: "motors",
  },
  {
    slug: "zibra",
    title: "Zibra Consultores",
    client: "Consultora",
    year: "2026",
    category: "Sitio institucional",
    summary:
      "Presencia digital para una consultora: servicios, identidad y captación de consultas con una estética corporativa clara.",
    description:
      "Desarrollé el sitio de Zibra Consultores para que la marca se presente con profesionalismo. El foco está en explicar servicios, transmitir confianza y convertir visitas en conversaciones, con una interfaz limpia, responsive y fácil de mantener.",
    highlights: [
      "Identidad visual y arquitectura de contenidos",
      "Páginas de servicios y contacto",
      "Diseño responsive pensado para conversión",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: null,
    github: null,
    accent: "zibra",
  },
  {
    slug: "remito",
    title: "Remito",
    client: "Tapamanía · Operación diaria",
    year: "2026",
    category: "App interna · PWA",
    summary:
      "App para cargar pedidos, generar remitos e imprimir comprobantes desde el celular. Reemplaza el circuito en papel de una operación logística real.",
    description:
      "Remito (Boleta) digitaliza la emisión de remitos para Tapamanía. Permite cargar pedidos, generar comprobantes e imprimirlos en el momento, con autenticación y un dashboard pensado para uso en depósito o en ruta. Es un producto interno, usado en operación, no un ejercicio de curso.",
    highlights: [
      "Carga de pedidos y generación de remitos",
      "Impresión de comprobantes desde el celular",
      "Auth, dashboard y PWA para uso en campo",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
    demo: null,
    github: "https://github.com/frantomasino/remito-tapamania",
    accent: "remito",
  },
  {
    slug: "nexa",
    title: "Nexa",
    client: "Gestión comercial",
    year: "2026",
    category: "SaaS · Panel de gestión",
    summary:
      "Sistema comercial para ordenar la operación diaria: pedidos, clientes, productos, stock y control del negocio en un solo lugar.",
    description:
      "Nexa es un panel de gestión comercial. Centraliza pedidos, clientes y catálogo para que un comercio deje de operar en planillas sueltas. Incluye autenticación, dashboards y flujos de alta/edición pensados para el día a día, no para una demo.",
    highlights: [
      "Pedidos, clientes y productos en un solo sistema",
      "Control de stock y precios",
      "Auth y panel operativo con Supabase",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    demo: "https://app-two-beta-37.vercel.app",
    github: "https://github.com/frantomasino/app",
    accent: "nexa",
  },
] as const

export const experience = [
  {
    role: "Desarrollador Web",
    company: "Eaata",
    period: "Ene 2024 — Actualidad",
    points: [
      "Desarrollo y personalización de tiendas Shopify con HTML, CSS, JavaScript y Liquid.",
      "Integraciones con Firebase y Supabase: autenticación, storage y bases de datos.",
      "Soporte técnico a clientes y mejora continua del frontend.",
    ],
  },
  {
    role: "Administrativo",
    company: "Remokeys",
    period: "Ene 2023 — Dic 2023",
    points: [
      "Facturación, cobranzas y stock con seguimiento de inventarios y logística de entregas.",
      "Contacto directo con clientes y resolución de reclamos.",
      "Operación diaria sobre Tango Gestión.",
    ],
  },
  {
    role: "Encargado de ventas",
    company: "Remokeys",
    period: "Ago 2020 — Dic 2022",
    points: [
      "Gestión comercial y administrativa con Tango Gestión.",
      "Coordinación logística y atención al cliente con foco en fidelización.",
    ],
  },
  {
    role: "Logística",
    company: "Tapamanía",
    period: "Mar 2015 — Feb 2019",
    points: [
      "Control de stock, rutas de entrega y documentación de remitos y facturación.",
      "Esa operación es el origen del producto Remito que desarrollé después.",
    ],
  },
]

export const certifications = {
  careers: [
    {
      title: "Carrera Desarrollador Full Stack",
      institution: "Coderhouse",
      period: "Ago 2023 — Mar 2025",
      grade: "9",
      image: "/certs/full-stack.png",
    },
    {
      title: "Carrera Desarrollo Frontend React",
      institution: "Coderhouse",
      period: "Ago 2023 — Jun 2024",
      grade: "9",
      image: "/certs/frontend.png",
    },
  ],
  courses: [
    {
      title: "Programación Backend III",
      institution: "Coderhouse",
      period: "Ene 2025 — Mar 2025",
      grade: "9",
      image: "/certs/backend-iii.png",
    },
    {
      title: "Programación Backend II",
      institution: "Coderhouse",
      period: "Oct 2024 — Nov 2024",
      grade: "10",
      image: "/certs/backend-ii.png",
    },
    {
      title: "Programación Backend I",
      institution: "Coderhouse",
      period: "Jul 2024 — Sep 2024",
      grade: "10",
      image: "/certs/backend-i.png",
    },
    {
      title: "React JS",
      institution: "Coderhouse",
      period: "Abr 2024 — Jun 2024",
      grade: "10",
      image: "/certs/react.png",
    },
    {
      title: "JavaScript",
      institution: "Coderhouse",
      period: "Ene 2024 — Abr 2024",
      grade: "9",
      image: "/certs/javascript.png",
    },
    {
      title: "Desarrollo Web",
      institution: "Coderhouse",
      period: "Ago 2023 — Oct 2023",
      grade: "8",
      image: "/certs/desarrollo-web.png",
    },
  ],
}

export const navItems = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#skills", label: "Skills" },
  { href: "#formacion", label: "Formación" },
  { href: "#contacto", label: "Contacto" },
]
