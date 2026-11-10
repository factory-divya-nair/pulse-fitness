import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/memberships', label: 'Memberships' },
  { to: '/classes', label: 'Classes' },
  { to: '/locations', label: 'Locations' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="VASA Fitness home">
          VASA<span>FITNESS</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/memberships" className="btn btn--primary btn--sm">
          Join Now
        </Link>
      </div>
    </header>
  )
}
