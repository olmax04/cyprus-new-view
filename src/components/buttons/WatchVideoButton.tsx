type WatchVideoButtonProps = {
  label?: string
  className?: string
}

export default function WatchVideoButton({ label = 'Watch Video', className }: WatchVideoButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center px-10 md:px-16 py-3 border border-[#C5A059]/40 bg-transparent text-[#C5A059] font-serif tracking-[0.2em] text-[0.9375rem] md:text-[1.0625rem] uppercase overflow-hidden font-medium transition-all duration-500 hover:bg-[#C5A059]/10 hover:border-[#C5A059]/70 w-[220px] md:w-full h-[52px] ${
        className ?? ''
      }`}
    >
      <span className="relative z-10">{label}</span>
    </button>
  )
}
