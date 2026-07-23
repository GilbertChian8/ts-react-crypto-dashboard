import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoriteProvider from './FavoriteProvider'
import { useFavorites } from '../hooks/useFavorites'

function TestConsumer() {
  const { favoriteCoins, toggleFavorite } = useFavorites()
  return (
    <div>
      <span data-testid='favorites'>{favoriteCoins.join(',')}</span>
      <button onClick={() => toggleFavorite('bitcoin')}>toggle bitcoin</button>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('FavoriteProvider', () => {
  it('starts empty and toggles a coin in and out', async () => {
    render(
      <FavoriteProvider>
        <TestConsumer />
      </FavoriteProvider>,
    )
    const favorites = screen.getByTestId('favorites')
    const button = screen.getByRole('button')

    expect(favorites.textContent).toBe('')

    await userEvent.click(button)
    expect(favorites.textContent).toBe('bitcoin')

    await userEvent.click(button)
    expect(favorites.textContent).toBe('')
  })

  it('saves favorites to localStorage', async () => {
    render(
      <FavoriteProvider>
        <TestConsumer />
      </FavoriteProvider>,
    )

    await userEvent.click(screen.getByRole('button'))

    expect(JSON.parse(localStorage.getItem('favoriteCoins')!)).toEqual([
      'bitcoin',
    ])
  })

  it('loads favorites from localStorage on start', () => {
    localStorage.setItem('favoriteCoins', JSON.stringify(['solana']))

    render(
      <FavoriteProvider>
        <TestConsumer />
      </FavoriteProvider>,
    )

    expect(screen.getByTestId('favorites').textContent).toBe('solana')
  })

  it('throws when useFavorites is used outside the provider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestConsumer />)).toThrow(
      'useFavorites must be used inside FavoriteProvider',
    )

    errorSpy.mockRestore()
  })
})
