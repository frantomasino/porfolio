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
          {["Procesos", "Liderazgo", "Equipos"].map((item) => (
            <div key={item} className="rounded-lg bg-white/8 px-2 py-2 text-center text-[10px] text-white/70">
              {item}
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-4 left-6 font-mono text-[10px] tracking-[0.14em] text-white/40">
        zibraconsultores.com
      </p>
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
  const tiles = [
    "#1a5c40",
    "#245a3c",
    "#2f7a52",
    "#163d2c",
    "#1f6b48",
    "#0f2e22",
    "#2a7a55",
    "#1a4a34",
  ]

  return (
    <div className="absolute inset-0 bg-[#0c1612]">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-px p-2">
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            className="rounded-[2px]"
            style={{
              background: tiles[i % tiles.length],
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
      <div className="absolute left-4 top-4 rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-[2px]">
        <p className="text-[9px] uppercase tracking-[0.22em] text-white/55">Calculadora</p>
        <p className="font-display text-xl leading-none text-white/90">Baldosas</p>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 rounded-lg border border-white/10 bg-black/45 px-3 py-2 font-mono text-[10px] text-[#e8ff6a]">
        <span>12,4 m²</span>
        <span>48 u</span>
        <span>+10% merma</span>
      </div>
    </div>
  )
}
