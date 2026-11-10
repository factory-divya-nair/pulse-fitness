import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App.tsx'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function backToTopButton() {
  return screen.getByRole('button', { name: /back to top/i })
}

function siteFooter() {
  // Testimonial quotes also use <footer>, so the site footer is the last contentinfo on the page.
  return screen.getAllByRole('contentinfo').at(-1)!
}

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

describe('Footer back to top button', () => {
  let scrollTo: ReturnType<typeof vi.fn>

  beforeEach(() => {
    scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each(['/', '/memberships', '/classes', '/locations', '/nope'])('shows a Back to top button in the footer on %s', (path) => {
    renderAt(path)
    const button = backToTopButton()
    expect(button).toBeVisible()
    expect(siteFooter()).toContainElement(button)
  })

  it('sits with the other footer links', () => {
    renderAt('/')
    const button = backToTopButton()
    const links = button.closest('ul')
    expect(links).not.toBeNull()
    expect(within(links!).getByRole('link', { name: 'Classes' })).toBeInTheDocument()
  })

  it('smoothly scrolls to the very top when clicked', async () => {
    const user = userEvent.setup()
    renderAt('/classes')
    await user.click(backToTopButton())
    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('works the same way when reached with Tab and pressed with Enter', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const button = backToTopButton()
    for (let i = 0; i < 100 && document.activeElement !== button; i++) {
      await user.tab()
    }
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('moves focus back to the top of the page', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(backToTopButton())
    expect(screen.getByRole('link', { name: /pulse fitness home/i })).toHaveFocus()
  })

  it('jumps without animation when the visitor prefers reduced motion', async () => {
    stubReducedMotion(true)
    const user = userEvent.setup()
    renderAt('/')
    await user.click(backToTopButton())
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('scrolls smoothly when reduced motion is not requested', async () => {
    stubReducedMotion(false)
    const user = userEvent.setup()
    renderAt('/')
    await user.click(backToTopButton())
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
