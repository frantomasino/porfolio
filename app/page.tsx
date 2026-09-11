import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
