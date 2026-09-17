import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  variant?: "mark" | "full"
}

export function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 72 56"
        className={cn("shrink-0", variant === "full" ? "h-12 w-auto" : "h-10 w-auto")}
        aria-hidden="true"
      >
        <ellipse cx="36" cy="50" rx="26" ry="4" fill="currentColor" opacity="0.18" />
        <g fill="currentColor">
          <path d="M22 38c-7-1-13-8-12-16 3 2 6 2 8-1 1-4-1-8-4-11 6-1 12 3 14 9 2 6-1 13-6 19z" />
          <path d="M18 14c2-3 1-7-1-9 5 0 8 3 9 7-3 1-6 1-8 2z" />
          <circle cx="16.5" cy="20.5" r="1.1" fill="#F6EDE0" />
          <path d="M50 38c7-1 13-8 12-16-3 2-6 2-8-1-1-4 1-8 4-11-6-1-12 3-14 9-2 6 1 13 6 19z" />
          <path d="M54 14c-2-3-1-7 1-9-5 0-8 3-9 7 3 1 6 1 8 2z" />
          <circle cx="55.5" cy="20.5" r="1.1" fill="#F6EDE0" />
        </g>
        <text
          x="36"
          y="34"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="16"
          fontWeight="700"
          fill="currentColor"
        >
          P&amp;P
        </text>
      </svg>
      {variant === "full" ? (
        <div className="min-w-0 leading-tight">
          <p className="font-display text-xl font-semibold tracking-wide sm:text-2xl">P&P</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/80">
            Del campo a tu mesa
          </p>
        </div>
      ) : null}
    </div>
  )
}
