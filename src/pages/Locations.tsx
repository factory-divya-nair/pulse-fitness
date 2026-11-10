import { locations } from '../data/locations.ts'

export default function Locations() {
  return (
    <section className="section container" aria-labelledby="locations-heading">
      <h1 id="locations-heading">
        Find a club <em>near you</em>
      </h1>
      <p className="lead muted">{locations.length} clubs across the Midwest and Mountain West.</p>
      <ul className="card-grid" aria-label="Club locations">
        {locations.map((location) => (
          <li key={location.id} className="card">
            <h3>{location.name}</h3>
            <p className="muted">
              {location.address}
              <br />
              {location.city}, {location.state} {location.zip}
            </p>
            <ul className="tags">
              {location.amenities.map((a) => (
                <li key={a} className="tag">{a}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
