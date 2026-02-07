'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'fade'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
}

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
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

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all'
    const durationClass = `duration-[${duration * 1000}ms]`
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-12`
        case 'fade-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-12`
        case 'fade-left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-12`
        case 'fade-right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-12`
        case 'scale-up':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        case 'fade':
          return `${baseClasses} ${durationClass} opacity-0`
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-12`
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
