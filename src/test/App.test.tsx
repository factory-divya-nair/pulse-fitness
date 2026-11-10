import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App.tsx'
import { classes } from '../data/classes.ts'
import { locations } from '../data/locations.ts'
import { plans } from '../data/plans.ts'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders the home hero and calls to action', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/stronger every day/i)
    expect(screen.getAllByRole('link', { name: /join now/i }).length).toBeGreaterThan(0)
  })

  it('lists every membership plan with its price', () => {
    renderAt('/memberships')
    for (const plan of plans) {
      const card = screen.getByRole('article', { name: plan.name })
      expect(within(card).getByText(`$${plan.monthlyPrice.toFixed(2)}`)).toBeInTheDocument()
    }
  })

  it('shows the full class schedule', () => {
    renderAt('/classes')
    expect(screen.getAllByRole('row')).toHaveLength(classes.length + 1)
  })

  it('shows every club location', () => {
    renderAt('/locations')
    const list = screen.getByRole('list', { name: /club locations/i })
    expect(within(list).getAllByRole('heading', { level: 3 })).toHaveLength(locations.length)
  })

  it('renders a not found page for unknown routes', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})
