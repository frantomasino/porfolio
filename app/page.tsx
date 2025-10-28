"use client"

import { useState } from "react"
import { Menu, X, Mail, Github, Linkedin, MessageCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const skills = [
  // Frontend
  "HTML",
  "CSS",
  "Sass",
  "Bootstrap",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "ReactJS",
  "Next.js",
  "Vite",

  // Backend
  "Node.js",
  "Express",
  "Firebase",
  "Supabase",
  "MongoDB",
  "PostgreSQL",
  "NoSQL",
  "REST APIs",
  "AJAX",

  // DevOps & Herramientas
  "Docker",
  "GitHub",
  "PowerShell",

  // Otros
  "Full Stack Programming",
  "Testing",
  "SEO",
];


    const projects = [
  {
    title: "Lambda 3D",
    description:
      "Desarrollé una plataforma web para Lambda 3D, enfocada en la visualización e impresión de biomodelos personalizados. Utiliza Next.js y Supabase para gestionar archivos médicos, renderizarlos en 3D y permitir su conversión en modelos físicos. El sitio ofrece una experiencia fluida, moderna y accesible desde cualquier dispositivo, combinando tecnología web con aplicaciones prácticas en salud y educación.",
    github: "https://github.com/frantomasino/Lambda-3D",
    demo: "https://www.lambda3d.com.ar/",
  },
  {
    title: "MS Quilmes – Catálogo de Autos",
    description:
      "Desarrollé una aplicación web completa para un concesionario, utilizando Node.js, TypeScript y Tailwind CSS. La app permite gestionar un catálogo de vehículos, mostrando autos disponibles con información detallada e imágenes. Es responsive, de carga rápida y diseñada para facilitar la navegación desde cualquier dispositivo.",
    github: "https://github.com/frantomasino/msquilmes",
    demo: "https://www.msmotors.com.ar/",
  },
  {
    title: "Proyecto ReactJS",
    description:
      "Desarrollé una Ecommerce utilizando ReactJS, creando componentes reutilizables y manejando el estado de manera eficiente para brindar una experiencia de usuario rápida, interactiva y escalable.",
    github: "https://github.com/frantomasino/Proyectoreactjs",
    demo: "https://proyectoreactjs-gn8a.vercel.app/",
  },
  {
    title: "Proyecto Backend III",
    description:
      "Desarrollé esta aplicación usando MongoDB y Docker para escalabilidad y despliegue eficiente. Implementamos Testing automatizado para estabilidad y configuramos replicación y sharding en MongoDB para manejar alto volumen de datos.",
    github: "https://github.com/frantomasino/backend-final",
    demo: "https://frantomasino.github.io/backend-final/",
  },
  {
    title: "Proyecto Backend II",
    description:
      "Desarrollé una aplicación backend escalable utilizando patrones de diseño, implementando DAOs para acceder a la base de datos y DTOs para estructurar los datos, mejorando la eficiencia y mantenibilidad del código.",
    github: "https://github.com/frantomasino/Proyecto-ProgramacionBackend",
    demo: "https://frantomasino.github.io/Proyecto-ProgramacionBackend/",
  },
  {
    title: "Proyecto Backend I",
    description:
      "Desarrollé una aplicación web con autenticación y manejo de bases de datos, utilizando APIs RESTful y tecnologías como Node.js y Express para gestionar usuarios y sesiones.",
    github: "https://github.com/frantomasino/Proyecto-ProgramacionBackend",
    demo: "https://frantomasino.github.io/Proyecto-ProgramacionBackend/",
  },
  {
    title: "Proyecto Desarrollo Web",
    description:
      "Desarrollé un sitio web moderno y responsive utilizando HTML, CSS, Sass y Bootstrap, optimizando el diseño para dispositivos móviles y mejorando la experiencia de usuario con componentes estilizados y personalizados.",
    github: "https://github.com/frantomasino/proyectodesarolloweb",
    demo: "https://frantomasino.github.io/proyectodesarolloweb/",
  },
  {
    title: "Proyecto JavaScript",
    description:
      "Desarrollé una aplicación web interactiva con JavaScript, integrando lógica dinámica y eventos del DOM para mejorar la experiencia de usuario con funcionalidades avanzadas y respuestas en tiempo real.",
    github: "https://github.com/frantomasino/Proyecto-JavaScript",
    demo: "https://proyecto-java-script-olive.vercel.app/",
  },
  {
    title: "Proyecto Piedra, Papel o Tijera",
    description:
      "Desarrollé un juego interactivo de Piedra, Papel o Tijera, que permite al usuario jugar contra la computadora, utilizando lógica condicional y eventos para determinar el ganador en tiempo real.",
    github: "https://github.com/frantomasino/juego-piedra-papel-tijera",
    demo: "https://juego-piedra-papel-tijera-ruby.vercel.app/",
  },
];


  const certifications = {
    careers: [
      {
        title: "Carrera Desarrollador Full Stack",
        institution: "Coderhouse",
        period: "Agosto 2023 - Marzo 2025",
        grade: "9",
        image: "/Desarrollo Full Stack .png",
      },
      {
        title: "Carrera Desarrollo Frontend React",
        institution: "Coderhouse",
        period: "Agosto 2023 - Junio 2024",
        grade: "9",
        image: "imagenes/certificado-frontend reactjs.png",
      },
    ],
    courses: [
      {
        title: "Curso Programación Backend III",
        institution: "Coderhouse",
        period: "Enero 2025 - Marzo 2025",
        grade: "9",
        image: "/Backend III.png",
      },
      {
        title: "Curso Programación Backend II",
        institution: "Coderhouse",
        period: "Octubre 2024 - Noviembre 2024",
        grade: "10",
        image: "/Backend II.jpg",
      },
      {
        title: "Curso Programación Backend I",
        institution: "Coderhouse",
        period: "Julio 2024 - Septiembre 2024",
        grade: "10",
        image: "/Backend I.png",
      },
      {
        title: "Curso ReactJs",
        institution: "Coderhouse",
        period: "Abril 2024 - Junio 2024",
        grade: "10",
        image: "/Reactjs.png",
      },
      {
        title: "Curso JavaScript",
        institution: "Coderhouse",
        period: "Enero 2024 - Abril 2024",
        grade: "9",
        image: "/JavaScript.png",
      },
      {
        title: "Curso Desarrollo Web",
        institution: "Coderhouse",
        period: "Agosto 2023 - Octubre 2023",
        grade: "8",
        image: "/Desarrollo Web.png",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              Portafolio
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#sobre-mi" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre mí
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#proyectos" className="text-sm font-medium hover:text-primary transition-colors">
                Proyectos
              </a>
              <a href="#certificaciones" className="text-sm font-medium hover:text-primary transition-colors">
                Certificaciones
              </a>
              <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
                Contacto
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2">
              <a
                href="#sobre-mi"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-accent"
              >
                Sobre mí
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-accent"
              >
                Skills
              </a>
              <a
                href="#proyectos"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-accent"
              >
                Proyectos
              </a>
              <a
                href="#certificaciones"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-accent"
              >
                Certificaciones
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-accent"
              >
                Contacto
              </a>
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        {/* HERO */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
      Hola, soy <span className="text-primary">Francisco Tomasino Solari</span>
    </h1>

    <p className="text-base sm:text-lg text-muted-foreground text-center mb-8">
      Desarrollador Web Full Stack con experiencia en la creación de sitios modernos, optimizados y enfocados en la experiencia del usuario.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="#proyectos"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        Ver mis proyectos
      </a>
      <a
        href="/francisco-tomasino-cv.pdf"
        download
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
      >
        Descargar CV
      </a>
    </div>
  </div>
</section>

{/* ABOUT */}
<section id="sobre-mi" className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
  <p className="text-base leading-relaxed text-muted-foreground text-center">
  Me dedico al desarrollo web, creando <strong>sitios modernos y funcionales</strong> para empresas, emprendimientos y proyectos personales.
  Combino diseño, estructura y rendimiento para construir páginas atractivas, rápidas y fáciles de usar.
  Trabajo con <strong>Next.js</strong>, <strong>TypeScript</strong> y <strong>Tailwind CSS</strong>. Me enfoco en ofrecer resultados de calidad que transmitan profesionalismo y mejoren la presencia online de cada cliente.
</p>


  </div>
</section>



        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-card p-4 rounded-lg shadow-sm text-center font-medium hover:shadow-md transition-shadow"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-card rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certificaciones" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Certificaciones</h2>

            {/* Careers */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Carreras</h3>
              <div className="space-y-4">
                {certifications.careers.map((cert, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="font-semibold">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.institution} ({cert.period}) - Nota: {cert.grade}
                        </p>
                      </div>
                      <a href={cert.image} download className="text-sm text-primary hover:underline">
                        Ver certificado
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Cursos</h3>
              <div className="space-y-4">
                {certifications.courses.map((cert, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="font-semibold">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.institution} ({cert.period}) - Nota: {cert.grade}
                        </p>
                      </div>
                      <a href={cert.image} download className="text-sm text-primary hover:underline">
                        Ver certificado
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">¡Contactame!</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Estoy abierto a nuevas oportunidades, colaboraciones o simplemente una charla. Podés contactarme por los
              siguientes medios:
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:franciscotomasino2@gmail.com"
                className="inline-flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <Mail className="h-5 w-5" />
                franciscotomasino2@gmail.com
              </a>
              <a
                href="https://wa.me/5491131256510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href="https://github.com/frantomasino"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/francisco-tomasino/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 Francisco Tomasino Solari. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
