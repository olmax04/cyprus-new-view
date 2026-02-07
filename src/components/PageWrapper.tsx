'use client'

import { useState } from 'react'
import SplashScreen from './SplashScreen'
import HeroContent from './HeroContent'

interface PageWrapperProps {
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
}

export default function PageWrapper({
  title,
  stats,
  categories,
  buttons,
  galleryItems,
}: PageWrapperProps) {
  const [splashComplete, setSplashComplete] = useState(false)

  return (
    <>
      {!splashComplete && <SplashScreen onComplete={() => setSplashComplete(true)} />}
      <HeroContent
        title={title}
        stats={stats}
        categories={categories}
        buttons={buttons}
        galleryItems={galleryItems}
        startAnimation={splashComplete}
      />
    </>
  )
}
