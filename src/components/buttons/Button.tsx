type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export default function Button({ label, variant = 'primary', className }: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center px-10 md:px-16 py-3 border font-serif tracking-[0.2em] text-[0.9375rem] md:text-[1.0625rem] uppercase overflow-hidden font-medium transition-all duration-500'
  const variants = {
    primary:
      'border-[#C5A059]/50 bg-[#1a0b10]/30 backdrop-blur-sm text-[#C5A059] hover:bg-[#C5A059] hover:text-[#1a0b10]',
    ghost:
      'border-[#C5A059]/40 bg-transparent text-[#C5A059] hover:bg-[#C5A059]/10 hover:border-[#C5A059]/70',
  }

  return (
    <button
      className={`${base} ${variants[variant]} w-[220px] md:w-full h-[52px] ${className ?? ''}`}
    >
      <span className="relative z-10">{label}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
      )}
    </button>
  )
}
