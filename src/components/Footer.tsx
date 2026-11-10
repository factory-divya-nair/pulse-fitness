import { Link } from 'react-router-dom'

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
        </ul>
      </div>
      <p className="container footer__note">
        Fictional gym for the ticket-to-PR demo. Clubs, prices, and reviews are made up.
      </p>
    </footer>
  )
}
