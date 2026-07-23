import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CoinTable from './CoinTable'
import FavoriteProvider from '../context/FavoriteProvider'
import type { Coin } from '../types'

vi.mock('./Sparkline', () => ({
  default: () => <div data-testid='sparkline' />,
}))

function makeCoin(overrides: Partial<Coin>): Coin {
  return {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: 'bitcoin.png',
    current_price: 64000,
    market_cap: 1_290_000_000_000,
    market_cap_rank: 1,
    total_volume: 30_000_000_000,
    price_change_24h: 100,
    price_change_percentage_24h: 1.5,
    price_change_percentage_1h_in_currency: 0.1,
    price_change_percentage_7d_in_currency: 2.0,
    sparkline_in_7d: { price: [1, 2, 3] },
    ...overrides,
  } as Coin
}

const coins = [
  makeCoin({}),
  makeCoin({
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    market_cap_rank: 2,
  }),
]

function renderTable(onOrderChange = vi.fn()) {
  render(
    <FavoriteProvider>
      <CoinTable
        coinData={coins}
        order='market_cap_desc'
        onOrderChange={onOrderChange}
      />
    </FavoriteProvider>,
  )
  return onOrderChange
}

beforeEach(() => {
  localStorage.clear()
})

describe('CoinTable', () => {
  it('renders a row for each coin', () => {
    renderTable()

    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
    expect(screen.getAllByTestId('sparkline')).toHaveLength(2)
  })

  it('toggles the favorite star when clicked', async () => {
    renderTable()

    const [bitcoinStar] = screen.getAllByRole('button', {
      name: 'Add to favorites',
    })
    await userEvent.click(bitcoinStar)

    expect(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: 'Add to favorites' }),
    ).toHaveLength(1)

    await userEvent.click(
      screen.getByRole('button', { name: 'Remove from favorites' }),
    )
    expect(
      screen.getAllByRole('button', { name: 'Add to favorites' }),
    ).toHaveLength(2)
  })

  it('asks for volume sorting when the volume header is clicked', async () => {
    const onOrderChange = renderTable()

    await userEvent.click(screen.getByRole('button', { name: /volume/i }))

    expect(onOrderChange).toHaveBeenCalledWith('volume_desc')
  })

  it('flips the market cap order when the market cap header is clicked', async () => {
    const onOrderChange = renderTable()

    await userEvent.click(screen.getByRole('button', { name: /market cap/i }))

    expect(onOrderChange).toHaveBeenCalledWith('market_cap_asc')
  })
})
