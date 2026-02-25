import React from 'react'
import Image from 'next/image'
import { BedDouble, Maximize } from 'lucide-react'

interface EstateCardProps {
  id: string | number
  title: string
  location: string
  price: string
  description?: string
  propertyType?: string
  transactionType?: string
  rooms?: number
  area?: number
  imageUrl?: string
}

export default function EstateCard({
  id,
  title,
  location,
  description,
  propertyType,
  transactionType,
  rooms,
  area,
  price,
  imageUrl,
}: EstateCardProps) {
  return (
    <div className="group bg-[#12070c]/60 rounded-lg overflow-hidden border border-[#C5A059]/10 hover:border-[#C5A059]/30 transition-all duration-500 h-[28rem] flex flex-col hover:-translate-y-1">
      <div className="h-48 bg-[#0a0508] flex items-center justify-center relative overflow-hidden shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105 z-0"
          />
        ) : (
          <span className="text-[#C5A059]/40 font-serif tracking-widest uppercase text-sm z-10 transition-transform duration-700 group-hover:scale-105">
            Estate Image
          </span>
        )}

        {/* Transaction Type Label */}
        {transactionType && (
          <div className="absolute top-4 left-4 z-20 bg-[#C5A059] text-[#12070c] text-[0.65rem] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
            {transactionType}
          </div>
        )}

        {/* Property Type Label */}
        {propertyType && (
          <div className="absolute top-4 right-4 z-20 bg-[#12070c]/80 backdrop-blur-sm border border-[#C5A059]/30 text-white/90 text-[0.65rem] font-sans font-medium uppercase tracking-widest px-3 py-1.5 rounded-sm">
            {propertyType}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#12070c] via-[#12070c]/20 to-transparent z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Action Button */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <button className="px-6 py-2.5 bg-[#C5A059]/90 hover:bg-[#C5A059] text-[#12070c] font-sans font-medium text-sm tracking-wider uppercase rounded-sm transition-colors duration-300 backdrop-blur-md">
            View Estate
          </button>
        </div>

        <div className="absolute inset-0 bg-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between relative">
        <div className="flex-1">
          {/* Header Area */}
          <div>
            <h3 className="text-white/90 font-serif text-2xl tracking-wide group-hover:text-[#C5A059] transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-white/50 text-xs font-sans mt-2 tracking-wider uppercase">
              {location}
            </p>
          </div>

          {/* Description snippet */}
          {description && (
            <p className="text-white/60 text-sm font-light mt-4 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Features Row */}
          {(rooms || area) && (
            <div className="flex flex-wrap items-center gap-4 mt-5 text-white/70 text-xs font-light tracking-wider">
              {rooms && (
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />
                  {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              )}
              {area && (
                <span className="flex items-center gap-1.5">
                  <Maximize className="w-3 h-3 text-[#C5A059]" />
                  {area} m²
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Area with Price */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#C5A059]/10">
          <span className="text-[#C5A059] font-serif text-2xl tracking-wide font-medium">
            {price}
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-[#C5A059]/40 to-transparent group-hover:w-20 transition-all duration-500" />
        </div>
      </div>
    </div>
  )
}
