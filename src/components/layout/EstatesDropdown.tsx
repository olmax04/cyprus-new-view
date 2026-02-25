'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface EstatesDropdownProps {
  locale: 'en' | 'ru' | 'sk'
  label: string
}

export default function EstatesDropdown({ locale, label }: EstatesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTransaction, setActiveTransaction] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const t = {
    sale: locale === 'ru' ? 'Продажа' : locale === 'sk' ? 'Na predaj' : 'For Sale',
    rent: locale === 'ru' ? 'Аренда' : locale === 'sk' ? 'Na prenájom' : 'For Rent',
    villa: locale === 'ru' ? 'Виллы' : locale === 'sk' ? 'Vily' : 'Villas',
    apartment: locale === 'ru' ? 'Апартаменты' : locale === 'sk' ? 'Apartmány' : 'Apartments',
    townhouse: locale === 'ru' ? 'Таунхаусы' : locale === 'sk' ? 'Mestské domy' : 'Townhouses',
    penthouse: locale === 'ru' ? 'Пентхаусы' : locale === 'sk' ? 'Penthousy' : 'Penthouses',
    all: locale === 'ru' ? 'Смотреть все' : locale === 'sk' ? 'Zobraziť všetky' : 'View All',
  }

  const transactions = [
    { id: 'sale', label: t.sale },
    { id: 'rent', label: t.rent },
  ]

  const propertyTypes = [
    { id: 'villa', label: t.villa },
    { id: 'apartment', label: t.apartment },
    { id: 'townhouse', label: t.townhouse },
    { id: 'penthouse', label: t.penthouse },
  ]

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveTransaction(null)
    }, 150) // Small delay prevents accidental closing
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    window.dispatchEvent(new Event('trigger-splash'))
    setTimeout(() => {
      router.push(href)
    }, 100)
  }

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <Link
        href="/estates"
        onClick={(e) => handleLinkClick(e, '/estates')}
        className="hover:text-[#C5A059] transition-colors relative flex items-center gap-1 h-full"
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 opacity-50 ${isOpen ? 'rotate-180 text-[#C5A059] opacity-100' : ''}`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-px bg-[#C5A059] transition-all ${
            isOpen ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </Link>

      {/* Main Dropdown */}
      <div
        className={`absolute top-full left-0 mt-4 w-56 bg-[#0a0508]/95 backdrop-blur-xl border border-[#C5A059]/30 rounded-sm shadow-2xl transition-all duration-300 origin-top-left ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />{' '}
        {/* Invisible hover bridge */}
        <ul className="py-2">
          {/* View All Option */}
          <li className="px-2">
            <Link
              href="/estates"
              onClick={(e) => handleLinkClick(e, '/estates')}
              className="block px-4 py-2.5 text-sm text-[#C5A059] border-b border-[#C5A059]/10 hover:bg-[#C5A059]/10 transition-colors rounded-sm font-medium tracking-wide"
            >
              {t.all}
            </Link>
          </li>

          {/* Transaction Types */}
          {transactions.map((trans) => (
            <li
              key={trans.id}
              className="relative px-2 group/item mt-1"
              onMouseEnter={() => setActiveTransaction(trans.id)}
            >
              <button
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors rounded-sm ${
                  activeTransaction === trans.id
                    ? 'bg-[#C5A059]/10 text-white'
                    : 'text-white/70 hover:bg-[#C5A059]/5 hover:text-white'
                }`}
              >
                {trans.label}
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-300 ${activeTransaction === trans.id ? 'text-[#C5A059] translate-x-1' : 'text-white/30'}`}
                />
              </button>

              {/* Sub-menu (Property Types) */}
              <div
                className={`absolute top-0 left-full ml-1 w-48 bg-[#0a0508]/98 backdrop-blur-xl border border-[#C5A059]/30 rounded-sm shadow-2xl transition-all duration-300 origin-left ${
                  activeTransaction === trans.id
                    ? 'opacity-100 scale-100 visible'
                    : 'opacity-0 scale-95 invisible'
                }`}
              >
                <div className="absolute top-0 -left-2 w-2 h-full bg-transparent" />{' '}
                {/* Hover bridge */}
                <ul className="py-2">
                  <li className="px-2 mb-1">
                    <span className="block px-4 py-1 text-xs text-[#C5A059]/60 uppercase tracking-widest font-serif">
                      {trans.label}
                    </span>
                  </li>
                  {propertyTypes.map((prop) => (
                    <li key={prop.id} className="px-2">
                      <Link
                        href={`/estates?transactionType=${trans.id}&propertyType=${prop.id}`}
                        onClick={(e) =>
                          handleLinkClick(
                            e,
                            `/estates?transactionType=${trans.id}&propertyType=${prop.id}`,
                          )
                        }
                        className="block px-4 py-2 text-sm text-white/70 hover:bg-[#C5A059]/10 hover:text-white transition-colors rounded-sm group-hover/link"
                      >
                        {prop.label}
                      </Link>
                    </li>
                  ))}
                  <li className="px-2 mt-1 pt-1 border-t border-[#C5A059]/10">
                    <Link
                      href={`/estates?transactionType=${trans.id}`}
                      onClick={(e) => handleLinkClick(e, `/estates?transactionType=${trans.id}`)}
                      className="block px-4 py-2 text-sm text-[#C5A059]/80 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors rounded-sm italic"
                    >
                      {t.all} {trans.label.toLowerCase()}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
