'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  name: string
  value: string
  options: Option[]
  onChange: (e: { target: { name: string; value: string } }) => void
  placeholder?: string
}

export default function CustomSelect({
  name,
  value,
  options,
  onChange,
  placeholder = 'All',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#0a0508]/80 border border-[#C5A059]/20 hover:border-[#C5A059]/50 text-white text-sm rounded-sm px-4 py-3 focus:outline-none transition-all duration-300"
      >
        <span className={selectedOption ? 'text-white' : 'text-white/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-50 w-full mt-2 bg-[#0a0508]/95 backdrop-blur-md border border-[#C5A059]/30 rounded-sm shadow-2xl transition-all duration-300 transform origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <ul className="max-h-60 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <li
            onClick={() => {
              onChange({ target: { name, value: '' } })
              setIsOpen(false)
            }}
            className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-200 ${
              value === ''
                ? 'bg-[#C5A059]/20 text-[#C5A059]'
                : 'text-white/70 hover:bg-[#C5A059]/10 hover:text-white'
            }`}
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange({ target: { name, value: opt.value } })
                setIsOpen(false)
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-200 border-t border-[#C5A059]/5 ${
                value === opt.value
                  ? 'bg-[#C5A059]/20 text-[#C5A059]'
                  : 'text-white/70 hover:bg-[#C5A059]/10 hover:text-white'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
