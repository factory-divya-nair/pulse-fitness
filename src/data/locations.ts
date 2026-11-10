export type Location = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  amenities: string[]
}

// Fictional clubs and addresses for demo purposes.
export const locations: Location[] = [
  { id: 'denver-highlands', name: 'Denver Highlands', address: '1200 Maple Avenue', city: 'Denver', state: 'CO', zip: '80211', amenities: ['Pool', 'HIIT Studio', 'Kidcare'] },
  { id: 'austin-south', name: 'Austin South', address: '450 Riverbend Drive', city: 'Austin', state: 'TX', zip: '78745', amenities: ['Strength Studio', 'Sauna', 'Basketball'] },
  { id: 'chicago-west-loop', name: 'Chicago West Loop', address: '88 Harbor Street', city: 'Chicago', state: 'IL', zip: '60607', amenities: ['Yoga Studio', 'Hot Tub', 'Kidcare'] },
  { id: 'portland-pearl', name: 'Portland Pearl', address: '310 Cedar Lane', city: 'Portland', state: 'OR', zip: '97209', amenities: ['Pool', 'Cold Plunge', 'HIIT Studio'] },
  { id: 'minneapolis-north', name: 'Minneapolis North', address: '2750 Lakeview Road', city: 'Minneapolis', state: 'MN', zip: '55411', amenities: ['Pilates Studio', 'Strength Studio', 'Sauna'] },
  { id: 'phoenix-camelback', name: 'Phoenix Camelback', address: '901 Desert Bloom Way', city: 'Phoenix', state: 'AZ', zip: '85016', amenities: ['Basketball', 'Hot Tub'] },
  { id: 'nashville-midtown', name: 'Nashville Midtown', address: '615 Music Row', city: 'Nashville', state: 'TN', zip: '37203', amenities: ['Pool', 'Yoga Studio', 'Kidcare'] },
  { id: 'columbus-short-north', name: 'Columbus Short North', address: '1420 Oak Street', city: 'Columbus', state: 'OH', zip: '43201', amenities: ['HIIT Studio', 'Red Light Therapy'] },
  { id: 'denver-tech-center', name: 'Denver Tech Center', address: '5300 Summit Parkway', city: 'Denver', state: 'CO', zip: '80237', amenities: ['Pool', 'Sauna', 'Strength Studio'] },
  { id: 'salt-lake-sugar-house', name: 'Salt Lake Sugar House', address: '2100 Granite Boulevard', city: 'Salt Lake City', state: 'UT', zip: '84106', amenities: ['Pilates Studio', 'Cold Plunge', 'Basketball'] },
]
