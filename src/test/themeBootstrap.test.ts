import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import indexHtml from '../../index.html?raw'

const bootstrap = indexHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? ''

function mockSystemTheme(theme: 'light' | 'dark') {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({ matches: query === '(prefers-color-scheme: light)' && theme === 'light', media: query })),
  )
}

function runBootstrap() {
  new Function(bootstrap)()
  return document.documentElement.dataset.theme
}

beforeEach(() => {
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('pre-paint theme script in index.html', () => {
  it('exists', () => {
    expect(bootstrap).toContain('pulse-theme')
  })

  it('applies the saved theme over the system preference', () => {
    window.localStorage.setItem('pulse-theme', 'light')
    mockSystemTheme('dark')
    expect(runBootstrap()).toBe('light')
  })

  it('follows the system preference when nothing is saved', () => {
    mockSystemTheme('light')
    expect(runBootstrap()).toBe('light')
  })

  it('still follows the system preference when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    mockSystemTheme('light')
    expect(runBootstrap()).toBe('light')
  })

  it('falls back to dark when storage is blocked and matchMedia is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.stubGlobal('matchMedia', undefined)
    expect(runBootstrap()).toBe('dark')
  })
})
