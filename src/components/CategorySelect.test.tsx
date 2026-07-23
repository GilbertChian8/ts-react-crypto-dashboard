import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import CategorySelect from './CategorySelect'

vi.mock('../api/coins', () => ({
  fetchCategories: vi.fn().mockResolvedValue([
    { category_id: 'meme-token', name: 'Meme' },
    { category_id: 'stablecoins', name: 'Stablecoins' },
  ]),
}))

function renderWithClient(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

describe('CategorySelect', () => {
  it('shows the categories from the api', async () => {
    renderWithClient(<CategorySelect value='' onChange={() => {}} />)

    expect(
      screen.getByRole('option', { name: 'All Categories' }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('option', { name: 'Meme' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Stablecoins' }),
    ).toBeInTheDocument()
  })

  it('calls onChange with the selected category id', async () => {
    const handleChange = vi.fn()
    renderWithClient(<CategorySelect value='' onChange={handleChange} />)

    await screen.findByRole('option', { name: 'Meme' })
    await userEvent.selectOptions(screen.getByRole('combobox'), 'meme-token')

    expect(handleChange).toHaveBeenCalledWith('meme-token')
  })
})
