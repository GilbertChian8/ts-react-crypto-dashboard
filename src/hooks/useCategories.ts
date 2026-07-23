import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/coins'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  })
}
