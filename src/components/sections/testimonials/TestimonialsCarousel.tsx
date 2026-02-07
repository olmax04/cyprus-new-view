'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

type TestimonialItem = {
  name: string
  role?: string | null
  country?: string | null
  content: string
  image?: { url?: string | null } | number | null
  rating?: number | null
}

type TestimonialsCarouselProps = {
  items: TestimonialItem[]
}

export default function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const activeItem = items[activeIndex]
  const image = typeof activeItem?.image === 'number' ? null : activeItem?.image
  const imageSrc = image?.url

  return (
    <div className="relative">
      {/* Карточка отзыва */}
      <div className="relative bg-[#1a0b10]/40 backdrop-blur-sm border border-[#C5A059]/20 p-8 md:p-12 rounded-lg overflow-hidden transition-all duration-700 ease-in-out">
        {/* Кавычки */}
        <div
          className="absolute top-6 left-6 text-6xl text-[#C5A059]/20 transition-opacity duration-500"
          style={{ fontFamily: 'var(--font-serif)', opacity: isAnimating ? 0 : 1 }}
        >
          &ldquo;
        </div>

        <div
          className={`relative z-10 transition-all duration-500 ease-out ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Рейтинг */}
          {activeItem?.rating && (
            <div className="flex gap-1 mb-6 transition-all duration-500">
              {Array.from({ length: activeItem.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
              ))}
            </div>
          )}

          {/* Текст отзыва */}
          <p
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic transition-all duration-500"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {activeItem?.content}
          </p>

          {/* Клиент */}
          <div className="flex items-center gap-4 transition-all duration-500">
            {imageSrc && (
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#C5A059]/30 transition-all duration-500">
                <Image src={imageSrc} alt={activeItem?.name || ''} fill className="object-cover" />
              </div>
            )}
            <div>
              <div
                className="text-white text-lg md:text-xl font-light mb-1 transition-all duration-500"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {activeItem?.name}
              </div>
              {(activeItem?.role || activeItem?.country) && (
                <div
                  className="text-[#C5A059]/70 text-sm transition-all duration-500"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {[activeItem?.role, activeItem?.country].filter(Boolean).join(' • ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Элементы управления */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-12 h-12 flex items-center justify-center border border-[#C5A059]/40 bg-transparent text-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Индикаторы */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === activeIndex
                    ? 'bg-[#C5A059] w-8'
                    : 'bg-[#C5A059]/30 hover:bg-[#C5A059]/50 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-12 h-12 flex items-center justify-center border border-[#C5A059]/40 bg-transparent text-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}
