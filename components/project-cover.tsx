import { cn } from "@/lib/utils"

type Accent = "lambda" | "motors" | "zibra" | "remito" | "nexa"

export function ProjectCover({
  accent,
  title,
  className,
}: {
  accent: Accent
  title: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {accent === "lambda" && <LambdaArt />}
      {accent === "motors" && <MotorsArt />}
      {accent === "zibra" && <ZibraArt />}
      {accent === "remito" && <RemitoArt />}
      {accent === "nexa" && <NexaArt />}
      <span className="sr-only">{title}</span>
    </div>
  )
}

function LambdaArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#2ad4c0,transparent_40%),linear-gradient(160deg,#07161a,#0f3d44)]">
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 400 220" fill="none">
        <path d="M80 180 L200 40 L320 180" stroke="#9ff7ea" strokeWidth="2" />
        <circle cx="200" cy="90" r="38" stroke="#e8ff6a" strokeWidth="1.5" />
        <path d="M140 130h120M170 150h80" stroke="white" strokeOpacity="0.35" />
        <circle cx="200" cy="90" r="4" fill="#e8ff6a" />
      </svg>
      <p className="absolute left-6 top-6 font-display text-5xl text-white/20">λ</p>
    </div>
  )
}

function MotorsArt() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(150deg,#140e0a,#7a2e12_70%,#c45a1a)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" fill="none">
        <rect x="70" y="90" width="260" height="70" rx="22" fill="black" fillOpacity="0.35" />
        <path d="M90 120 h40 l20-22 h90 l28 22 h52 v28 H90z" fill="#f4f1ea" fillOpacity="0.85" />
        <circle cx="140" cy="150" r="16" fill="#1a120c" stroke="#e8ff6a" />
        <circle cx="270" cy="150" r="16" fill="#1a120c" stroke="#e8ff6a" />
      </svg>
      <p className="absolute left-6 top-6 font-mono text-xs tracking-[0.3em] text-white/50">QUILMES</p>
    </div>
  )
}

function ZibraArt() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#120f1c,#3c2a68)]">
      <div className="absolute left-6 right-6 top-8 rounded-xl border border-white/15 bg-black/20 p-4">
        <p className="font-display text-2xl text-white/90">Zibra</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">Consultores</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Estrategia", "Procesos", "Equipos"].map((item) => (
            <div key={item} className="rounded-lg bg-white/8 px-2 py-2 text-center text-[10px] text-white/70">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RemitoArt() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a1628,#1565c0)]">
      <div className="absolute left-1/2 top-8 w-40 -translate-x-1/2 rounded-lg bg-white/90 p-3 text-[#0a1628] shadow-2xl rotate-[-6deg]">
        <div className="mb-2 h-2 w-16 bg-[#1565c0]/70" />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-black/15" />
          <div className="h-1.5 w-5/6 bg-black/10" />
          <div className="h-1.5 w-2/3 bg-black/10" />
        </div>
        <div className="mt-3 h-8 border border-dashed border-black/20" />
      </div>
      <p className="absolute left-6 bottom-6 font-mono text-[11px] tracking-[0.3em] text-white/60">
        REMITO Nº 00421
      </p>
    </div>
  )
}

function NexaArt() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#0c1612,#1a5c40)]">
      <div className="absolute left-6 right-6 top-8 grid grid-cols-3 gap-2">
        {["Pedidos", "Clientes", "Stock"].map((label, i) => (
          <div key={label} className="rounded-xl border border-white/15 bg-white/8 p-3">
            <p className="text-[10px] text-white/50">{label}</p>
            <p className="mt-1 font-display text-xl text-white/90">{[128, 64, 41][i]}</p>
          </div>
        ))}
      </div>
      <div className="absolute left-6 right-6 bottom-8 h-16 rounded-xl border border-white/10 bg-black/20">
        <svg viewBox="0 0 300 50" className="h-full w-full px-2">
          <path
            d="M0 40 L40 28 L80 32 L120 18 L160 22 L200 10 L240 16 L300 8"
            stroke="#e8ff6a"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}
