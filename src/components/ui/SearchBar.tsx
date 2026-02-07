import Button from '@/components/ui/Button'

type SearchBarProps = {
  search: {
    cityLabel: string
    propertyLabel: string
    budgetLabel: string
    cities: Array<{ label: string }>
    propertyTypes: Array<{ label: string }>
    budgets: Array<{ label: string }>
  }
  searchButtonLabel: string
}

export default function SearchBar({ search, searchButtonLabel }: SearchBarProps) {
  return (
    <div className="relative z-20 px-6 md:px-16 lg:px-24 pb-10">
      <div className="grid gap-3 md:grid-cols-[1.2fr_1.1fr_1fr_auto] items-center bg-[#12070c]/50 backdrop-blur-md border border-[#C5A059]/20 p-4 md:p-5">
        <select className="bg-transparent text-white/80 text-[1.0625rem] uppercase tracking-[0.2em] outline-none">
          <option>{search.cityLabel}</option>
          {search.cities.map((item) => (
            <option key={item.label}>{item.label}</option>
          ))}
        </select>
        <select className="bg-transparent text-white/80 text-[1.0625rem] uppercase tracking-[0.2em] outline-none">
          <option>{search.propertyLabel}</option>
          {search.propertyTypes.map((item) => (
            <option key={item.label}>{item.label}</option>
          ))}
        </select>
        <select className="bg-transparent text-white/80 text-[1.0625rem] uppercase tracking-[0.2em] outline-none">
          <option>{search.budgetLabel}</option>
          {search.budgets.map((item) => (
            <option key={item.label}>{item.label}</option>
          ))}
        </select>
        <Button label={searchButtonLabel} className="px-8 py-3" />
      </div>
    </div>
  )
}
