'use client'

type LanguageToggleProps = {
  locale: 'en' | 'ru' | 'sk'
}

export default function LanguageToggle({ locale }: LanguageToggleProps) {
  const setLocale = (nextLocale: 'en' | 'ru' | 'sk') => {
    document.cookie = `site-locale=${nextLocale}; path=/; max-age=31536000`
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059]/80">
      <button
        className={`px-2 py-1 border border-[#C5A059]/40 transition ${
          locale === 'en' ? 'text-[#C5A059] border-[#C5A059]/80' : 'hover:text-[#C5A059]'
        }`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 border border-[#C5A059]/40 transition ${
          locale === 'ru' ? 'text-[#C5A059] border-[#C5A059]/80' : 'hover:text-[#C5A059]'
        }`}
        onClick={() => setLocale('ru')}
      >
        RU
      </button>
      <button
        className={`px-2 py-1 border border-[#C5A059]/40 transition ${
          locale === 'sk' ? 'text-[#C5A059] border-[#C5A059]/80' : 'hover:text-[#C5A059]'
        }`}
        onClick={() => setLocale('sk')}
      >
        SK
      </button>
    </div>
  )
}
