import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchCoins, searchCoins } from './coins'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function okResponse(data: unknown) {
  return { ok: true, json: () => Promise.resolve(data) }
}

beforeEach(() => {
  mockFetch.mockReset()
})

describe('fetchCoins', () => {
  it('calls the markets endpoint with the given order', async () => {
    mockFetch.mockResolvedValue(okResponse([]))

    await fetchCoins('volume_desc')

    const url = mockFetch.mock.calls[0][0] as string
    expect(url).toContain('order=volume_desc')
    expect(url).not.toContain('category=')
  })

  it('adds the category parameter only when one is given', async () => {
    mockFetch.mockResolvedValue(okResponse([]))

    await fetchCoins('market_cap_desc', 'meme-token')

    const url = mockFetch.mock.calls[0][0] as string
    expect(url).toContain('category=meme-token')
  })

  it('throws when the response is not ok', async () => {
    mockFetch.mockResolvedValue({ ok: false })

    await expect(fetchCoins()).rejects.toThrow('Failed to fetch coins')
  })
})

describe('searchCoins', () => {
  it('encodes the query safely into the url', async () => {
    mockFetch.mockResolvedValue(okResponse({ coins: [] }))

    await searchCoins('bit coin')

    const url = mockFetch.mock.calls[0][0] as string
    expect(url).toContain('query=bit%20coin')
  })

  it('throws when the response is not ok', async () => {
    mockFetch.mockResolvedValue({ ok: false })

    await expect(searchCoins('bit')).rejects.toThrow('Failed to search coins')
  })
})
