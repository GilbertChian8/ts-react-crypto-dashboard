import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { FavoriteContext } from './FavoriteContext'

export default function FavoriteProvider({
  children,
}: {
  children: ReactNode
}) {
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteCoins')
    return saved ? (JSON.parse(saved) as string[]) : []
  })

  useEffect(() => {
    localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins))
  }, [favoriteCoins])

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteCoins((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    )
  }, [])

  const value = useMemo(
    () => ({ favoriteCoins, toggleFavorite }),
    [favoriteCoins, toggleFavorite],
  )

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  )
}
