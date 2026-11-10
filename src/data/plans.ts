export type Plan = {
  id: string
  name: string
  monthlyPrice: number
  enrollmentFee: number
  annualFee: number
  tagline: string
  features: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 14.99,
    enrollmentFee: 29,
    annualFee: 49,
    tagline: 'Everything you need to lift and sweat at your home club.',
    features: ['Home club access', 'Cardio deck and free weights', 'Strength training machines', 'Free fitness assessment'],
  },
  {
    id: 'plus',
    name: 'Plus',
    monthlyPrice: 24.99,
    enrollmentFee: 29,
    annualFee: 49,
    tagline: 'Train anywhere and recover like a pro.',
    features: [
      'Access to all clubs',
      'Group fitness classes',
      'Sauna, steam, and hot tub',
      'Massage lounge',
      'Bring a guest',
    ],
    featured: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    monthlyPrice: 39.99,
    enrollmentFee: 0,
    annualFee: 49,
    tagline: 'Coach-led studio classes, no workout planning required.',
    features: [
      'Everything in Plus',
      'Unlimited HIIT classes',
      'Unlimited strength classes',
      'Unlimited yoga and Pilates',
      'Cold plunge and red light therapy',
    ],
  },
]
