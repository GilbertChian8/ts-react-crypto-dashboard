import type { Category, Coin, CoinOrder, SearchResponse } from '../types'

const baseUrl = `https://api.coingecko.com/api/v3`

export async function fetchCoins(
  order: CoinOrder = 'market_cap_desc',
  category?: string,
): Promise<Coin[]> {
  const categoryParam = category ? `&category=${category}` : ''
  const url = `${baseUrl}/coins/markets?vs_currency=usd&order=${order}${categoryParam}&sparkline=true&per_page=100&page=1&price_change_percentage=1h,24h,7d`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch coins')
  return response.json()
}

export async function searchCoins(coinName: string): Promise<SearchResponse> {
  const url = `${baseUrl}/search?query=${encodeURIComponent(coinName)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to search coins')
  return response.json()
}

export async function fetchCoinsByIds(ids: string[]): Promise<Coin[]> {
  const url = `${baseUrl}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&sparkline=true&price_change_percentage=1h,24h,7d`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch coins by ids')
  return response.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const url = `${baseUrl}/coins/categories/list`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}
