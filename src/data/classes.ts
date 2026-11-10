export type Studio = 'HIIT' | 'STRENGTH' | 'YOGA' | 'PILATES' | 'CYCLE'

export type FitnessClass = {
  id: string
  name: string
  studio: Studio
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  time: string
  durationMin: number
  coach: string
}

export const studios: { id: Studio; name: string; description: string }[] = [
  { id: 'HIIT', name: 'HIIT', description: 'High-energy interval training with a coach and a crew.' },
  { id: 'STRENGTH', name: 'Strength', description: 'Progressive lifting programs that build real muscle.' },
  { id: 'YOGA', name: 'Yoga', description: 'Stretch, breathe, and recover in a heated studio.' },
  { id: 'PILATES', name: 'Pilates', description: 'Reformer classes for core strength and control.' },
]

export const classes: FitnessClass[] = [
  { id: 'c1', name: 'Morning Burn', studio: 'HIIT', day: 'Mon', time: '6:00 AM', durationMin: 45, coach: 'Jordan M.' },
  { id: 'c2', name: 'Full Body Strength', studio: 'STRENGTH', day: 'Mon', time: '12:00 PM', durationMin: 50, coach: 'Priya S.' },
  { id: 'c3', name: 'Evening Flow', studio: 'YOGA', day: 'Mon', time: '6:30 PM', durationMin: 60, coach: 'Ava L.' },
  { id: 'c4', name: 'Rhythm Ride', studio: 'CYCLE', day: 'Tue', time: '5:30 AM', durationMin: 45, coach: 'Marcus T.' },
  { id: 'c5', name: 'Reformer Core', studio: 'PILATES', day: 'Tue', time: '9:00 AM', durationMin: 50, coach: 'Elena R.' },
  { id: 'c6', name: 'Power Intervals', studio: 'HIIT', day: 'Wed', time: '6:00 AM', durationMin: 45, coach: 'Jordan M.' },
  { id: 'c7', name: 'Lower Body Strength', studio: 'STRENGTH', day: 'Wed', time: '5:30 PM', durationMin: 50, coach: 'Chris W.' },
  { id: 'c8', name: 'Slow Flow', studio: 'YOGA', day: 'Thu', time: '7:00 PM', durationMin: 60, coach: 'Ava L.' },
  { id: 'c9', name: 'Climb & Sprint', studio: 'CYCLE', day: 'Thu', time: '12:15 PM', durationMin: 45, coach: 'Marcus T.' },
  { id: 'c10', name: 'Morning Burn', studio: 'HIIT', day: 'Fri', time: '6:00 AM', durationMin: 45, coach: 'Sam K.' },
  { id: 'c11', name: 'Upper Body Strength', studio: 'STRENGTH', day: 'Sat', time: '8:00 AM', durationMin: 50, coach: 'Priya S.' },
  { id: 'c12', name: 'Reformer Sculpt', studio: 'PILATES', day: 'Sat', time: '10:00 AM', durationMin: 50, coach: 'Elena R.' },
  { id: 'c13', name: 'Sunday Restore', studio: 'YOGA', day: 'Sun', time: '9:30 AM', durationMin: 75, coach: 'Ava L.' },
]
