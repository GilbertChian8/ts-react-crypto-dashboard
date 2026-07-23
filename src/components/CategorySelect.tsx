import { useCategories } from '../hooks/useCategories'

type CategorySelectProps = {
  value: string
  onChange: (value: string) => void
}

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const { data: categories = [] } = useCategories()

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='h-10.5 px-3 rounded-[11px] border border-border bg-surface text-text text-sm outline-none focus:border-accent cursor-pointer'
    >
      <option value=''>All Categories</option>
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
