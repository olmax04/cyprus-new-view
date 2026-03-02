'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import CustomSelect from './CustomSelect'

interface EstatesFilterProps {
  locale: string
}

export default function EstatesFilter({ locale }: EstatesFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isExpanded, setIsExpanded] = useState(false)

  // Local state for the form
  const [filters, setFilters] = useState({
    transactionType: searchParams.get('transactionType') || '',
    propertyType: searchParams.get('propertyType') || '',
    location: searchParams.get('location') || '',
    rooms: searchParams.get('rooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
  })

  // Sycn state with URL if it changes outside (e.g. from Header dropdown)
  useEffect(() => {
    setFilters({
      transactionType: searchParams.get('transactionType') || '',
      propertyType: searchParams.get('propertyType') || '',
      location: searchParams.get('location') || '',
      rooms: searchParams.get('rooms') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minArea: searchParams.get('minArea') || '',
      maxArea: searchParams.get('maxArea') || '',
    })
  }, [searchParams])

  const t = {
    searchBtn: locale === 'ru' ? 'Поиск' : locale === 'sk' ? 'Hľadať' : 'Search',
    filtersBtn: locale === 'ru' ? 'Фильтры' : locale === 'sk' ? 'Filtre' : 'Filters',
    clearBtn: locale === 'ru' ? 'Очистить' : locale === 'sk' ? 'Vyčistiť' : 'Clear',
    all: locale === 'ru' ? 'Все' : locale === 'sk' ? 'Všetky' : 'All',
    sale: locale === 'ru' ? 'Продажа' : locale === 'sk' ? 'Predaj' : 'For Sale',
    rent: locale === 'ru' ? 'Аренда' : locale === 'sk' ? 'Nájom' : 'For Rent',
    status: locale === 'ru' ? 'Тип сделки' : locale === 'sk' ? 'Status' : 'Status',
    propType: locale === 'ru' ? 'Тип объекта' : locale === 'sk' ? 'Typ' : 'Property Type',
    location: locale === 'ru' ? 'Местоположение' : locale === 'sk' ? 'Lokalita' : 'Location',
    rooms: locale === 'ru' ? 'Комнаты' : locale === 'sk' ? 'Izby' : 'Rooms',
    priceMin:
      locale === 'ru' ? 'Мин. цена (€)' : locale === 'sk' ? 'Min. cena (€)' : 'Min Price (€)',
    priceMax:
      locale === 'ru' ? 'Макс. цена (€)' : locale === 'sk' ? 'Max. cena (€)' : 'Max Price (€)',
    areaMin:
      locale === 'ru'
        ? 'Мин. площадь (м²)'
        : locale === 'sk'
          ? 'Min. plocha (m²)'
          : 'Min Area (m²)',
    areaMax:
      locale === 'ru'
        ? 'Макс. площадь (м²)'
        : locale === 'sk'
          ? 'Max. plocha (m²)'
          : 'Max Area (m²)',
    locPlaceholder:
      locale === 'ru'
        ? 'Город или район'
        : locale === 'sk'
          ? 'Mesto alebo región'
          : 'City or region',
    from: locale === 'ru' ? 'От' : locale === 'sk' ? 'Od' : 'From',
    to: locale === 'ru' ? 'До' : locale === 'sk' ? 'Do' : 'To',
    villa: locale === 'ru' ? 'Виллы' : locale === 'sk' ? 'Vily' : 'Villas',
    apartment: locale === 'ru' ? 'Апартаменты' : locale === 'sk' ? 'Apartmány' : 'Apartments',
    townhouse: locale === 'ru' ? 'Таунхаусы' : locale === 'sk' ? 'Mestské domy' : 'Townhouses',
    penthouse: locale === 'ru' ? 'Пентхаусы' : locale === 'sk' ? 'Penthousy' : 'Penthouses',
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } },
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent '-', '+', 'e' and 'E' from being typed in number inputs
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault()
    }
  }

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`${pathname}?${params.toString()}`)
  }, [filters, pathname, router, searchParams])

  const clearFilters = () => {
    setFilters({
      transactionType: '',
      propertyType: '',
      location: '',
      rooms: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
    })
    router.push(pathname)
  }

  const inputClasses =
    'w-full bg-[#0a0508]/80 border border-[#C5A059]/20 hover:border-[#C5A059]/50 text-white text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-all duration-300 placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0'

  return (
    <div className="w-full bg-[#12070c]/80 backdrop-blur-md border border-[#C5A059]/30 rounded-lg p-6 mb-12 shadow-2xl relative z-40">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Core Filters */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Transaction Type */}
          <div className="flex flex-col">
            <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
              {t.status}
            </span>
            <CustomSelect
              name="transactionType"
              value={filters.transactionType}
              onChange={handleChange}
              placeholder={t.all}
              options={[
                { label: t.sale, value: 'sale' },
                { label: t.rent, value: 'rent' },
              ]}
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col">
            <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
              {t.propType}
            </span>
            <CustomSelect
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              placeholder={t.all}
              options={[
                { label: t.villa, value: 'villa' },
                { label: t.apartment, value: 'apartment' },
                { label: t.townhouse, value: 'townhouse' },
                { label: t.penthouse, value: 'penthouse' },
              ]}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
              {t.location}
            </span>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange as any}
              placeholder={t.locPlaceholder}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-end mt-4 lg:mt-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 h-[46px] px-4 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059]/20 hover:border-[#C5A059]/50 rounded-sm transition-colors text-sm font-sans uppercase tracking-wider whitespace-nowrap"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t.filtersBtn}</span>
          </button>

          <button
            onClick={applyFilters}
            className="flex-1 lg:flex-none items-center justify-center gap-2 h-[46px] px-8 bg-[#C5A059] hover:bg-[#d4b26a] hover:scale-[1.02] text-[#12070c] rounded-sm transition-all text-sm font-sans font-bold uppercase tracking-wider whitespace-nowrap flex shadow-lg hover:shadow-[#C5A059]/20"
          >
            <Search className="w-4 h-4" />
            {t.searchBtn}
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-500 overflow-visible ${
          isExpanded ? 'mt-6 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Rooms */}
        <div className="flex flex-col">
          <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
            {t.rooms}
          </span>
          <CustomSelect
            name="rooms"
            value={filters.rooms}
            onChange={handleChange}
            placeholder={t.all}
            options={[
              { label: '1+', value: '1' },
              { label: '2+', value: '2' },
              { label: '3+', value: '3' },
              { label: '4+', value: '4' },
              { label: '5+', value: '5' },
            ]}
          />
        </div>

        {/* Price Min/Max */}
        <div className="flex flex-col md:col-span-1">
          <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
            {t.priceMin}
          </span>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange as any}
            onKeyDown={handleNumberKeyDown}
            min="0"
            placeholder={t.from}
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col md:col-span-1">
          <span className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2">
            {t.priceMax}
          </span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange as any}
            onKeyDown={handleNumberKeyDown}
            min="0"
            placeholder={t.to}
            className={inputClasses}
          />
        </div>

        {/* Area Min/Max */}
        <div className="flex flex-col md:col-span-1 gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <span
                className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2 block truncate"
                title={t.areaMin}
              >
                {t.areaMin}
              </span>
              <input
                type="number"
                name="minArea"
                value={filters.minArea}
                onChange={handleChange as any}
                onKeyDown={handleNumberKeyDown}
                min="0"
                placeholder={t.from}
                className={inputClasses}
              />
            </div>
            <div className="flex-1">
              <span
                className="text-white/50 text-xs font-sans uppercase tracking-wider mb-2 block truncate"
                title={t.areaMax}
              >
                {t.areaMax}
              </span>
              <input
                type="number"
                name="maxArea"
                value={filters.maxArea}
                onChange={handleChange as any}
                onKeyDown={handleNumberKeyDown}
                min="0"
                placeholder={t.to}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="md:col-span-4 flex justify-end mt-2">
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-white/50 hover:text-[#C5A059] transition-colors text-xs font-sans uppercase tracking-wider"
          >
            <X className="w-3 h-3" />
            {t.clearBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
