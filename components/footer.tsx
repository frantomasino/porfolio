import { profile } from "@/lib/content"

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="text-xs text-muted-foreground">Buenos Aires · Disponible para entrevistas</p>
      </div>
    </footer>
  )
}
