'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'fade'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  /** How much of the element must be visible before triggering (0-1) */
  threshold?: number
}

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 1,
  className = '',
  threshold = 0.15,
}: AnimatedSectionProps) {
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
        threshold,
        rootMargin: '0px 0px -80px 0px',
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
  }, [threshold])

  const getInitialStyles = (): React.CSSProperties => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate(0, 0) scale(1)',
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }
    }

    const base: React.CSSProperties = {
      opacity: 0,
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    }

    switch (animation) {
      case 'fade-up':
        return { ...base, transform: 'translateY(60px)' }
      case 'fade-down':
        return { ...base, transform: 'translateY(-60px)' }
      case 'fade-left':
        return { ...base, transform: 'translateX(60px)' }
      case 'fade-right':
        return { ...base, transform: 'translateX(-60px)' }
      case 'scale-up':
        return { ...base, transform: 'scale(0.9)' }
      case 'fade':
        return { ...base, transform: 'translate(0, 0)' }
      default:
        return { ...base, transform: 'translateY(60px)' }
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={getInitialStyles()}
    >
      {children}
    </div>
  )
}
