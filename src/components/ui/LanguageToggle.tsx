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
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]/80">
      <button
        className={`px-2 py-1 border border-[var(--color-accent)]/40 transition ${
          locale === 'en' ? 'text-[var(--color-accent)] border-[var(--color-accent)]/80' : 'hover:text-[var(--color-accent)]'
        }`}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 border border-[var(--color-accent)]/40 transition ${
          locale === 'ru' ? 'text-[var(--color-accent)] border-[var(--color-accent)]/80' : 'hover:text-[var(--color-accent)]'
        }`}
        onClick={() => setLocale('ru')}
      >
        RU
      </button>
      <button
        className={`px-2 py-1 border border-[var(--color-accent)]/40 transition ${
          locale === 'sk' ? 'text-[var(--color-accent)] border-[var(--color-accent)]/80' : 'hover:text-[var(--color-accent)]'
        }`}
        onClick={() => setLocale('sk')}
      >
        SK
      </button>
    </div>
  )
}
