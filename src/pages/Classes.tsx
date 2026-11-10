import { classes } from '../data/classes.ts'

export default function Classes() {
  return (
    <section className="section container" aria-labelledby="classes-heading">
      <h1 id="classes-heading">
        Weekly class <em>schedule</em>
      </h1>
      <p className="lead muted">Studio classes are included with the Studio membership.</p>
      <div className="table-wrap">
        <table className="schedule">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Time</th>
              <th scope="col">Class</th>
              <th scope="col">Studio</th>
              <th scope="col">Length</th>
              <th scope="col">Coach</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id}>
                <td>{c.day}</td>
                <td>{c.time}</td>
                <td>{c.name}</td>
                <td><span className={`pill pill--${c.studio.toLowerCase()}`}>{c.studio}</span></td>
                <td>{c.durationMin} min</td>
                <td>{c.coach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
