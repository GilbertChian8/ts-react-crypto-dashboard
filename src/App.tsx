import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CoinTable from './components/CoinTable'
import { useEffect, useState } from 'react'
import type { CoinOrder } from './types'
import { useCoins, useSearchCoins } from './hooks/useCoins'
import { useDebounce } from './hooks/useDebounce'
import CategorySelect from './components/CategorySelect'

function App() {
  const [order, setOrder] = useState<CoinOrder>('market_cap_desc')
  const [category, setCategory] = useState('')
  const {
    data: coins = [],
    isLoading,
    isError,
    dataUpdatedAt,
  } = useCoins(order, category)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [searchText, setSearchText] = useState('')

  const debounceSearch = useDebounce(searchText, 500)
  const isSearching = debounceSearch.length > 0
  const { data: searchResults = [] } = useSearchCoins(debounceSearch)
  const sourceCoins = isSearching ? searchResults : coins

  useEffect(() => {
    setSecondsLeft(60)
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [dataUpdatedAt])

  if (isLoading) return <p className='p-10 text-center'>Loading…</p>
  if (isError) return <p className='p-10 text-center'>Failed to load coins</p>

  return (
    <div className='min-h-screen font-sans text-text bg-bg transition-colors'>
      <div className='max-w-295 mx-auto px-6 pt-7 pb-20'>
        <Header secondsLeft={secondsLeft} />
        <div className='flex items-center gap-3 mb-3.5'>
          <div className='flex-1'>
            <SearchBar value={searchText} onChange={setSearchText} />
          </div>
          <CategorySelect value={category} onChange={setCategory} />
        </div>
        <CoinTable
          coinData={sourceCoins}
          order={order}
          onOrderChange={setOrder}
        />
      </div>
    </div>
  )
}

export default App
