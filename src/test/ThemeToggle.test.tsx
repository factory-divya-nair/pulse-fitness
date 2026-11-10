import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App.tsx'
import { getInitialTheme, THEME_STORAGE_KEY } from '../theme.ts'

function mockSystemTheme(theme: 'light' | 'dark') {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: light)' && theme === 'light',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function currentTheme() {
  return document.documentElement.dataset.theme
}

beforeEach(() => {
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
  mockSystemTheme('dark')
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('theme toggle', () => {
  it.each(['/', '/memberships', '/classes', '/locations', '/nope'])('sits next to Join Now in the header on %s', (path) => {
    renderAt(path)
    const header = screen.getByRole('banner')
    const toggle = within(header).getByRole('button', { name: /switch to light mode/i })
    const joinNow = within(header).getByRole('link', { name: /join now/i })
    expect(toggle.nextElementSibling).toBe(joinNow)
  })

  it('opens in dark mode on a first visit when the system prefers dark', () => {
    renderAt('/')
    expect(currentTheme()).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('opens in light mode on a first visit when the system prefers light', () => {
    mockSystemTheme('light')
    renderAt('/')
    expect(currentTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })

  it('switches the whole site to light mode on click and back again', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(currentTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(currentTheme()).toBe('dark')
  })

  it('remembers the chosen mode after a refresh, even if the system prefers the other one', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')

    unmount()
    delete document.documentElement.dataset.theme
    renderAt('/classes')
    expect(currentTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })

  it('can be reached and used with the keyboard', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const toggle = screen.getByRole('button', { name: 'Switch to light mode' })

    while (document.activeElement !== toggle) await user.tab()
    await user.keyboard('{Enter}')
    expect(currentTheme()).toBe('light')

    await user.keyboard(' ')
    expect(currentTheme()).toBe('dark')
  })
})

describe('getInitialTheme', () => {
  it('ignores unknown stored values and falls back to the system preference', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'purple')
    mockSystemTheme('light')
    expect(getInitialTheme()).toBe('light')
  })

  it('falls back to dark when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    expect(getInitialTheme()).toBe('dark')
  })

  it('falls back to the system preference when storage is blocked', () => {
    mockSystemTheme('light')
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(getInitialTheme()).toBe('light')
    spy.mockRestore()
  })
})
