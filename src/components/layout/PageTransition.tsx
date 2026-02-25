'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import SplashScreen from '@/components/layout/SplashScreen'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    // Only show splash screen on actual navigation between different paths
    if (pathname !== prevPathname) {
      setIsTransitioning(true)
      setPrevPathname(pathname)
    }
  }, [pathname, prevPathname])

  useEffect(() => {
    const triggerSplash = () => setIsTransitioning(true)
    window.addEventListener('trigger-splash', triggerSplash)
    return () => window.removeEventListener('trigger-splash', triggerSplash)
  }, [])

  return (
    <>
      {isTransitioning && <SplashScreen onComplete={() => setIsTransitioning(false)} />}
      {children}
    </>
  )
}
