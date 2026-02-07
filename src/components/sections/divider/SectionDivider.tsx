'use client'

import { useEffect, useRef, useState } from 'react'

export default function SectionDivider() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full py-0 bg-[#12070c] overflow-hidden">
      {/* Декоративные линии */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent transition-all ease-out ${
            isVisible ? 'opacity-100 scale-x-100 duration-[1500ms]' : 'opacity-0 scale-x-0 duration-300'
          }`}
        />
      </div>

      {/* Центральный элемент */}
      <div className="relative z-10 flex items-center justify-center gap-8 py-16 md:py-20">
        <div
          className={`hidden md:block w-32 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/60 transition-all ease-out ${
            isVisible ? 'opacity-100 scale-x-100 duration-[1200ms] delay-300' : 'opacity-0 scale-x-0 duration-300'
          }`}
        />

        {/* Центральный ромб */}
        <div
          className={`relative transition-all ease-out ${
            isVisible ? 'opacity-100 scale-100 rotate-45 duration-[800ms] delay-500' : 'opacity-0 scale-0 rotate-0 duration-300'
          }`}
        >
          <div className="w-4 h-4 border border-[#C5A059] bg-[#C5A059]/20" />
          <div className="absolute inset-0 w-4 h-4 border border-[#C5A059]/40 bg-[#C5A059]/10 blur-sm animate-pulse" />
        </div>

        <div
          className={`hidden md:block w-32 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/60 transition-all ease-out ${
            isVisible ? 'opacity-100 scale-x-100 duration-[1200ms] delay-300' : 'opacity-0 scale-x-0 duration-300'
          }`}
        />
      </div>

      {/* Декоративные точки */}
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        <div
          className={`absolute left-1/4 w-1 h-1 rounded-full bg-[#C5A059]/30 transition-all ease-out ${
            isVisible ? 'opacity-100 scale-100 duration-700 delay-700' : 'opacity-0 scale-0 duration-300'
          }`}
        />
        <div
          className={`absolute right-1/4 w-1 h-1 rounded-full bg-[#C5A059]/30 transition-all ease-out ${
            isVisible ? 'opacity-100 scale-100 duration-700 delay-700' : 'opacity-0 scale-0 duration-300'
          }`}
        />
      </div>

      {/* Фоновое свечение */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[300px] h-[300px] bg-[#C5A059]/5 rounded-full blur-[100px] transition-all ease-out ${
            isVisible ? 'opacity-100 scale-100 duration-[1500ms]' : 'opacity-0 scale-0 duration-300'
          }`}
        />
      </div>
    </div>
  )
}
