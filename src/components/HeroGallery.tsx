'use client'

import { useEffect, useRef, useState, type TouchEvent } from 'react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

type GalleryItem = {
  src: StaticImageData | string
  alt: string
}

type HeroGalleryProps = {
  items: GalleryItem[]
}

export default function HeroGallery({ items }: HeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (items.length === 0) return
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 12000)

    return () => window.clearInterval(interval)
  }, [items.length])

  const goPrev = () => {
    if (items.length === 0) return
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goNext = () => {
    if (items.length === 0) return
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(delta) < 40) return
    if (delta > 0) {
      goPrev()
    } else {
      goNext()
    }
  }

  return (
    <div className="hidden md:block w-[560px] md:w-[1200px] lg:w-[1280px] xl:w-[1360px] relative overflow-visible">
      <div
        className="relative h-[300px] md:h-[320px] lg:h-[400px] overflow-visible"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, index) => {
          const offset = (index - activeIndex + items.length) % items.length
          const isVisible = offset <= 2
          const styles =
            offset === 0
              ? { transform: 'translateY(0) scale(1)', opacity: 1, zIndex: 3 }
              : offset === 1
                ? { transform: 'translateY(32px) scale(0.97)', opacity: 1, zIndex: 2 }
                : offset === 2
                  ? { transform: 'translateY(64px) scale(0.94)', opacity: 1, zIndex: 1 }
                  : { transform: 'translateY(80px) scale(0.9)', opacity: 0, zIndex: 0 }

          return (
            <div
              key={item.alt}
              className={`absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[230px] md:h-[260px] lg:h-[300px] p-[1px] bg-gradient-to-b from-[#f6e1a2] via-[#C5A059] to-[#6E5B1D] transition-all duration-700 ${
                isVisible ? '' : 'pointer-events-none'
              }`}
              style={styles}
              onClick={goNext}
            >
              <div className="relative h-full w-full overflow-hidden bg-transparent">
                <Image src={item.src} alt={item.alt} fill className="object-cover opacity-100" />
                <div className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.35em] text-[#C5A059]/80">
                  {item.alt}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
