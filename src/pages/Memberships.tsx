import PlanCard from '../components/PlanCard.tsx'
import { plans } from '../data/plans.ts'

export default function Memberships() {
  return (
    <section className="section container" aria-labelledby="memberships-heading">
      <h1 id="memberships-heading">
        Memberships that <em>fit your life</em>
      </h1>
      <p className="lead muted">No long-term contracts. Cancel anytime with 30 days notice.</p>
      <div className="plan-grid">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  )
}
