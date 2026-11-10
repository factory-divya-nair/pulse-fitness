import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="logo">
            VASA<span>FITNESS</span>
          </div>
          <p className="muted">Built to be strong.</p>
        </div>
        <ul className="footer__links">
          <li><Link to="/memberships">Memberships</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/locations">Locations</Link></li>
        </ul>
      </div>
      <p className="container footer__note">
        Demo application for illustration only. Not affiliated with VASA Fitness.
      </p>
    </footer>
  )
}
