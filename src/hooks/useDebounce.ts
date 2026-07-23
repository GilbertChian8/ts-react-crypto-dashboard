import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounceValue
}
