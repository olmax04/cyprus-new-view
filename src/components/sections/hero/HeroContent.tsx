'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import WatchVideoButton from '@/components/ui/WatchVideoButton'
import HeroGallery from '@/components/sections/hero/HeroGallery'
import bgImage from '../../../../figma/bgImage.png'

interface HeroContentProps {
  title: {
    line1: string
    line2: string
    line3: string
  }
  stats: Array<{ value: string; label: string }>
  categories: Array<{ label: string }>
  buttons: {
    primaryLabel: string
    secondaryLabel: string
  }
  galleryItems: Array<{ src: string; alt: string }>
  startAnimation: boolean
}

export default function HeroContent({
  title,
  stats,
  categories,
  buttons,
  galleryItems,
  startAnimation,
}: HeroContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (startAnimation) {
      const timer = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(timer)
    }
  }, [startAnimation])

  return (
    <>
      {/* 1. ФОН И ОВЕРЛЕИ */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Luxury apartment background"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      </div>

      {/* 2. ДЕКОРАТИВНЫЕ ЛИНИИ */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className={`absolute left-4 md:left-[6%] h-full w-[1px] bg-[#C5A059] transition-all duration-1000 ${
            mounted ? 'opacity-30 md:opacity-40' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute left-6 md:left-[7%] h-full w-[1px] bg-[#C5A059] transition-all duration-1000 delay-100 ${
            mounted ? 'opacity-20 md:opacity-30' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-4 h-full w-[1px] bg-[#C5A059] md:hidden transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-30' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-6 h-full w-[1px] bg-[#C5A059] md:hidden transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-20' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-20 md:top-24 w-full h-[1px] bg-[#C5A059] transition-all duration-1000 delay-400 ${
            mounted ? 'opacity-30 md:opacity-40 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </div>

      {/* 2.1 ЛЮКС-ФОРМЫ */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className={`absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#C5A059]/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite] transition-all duration-1000 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        <div
          className={`absolute top-[15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[#7a4a24]/20 blur-[160px] animate-[pulse_14s_ease-in-out_infinite] transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        <div
          className={`absolute bottom-[-20%] left-[10%] h-[360px] w-[360px] rounded-full bg-[#C5A059]/15 blur-[140px] animate-[pulse_12s_ease-in-out_infinite] transition-all duration-1000 delay-400 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>

      {/* 3. КОНТЕНТ */}
      <div className="relative z-20 flex flex-col h-full min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-start text-left pb-10 md:pb-16 pt-24 md:pt-28">
          <div className="pl-8 pr-6 sm:pl-10 md:pl-[8%] md:pr-16 w-full ml-0">
            <div className="w-full md:flex md:items-start md:justify-between gap-10 items-start">
              <div className="flex-1 items-start">
                <h1
                  className="self-start font-serif text-[clamp(2rem,10vw,9rem)] leading-[0.95] min-[768px]:leading-[0.9] min-[1024px]:leading-[0.85] tracking-[0.05em] uppercase grid gap-2 min-[768px]:gap-3 min-[1024px]:gap-4 drop-shadow-lg font-light min-[768px]:font-normal w-full max-w-none text-left break-words"
                  style={{ '--track': '0.05em' } as CSSProperties}
                >
                  <span
                    className={`w-fit text-transparent bg-clip-text bg-gradient-to-b from-[#d4b26a] via-[#BB9A31] to-[#6E5B1D] transition-all duration-700 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                  >
                    {title.line1}
                  </span>
                  <span
                    className={`w-fit text-transparent bg-clip-text bg-gradient-to-b from-[#d4b26a] via-[#BB9A31] to-[#6E5B1D] transition-all duration-700 delay-200 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                  >
                    {title.line2}
                  </span>
                  <span
                    className={`w-fit text-transparent bg-clip-text bg-gradient-to-b from-[#d4b26a] via-[#BB9A31] to-[#6E5B1D] transition-all duration-700 delay-400 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                  >
                    {title.line3}
                  </span>
                </h1>

                <div
                  className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 text-[#C5A059] transition-all duration-700 delay-600 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {stats.map((stat) => (
                    <div key={`${stat.value}-${stat.label}`}>
                      <div className="text-2xl md:text-3xl font-light">{stat.value}</div>
                      <div className="text-[0.6875rem] md:text-[0.8125rem] uppercase tracking-[0.3em] text-[#C5A059]/70">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-4 flex flex-wrap items-center gap-2 md:gap-3 text-[0.6875rem] md:text-[0.8125rem] uppercase tracking-[0.3em] text-white/70 transition-all duration-700 delay-700 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {categories.map((category, index) => (
                    <span key={category.label} className="flex items-center gap-2 md:gap-3">
                      {category.label}
                      {index < categories.length - 1 && (
                        <span className="text-[#C5A059]/30">•</span>
                      )}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-6 md:mt-5 md:-translate-y-2 max-w-md relative z-30 transition-all duration-700 delay-800 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="flex flex-wrap md:grid md:grid-cols-2 items-center gap-4">
                    <Button label={buttons.primaryLabel} />
                    <WatchVideoButton label={buttons.secondaryLabel} />
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-1000 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <HeroGallery items={galleryItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
