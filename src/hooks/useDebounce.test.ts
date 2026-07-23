import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('bit', 500))
    expect(result.current).toBe('bit')
  })

  it('only updates the value after the delay', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'b' } },
    )

    rerender({ value: 'bit' })
    expect(result.current).toBe('b')

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe('bit')
  })

  it('restarts the timer when the value changes quickly', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'b' } },
    )

    rerender({ value: 'bi' })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    rerender({ value: 'bit' })
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('b')

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe('bit')
  })
})
