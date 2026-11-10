import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section container">
      <h1>Page not found</h1>
      <p className="muted">That page skipped leg day.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </section>
  )
}
