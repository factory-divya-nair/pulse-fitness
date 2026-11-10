export type Location = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  amenities: string[]
}

export const locations: Location[] = [
  { id: 'omaha-north', name: 'Omaha (North)', address: '7402 N 30th Street', city: 'Omaha', state: 'NE', zip: '68112', amenities: ['Pool', 'Studio RED', 'Kidcare'] },
  { id: 'livonia-plymouth-rd', name: 'Livonia (Plymouth Rd)', address: '30070 Plymouth Road', city: 'Livonia', state: 'MI', zip: '48150', amenities: ['Studio LFT', 'Sauna', 'Basketball'] },
  { id: 'oak-forest', name: 'Oak Forest', address: '5556 159th St', city: 'Oak Forest', state: 'IL', zip: '60452', amenities: ['Studio FLOW', 'Hot Tub', 'Kidcare'] },
  { id: 'waukegan', name: 'Waukegan', address: '2650 Belvidere Rd', city: 'Waukegan', state: 'IL', zip: '60085', amenities: ['Pool', 'Cold Plunge', 'Studio RED'] },
  { id: 'colorado-springs-jet-wing', name: 'Colorado Springs (Jet Wing)', address: '3175 Jet Wing Dr', city: 'Colorado Springs', state: 'CO', zip: '80916', amenities: ['Studio Pilates', 'Studio LFT', 'Sauna'] },
  { id: 'waterloo', name: 'Waterloo', address: '4000 University Ave', city: 'Waterloo', state: 'IA', zip: '50701', amenities: ['Basketball', 'Hot Tub'] },
  { id: 'south-bend-ireland-rd', name: 'South Bend (Ireland Rd)', address: '1911 East Ireland Road', city: 'South Bend', state: 'IN', zip: '46614', amenities: ['Pool', 'Studio FLOW', 'Kidcare'] },
  { id: 'ypsilanti', name: 'Ypsilanti', address: '3737 Carpenter Road', city: 'Ypsilanti', state: 'MI', zip: '48197', amenities: ['Studio RED', 'Red Light Therapy'] },
  { id: 'dayton-miamisburg', name: 'Dayton (Miamisburg)', address: '2070 Miamisburg-Centerville Road', city: 'Dayton', state: 'OH', zip: '45459', amenities: ['Pool', 'Sauna', 'Studio LFT'] },
  { id: 'draper-12300', name: 'Draper (12300 South)', address: '268 East 12300 South', city: 'Draper', state: 'UT', zip: '84020', amenities: ['Studio Pilates', 'Cold Plunge', 'Basketball'] },
  { id: 'tulsa-sheridan-rd', name: 'Tulsa (Sheridan Rd)', address: '10125 S Sheridan Road', city: 'Tulsa', state: 'OK', zip: '74133', amenities: ['Studio RED', 'Hot Tub', 'Kidcare'] },
]
