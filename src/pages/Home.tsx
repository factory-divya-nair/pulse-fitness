import { Link } from 'react-router-dom'
import { amenities } from '../data/amenities.ts'
import { studios } from '../data/classes.ts'
import { locations } from '../data/locations.ts'

const testimonials = [
  { quote: 'The staff have been respectful and encouraging. Members cheer each other on, especially in Studio Red.', author: 'D.C.' },
  { quote: 'Very spacious, a huge variety of equipment, and friendly staff. A great value for the price.', author: 'Nikolas J.' },
  { quote: 'I have been coming for years and absolutely love it. The LFT coaches changed how I train.', author: 'Maria P.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1>
            Built to be <em>strong.</em>
          </h1>
          <p className="hero__sub">Studio-style classes, recovery amenities, and strength equipment. Membership options priced for real life.</p>
          <div className="hero__ctas">
            <Link to="/memberships" className="btn btn--primary">Join Now</Link>
            <Link to="/locations" className="btn btn--ghost">Start your free 1-day trial</Link>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="amenities-heading">
        <h2 id="amenities-heading">
          Everything you need, <em>under one roof</em>
        </h2>
        <ul className="tile-grid">
          {amenities.map((amenity) => (
            <li key={amenity.name} className={`tile tile--${amenity.category.toLowerCase()}`}>
              <span className="tile__category">{amenity.category}</span>
              <span className="tile__name">{amenity.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--dark" aria-labelledby="studios-heading">
        <div className="container">
          <h2 id="studios-heading">
            Studio classes, <em>coach-led</em>
          </h2>
          <div className="card-grid">
            {studios.map((studio) => (
              <article key={studio.id} className="card card--studio">
                <h3>{studio.name}</h3>
                <p>{studio.description}</p>
                <Link to="/classes" className="text-link">View schedule →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="clubs-heading">
        <div className="section__header">
          <h2 id="clubs-heading">
            Find a club <em>near you</em>
          </h2>
          <Link to="/locations" className="text-link">All locations →</Link>
        </div>
        <div className="card-grid">
          {locations.slice(0, 4).map((location) => (
            <article key={location.id} className="card">
              <h3>{location.name}</h3>
              <p className="muted">
                {location.address}, {location.city}, {location.state} {location.zip}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="reviews-heading">
        <div className="container">
          <h2 id="reviews-heading">
            What members <em>say</em>
          </h2>
          <div className="card-grid">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="card quote">
                <p>“{t.quote}”</p>
                <footer>— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
