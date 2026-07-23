import { useQuery } from '@tanstack/react-query'
import { fetchCoins, fetchCoinsByIds, searchCoins } from '../api/coins'
import type { CoinOrder } from '../types'

export function useCoins(order: CoinOrder, category?: string) {
  return useQuery({
    queryKey: ['coins', order, category],
    queryFn: () => fetchCoins(order, category),
    refetchInterval: 60_000,
  })
}

export function useSearchCoins(coinId: string) {
  return useQuery({
    queryKey: ['search', coinId],
    queryFn: async () => {
      const result = await searchCoins(coinId)
      if (result.coins.length === 0) return []
      const ids = result.coins.slice(0, 10).map((coin) => coin.id)
      return fetchCoinsByIds(ids)
    },
    enabled: coinId.length > 0,
  })
}
