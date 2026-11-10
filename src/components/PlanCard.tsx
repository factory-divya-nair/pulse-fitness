import type { Plan } from '../data/plans.ts'

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={plan.featured ? 'plan plan--featured' : 'plan'} aria-labelledby={`plan-${plan.id}`}>
      {plan.featured && <span className="plan__badge">Most popular</span>}
      <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
      <p className="plan__price">
        ${plan.monthlyPrice.toFixed(2)}
        <span>/mo</span>
      </p>
      <p className="muted">{plan.tagline}</p>
      <ul className="plan__features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="plan__fee muted">${plan.enrollmentFee} enrollment fee · ${plan.annualFee} annual fee</p>
      <button type="button" className="btn btn--primary btn--block">
        Choose {plan.name}
      </button>
    </article>
  )
}
