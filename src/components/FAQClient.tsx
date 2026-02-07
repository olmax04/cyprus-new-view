'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQItemProps = {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-[#C5A059]/20 bg-[#1a0b10]/30 backdrop-blur-sm overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-[#C5A059]/5 transition-colors"
      >
        <h3
          className="text-lg md:text-xl text-white font-light pr-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 md:w-6 md:h-6 text-[#C5A059] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 md:px-8 pb-5 md:pb-6 pt-2">
          <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

type FAQClientProps = {
  items: Array<{ question: string; answer: string }>
}

export default function FAQClient({ items }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
