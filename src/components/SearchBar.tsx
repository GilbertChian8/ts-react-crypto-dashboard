type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className='relative'>
      <span className='absolute left-3.25 top-1/2 -translate-y-1/2 text-text-dim text-sm'>
        ⌕
      </span>
      <input
        type='text'
        placeholder='Search coins…'
        className='h-10.5 w-full pl-8.5 pr-3.5 rounded-[11px] border border-border bg-surface text-text text-sm outline-none focus:border-accent'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
