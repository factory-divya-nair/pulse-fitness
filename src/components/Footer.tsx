import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function backToTop(event: MouseEvent<HTMLButtonElement>) {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  // Leaving focus on the button would make the next Tab jump straight back to the footer.
  const first = document.querySelector<HTMLElement>('a[href], button')
  if (first && first !== event.currentTarget) first.focus({ preventScroll: true })
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="logo">
            PULSE<span>FITNESS</span>
          </div>
          <p className="muted">Stronger every day.</p>
        </div>
        <ul className="footer__links">
          <li><Link to="/memberships">Memberships</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li>
            <button type="button" className="footer__top" onClick={backToTop}>
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </li>
        </ul>
      </div>
      <p className="container footer__note">
        Fictional gym for demo purposes. Clubs, prices, and reviews are made up.
      </p>
    </footer>
  )
}
