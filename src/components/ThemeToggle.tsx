import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={() => toggleTheme(theme)}
      className='flex items-center gap-2 h-9.5 px-3.5 rounded-[10px] border border-border bg-surface text-text text-[13px] font-semibold cursor-pointer'
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
