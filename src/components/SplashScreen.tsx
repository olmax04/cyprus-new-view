'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    // Через 2 секунды начинаем скрывать splash screen
    const hideTimer = setTimeout(() => {
      setIsHiding(true)
    }, 2000)

    // После завершения анимации скрытия вызываем callback
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2700) // 2000ms показ + 700ms fade out

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
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C5A059]/10 blur-[120px] animate-[pulse_2s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#7a4a24]/15 blur-[100px] animate-[pulse_2s_ease-in-out_0.5s_infinite]" />
      </div>

      {/* Логотип VR */}
      <div className="relative z-10">
        {/* Внешнее свечение */}
        <div className="absolute inset-0 -m-12 rounded-full bg-[#C5A059]/20 blur-3xl animate-pulse" />

        {/* Декоративные кольца */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#C5A059]/30 animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-[#C5A059]/20 animate-[spin_25s_linear_infinite_reverse]" />

        {/* Логотип */}
        <div className="relative text-[8rem] font-serif tracking-wider font-medium">
          <div className="relative">
            {/* Текст с градиентом */}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#d4b26a] via-[#BB9A31] to-[#6E5B1D] drop-shadow-[0_0_30px_rgba(197,160,89,0.5)]">
              V<span className="absolute left-12 top-2">R</span>
            </span>

            {/* Анимированная линия под логотипом */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Текст Cyprus Real Estate */}
        <div className="mt-16 text-center">
          <p className="text-[#C5A059] text-sm uppercase tracking-[0.3em] font-sans">
            Cyprus Real Estate
          </p>
        </div>

        {/* Анимированные точки загрузки */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_0.2s_infinite]" />
          <div className="w-2 h-2 rounded-full bg-[#C5A059]/60 animate-[pulse_1.5s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>

      {/* Декоративные линии */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute right-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
      </div>

      {/* Декоративные ромбы по углам */}
      <div className="absolute top-8 left-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute top-8 right-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute bottom-8 left-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
      <div className="absolute bottom-8 right-8 w-3 h-3 rotate-45 border border-[#C5A059]/40" />
    </div>
  )
}
