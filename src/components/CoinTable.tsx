import { memo } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'
import type { Coin, CoinOrder } from '../types'
import Sparkline from './Sparkline'

const CELL = 'px-3.5 py-[13px]'

function formatMoney(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}

function PctCell({ value }: { value: number | null | undefined }) {
  if (value == null) {
    return <td className={`${CELL} text-right font-mono text-text-dim`}>—</td>
  }
  const color =
    value > 0 ? 'text-up' : value < 0 ? 'text-down' : 'text-text-dim'
  const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '·'
  return (
    <td className={`${CELL} text-right font-mono ${color} whitespace-nowrap`}>
      {arrow} {Math.abs(value).toFixed(2)}%
    </td>
  )
}

interface CoinTableProps {
  coinData: Coin[]
  order: CoinOrder
  onOrderChange: (order: CoinOrder) => void
}

export default memo(function CoinTable({
  coinData,
  order,
  onOrderChange,
}: CoinTableProps) {
  const th =
    'px-3.5 py-3.5 font-bold text-[12.5px] whitespace-nowrap text-text-dim'
  const { favoriteCoins, toggleFavorite } = useFavorites()

  const handleSort = (field: 'market_cap' | 'volume') => {
    if (field === 'market_cap') {
      onOrderChange(
        order === 'market_cap_desc' ? 'market_cap_asc' : 'market_cap_desc',
      )
    } else {
      onOrderChange(order === 'volume_desc' ? 'volume_asc' : 'volume_desc')
    }
  }

  return (
    <div className='border border-border rounded-2xl bg-surface overflow-x-auto'>
      <table className='w-full border-collapse min-w-225 text-sm'>
        <thead>
          <tr className='bg-surface2'>
            <th className={th}></th>
            <th className={`${th} text-left`}>#</th>
            <th className={`${th} text-left`}>Coin</th>
            <th className={`${th} text-right`}>Price</th>
            <th className={`${th} text-right`}>1h %</th>
            <th className={`${th} text-right`}>24h %</th>
            <th className={`${th} text-right`}>7d %</th>
            <th className={`${th} text-right`}>
              <button
                className='cursor-pointer'
                onClick={() => handleSort('volume')}
              >
                Volume (24h){' '}
                {order.startsWith('volume') ? (
                  order === 'volume_asc' ? (
                    <ArrowUp size={14} className='inline' />
                  ) : (
                    <ArrowDown size={14} className='inline' />
                  )
                ) : (
                  <ArrowUpDown size={14} className='inline opacity-40' />
                )}
              </button>
            </th>
            <th className={`${th} text-right`}>
              <button
                className='cursor-pointer'
                onClick={() => handleSort('market_cap')}
              >
                Market Cap{' '}
                {order.startsWith('market_cap') ? (
                  order === 'market_cap_asc' ? (
                    <ArrowUp size={14} className='inline' />
                  ) : (
                    <ArrowDown size={14} className='inline' />
                  )
                ) : (
                  <ArrowUpDown size={14} className='inline opacity-40' />
                )}
              </button>
            </th>
            <th className={`${th} text-right`}>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin) => (
            <tr key={coin.id} className='border-t border-border'>
              <td className={CELL}>
                <button
                  onClick={() => toggleFavorite(coin.id)}
                  aria-label={
                    favoriteCoins.includes(coin.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                  className='bg-transparent border-none cursor-pointer leading-none p-0.5'
                >
                  <Star
                    size={16}
                    className={
                      favoriteCoins.includes(coin.id)
                        ? 'text-accent'
                        : 'text-border-strong'
                    }
                    fill={
                      favoriteCoins.includes(coin.id) ? 'currentColor' : 'none'
                    }
                  />
                </button>
              </td>
              <td className={`${CELL} text-text-dim`}>
                {coin.market_cap_rank}
              </td>
              <td className={CELL}>
                <div className='flex items-center gap-2.5'>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className='w-7.5 h-7.5 rounded-full'
                  />
                  <span className='font-bold'>{coin.name}</span>
                  <span className='text-xs text-text-dim uppercase font-mono'>
                    {coin.symbol}
                  </span>
                </div>
              </td>
              <td className={`${CELL} text-right font-mono`}>
                ${coin.current_price.toLocaleString()}
              </td>
              <PctCell value={coin.price_change_percentage_1h_in_currency} />
              <PctCell value={coin.price_change_percentage_24h} />
              <PctCell value={coin.price_change_percentage_7d_in_currency} />
              <td className={`${CELL} text-right font-mono`}>
                {formatMoney(coin.total_volume)}
              </td>
              <td className={`${CELL} text-right font-mono`}>
                {formatMoney(coin.market_cap)}
              </td>
              <td className={CELL}>
                {coin.sparkline_in_7d && (
                  <Sparkline prices={coin.sparkline_in_7d.price} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})
