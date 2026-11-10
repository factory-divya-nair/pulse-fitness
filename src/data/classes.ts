export type Studio = 'HIIT' | 'LFT' | 'FLOW' | 'PILATES' | 'CYCLE'

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
  { id: 'HIIT', name: 'STUDIO RED', description: 'Community, coaching, and unlimited HIIT to be your best.' },
  { id: 'LFT', name: 'STUDIO LFT', description: 'Build muscle. Get strong. Backed by science.' },
  { id: 'FLOW', name: 'STUDIO FLOW', description: 'Relax, breathe, and rebalance with warm infrared yoga.' },
  { id: 'PILATES', name: 'STUDIO PILATES', description: 'Core strength, control, and flexibility in every class.' },
]

export const classes: FitnessClass[] = [
  { id: 'c1', name: 'Red Burn 45', studio: 'HIIT', day: 'Mon', time: '6:00 AM', durationMin: 45, coach: 'Jordan M.' },
  { id: 'c2', name: 'LFT Full Body', studio: 'LFT', day: 'Mon', time: '12:00 PM', durationMin: 50, coach: 'Priya S.' },
  { id: 'c3', name: 'Infrared Flow', studio: 'FLOW', day: 'Mon', time: '6:30 PM', durationMin: 60, coach: 'Ava L.' },
  { id: 'c4', name: 'Rhythm Ride', studio: 'CYCLE', day: 'Tue', time: '5:30 AM', durationMin: 45, coach: 'Marcus T.' },
  { id: 'c5', name: 'Reformer Core', studio: 'PILATES', day: 'Tue', time: '9:00 AM', durationMin: 50, coach: 'Elena R.' },
  { id: 'c6', name: 'Red Power', studio: 'HIIT', day: 'Wed', time: '6:00 AM', durationMin: 45, coach: 'Jordan M.' },
  { id: 'c7', name: 'LFT Lower Body', studio: 'LFT', day: 'Wed', time: '5:30 PM', durationMin: 50, coach: 'Chris W.' },
  { id: 'c8', name: 'Slow Flow', studio: 'FLOW', day: 'Thu', time: '7:00 PM', durationMin: 60, coach: 'Ava L.' },
  { id: 'c9', name: 'Climb & Sprint', studio: 'CYCLE', day: 'Thu', time: '12:15 PM', durationMin: 45, coach: 'Marcus T.' },
  { id: 'c10', name: 'Red Burn 45', studio: 'HIIT', day: 'Fri', time: '6:00 AM', durationMin: 45, coach: 'Sam K.' },
  { id: 'c11', name: 'LFT Upper Body', studio: 'LFT', day: 'Sat', time: '8:00 AM', durationMin: 50, coach: 'Priya S.' },
  { id: 'c12', name: 'Reformer Sculpt', studio: 'PILATES', day: 'Sat', time: '10:00 AM', durationMin: 50, coach: 'Elena R.' },
  { id: 'c13', name: 'Sunday Restore', studio: 'FLOW', day: 'Sun', time: '9:30 AM', durationMin: 75, coach: 'Ava L.' },
]
