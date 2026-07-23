import { createContext } from 'react'

export type FavoriteContextType = {
  favoriteCoins: string[]
  toggleFavorite: (id: string) => void
}

export const FavoriteContext = createContext<FavoriteContextType | null>(null)
