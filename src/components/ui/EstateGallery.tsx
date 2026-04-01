'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface GalleryImage {
  url: string
  alt: string
}

interface EstateGalleryProps {
  images: GalleryImage[]
}

export default function EstateGallery({ images }: EstateGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Keyboard controls
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, closeLightbox, lightboxPrev, lightboxNext])

  if (images.length === 0) return null

  const goTo = (index: number) => {
    setCurrentIndex(index)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(currentIndex)}
        >
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>

          {/* Navigation arrows for main image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo((currentIndex - 1 + images.length) % images.length)
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goTo((currentIndex + 1) % images.length)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 text-white/90 text-xs font-sans tracking-wider">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`relative w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  currentIndex === index
                    ? 'ring-2 ring-[var(--color-accent)] opacity-100 scale-105'
                    : 'opacity-50 hover:opacity-80 ring-1 ring-white/10'
                }`}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl cursor-pointer"
            onClick={closeLightbox}
          >
            {/* Close button — fixed top right, always visible */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[110] w-12 h-12 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="fixed top-5 left-4 md:top-7 md:left-6 z-[110] text-white/70 text-sm font-sans tracking-wider">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Centered image */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pt-16 pb-20 pointer-events-none">
              <div
                className="relative w-full h-full max-w-5xl max-h-[80vh] pointer-events-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightboxIndex].url}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    lightboxPrev()
                  }}
                  className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    lightboxNext()
                  }}
                  className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Bottom thumbnails */}
            {images.length > 1 && (
              <div
                className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[110] flex gap-2 max-w-[90vw] overflow-x-auto pb-1 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className={`relative w-14 h-10 md:w-16 md:h-12 rounded-md overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      lightboxIndex === index
                        ? 'ring-2 ring-[var(--color-accent)] opacity-100'
                        : 'opacity-40 hover:opacity-70 ring-1 ring-white/10'
                    }`}
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
