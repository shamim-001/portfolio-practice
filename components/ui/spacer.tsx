interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none"
  className?: string
}

export function Spacer({ size = "md", className = "" }: SpacerProps) {
  const sizeClasses = {
    none: "h-0",
    xs: "h-2 md:h-4",
    sm: "h-4 md:h-8",
    md: "h-8 md:h-16",
    lg: "h-16 md:h-24",
    xl: "h-24 md:h-32",
    "2xl": "h-32 md:h-48",
  }

  return <div className={`${sizeClasses[size]} ${className}`} aria-hidden="true" />
}

