'use client'

import { useEffect, useRef } from 'react'

export default function HeroDiamonds() {
  const diamondPrimaryRef = useRef<HTMLDivElement>(null)
  const diamondSecondaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const updateTransforms = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12

      const primary = diamondPrimaryRef.current
      const secondary = diamondSecondaryRef.current

      if (primary) {
        primary.style.transform = `translate3d(${(currentX * 30).toFixed(
          2,
        )}px, ${(currentY * 30).toFixed(2)}px, 0) rotate(45deg)`
      }

      if (secondary) {
        secondary.style.transform = `translate3d(${(currentX * 45).toFixed(
          2,
        )}px, ${(currentY * 45).toFixed(2)}px, 0) rotate(45deg)`
      }

      frame = requestAnimationFrame(updateTransforms)
    }

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      targetX = x
      targetY = y
    }

    frame = requestAnimationFrame(updateTransforms)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div
        ref={diamondPrimaryRef}
        className="absolute right-[8%] top-[38%] h-[180px] w-[180px] border border-[#C5A059]/30"
        style={{ transform: 'translate3d(0, 0, 0) rotate(45deg)' }}
      />
      <div
        ref={diamondSecondaryRef}
        className="absolute right-[12%] top-[42%] h-[140px] w-[140px] border border-[#C5A059]/15"
        style={{ transform: 'translate3d(0, 0, 0) rotate(45deg)' }}
      />
    </div>
  )
}
