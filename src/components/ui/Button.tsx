import Link from 'next/link'

type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost'
  className?: string
  href?: string
}

export default function Button({ label, variant = 'primary', className, href }: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center px-10 md:px-16 py-3 border font-serif tracking-[0.2em] text-[0.9375rem] md:text-[1.0625rem] uppercase overflow-hidden font-medium transition-all duration-500'
  const variants = {
    primary:
      'border-[var(--color-accent)]/50 bg-[var(--color-bg-mid)]/30 backdrop-blur-sm text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-mid)]',
    ghost:
      'border-[var(--color-accent)]/40 bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/70',
  }

  const shimmer = variant === 'primary' && (
    <div className="absolute inset-0 bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
  )

  const combinedClassName = `${base} ${variants[variant]} w-[220px] md:w-full h-[52px] ${className ?? ''}`

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        <span className="relative z-10">{label}</span>
        {shimmer}
      </Link>
    )
  }

  return (
    <button className={combinedClassName}>
      <span className="relative z-10">{label}</span>
      {shimmer}
    </button>
  )
}
