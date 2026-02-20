"use client";

interface HakonLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function HakonLogo({
  className = "",
  iconOnly = false,
  size = "md",
}: HakonLogoProps) {
  const iconSizes = { sm: 28, md: 36, lg: 48 };
  const textSizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" };
  const s = iconSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hakon-h-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="hakon-bg-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#141c2e" />
            <stop offset="100%" stopColor="#0f1523" />
          </linearGradient>
        </defs>
        {/* Background rounded square */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          fill="url(#hakon-bg-grad)"
          stroke="#1e293b"
          strokeWidth="0.5"
        />
        {/* H letterform - left vertical */}
        <rect x="13" y="12" width="5.5" height="24" rx="1" fill="url(#hakon-h-grad)" />
        {/* H letterform - right vertical */}
        <rect x="29.5" y="12" width="5.5" height="24" rx="1" fill="url(#hakon-h-grad)" opacity="0.75" />
        {/* H letterform - crossbar */}
        <rect x="13" y="20.5" width="22" height="5.5" rx="1" fill="url(#hakon-h-grad)" opacity="0.85" />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span
          className={`font-heading font-bold tracking-[0.08em] text-text-primary ${textSizes[size]}`}
        >
          HAKON<span className="ml-1.5 font-light tracking-[0.12em] text-text-secondary">DIGITAL</span>
        </span>
      )}
    </div>
  );
}
