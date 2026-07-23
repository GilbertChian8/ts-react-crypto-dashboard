import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('shows the value it receives', () => {
    render(<SearchBar value='bitcoin' onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('bitcoin')
  })

  it('calls onChange with what the user types', async () => {
    const handleChange = vi.fn()
    render(<SearchBar value='' onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'b')
    expect(handleChange).toHaveBeenCalledWith('b')
  })
})
