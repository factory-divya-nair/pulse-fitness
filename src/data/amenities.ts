export type Amenity = { name: string; category: 'Strength' | 'Cardio' | 'Recovery' | 'Classes' | 'More' }

export const amenities: Amenity[] = [
  { name: 'Free Weights', category: 'Strength' },
  { name: 'Performance Lifting Area', category: 'Strength' },
  { name: 'Strength Training Machines', category: 'Strength' },
  { name: 'Functional Training Turf', category: 'Strength' },
  { name: 'Cardio Deck', category: 'Cardio' },
  { name: 'Indoor Pool', category: 'Cardio' },
  { name: 'Basketball', category: 'More' },
  { name: 'Hot Tub', category: 'Recovery' },
  { name: 'Sauna and Steam', category: 'Recovery' },
  { name: 'Cold Plunge', category: 'Recovery' },
  { name: 'Red Light Therapy', category: 'Recovery' },
  { name: 'Massage Lounge', category: 'Recovery' },
  { name: 'Group Fitness Classes', category: 'Classes' },
  { name: 'Cycle Classes', category: 'Classes' },
  { name: 'Kidcare', category: 'More' },
]
