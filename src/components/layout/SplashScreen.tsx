'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHiding(true)
    }, 2000)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2700)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0508] transition-opacity duration-700 ${
        isHiding ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A059]/10 blur-[120px] animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#7a4a24]/15 blur-[100px] animate-[pulse_2s_ease-in-out_0.5s_infinite]" />
      </div>

      <div className="relative z-10">
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute inset-0 -m-12 rounded-full bg-[#C5A059]/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-[#C5A059]/30 animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-[#C5A059]/20 animate-[spin_25s_linear_infinite_reverse]" />

          <div className="relative w-56 h-56 md:w-72 md:h-72 flex flex-col items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Cyprus Real Estate"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_0.2s_infinite]" />
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute right-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
      </div>

      <div className="absolute top-8 left-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute top-8 right-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute bottom-8 left-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute bottom-8 right-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
    </div>
  )
}
