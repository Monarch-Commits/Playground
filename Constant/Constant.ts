// Category
export const categories = [
  { id: 'all', name: 'All' },
  { id: 'bouquets', name: 'Bouquets' },
  { id: 'birthday', name: 'Birthday' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'funeral', name: 'Funeral' },
];

// Curated Collections
export const CuratedCollections = [
  {
    id: 'indoor',
    title: 'Indoor Plants',
    description: 'Perfect for your home and cozy spaces',
    image: '/CuratedCollections/indoor.png',
  },
  {
    id: 'beginner',
    title: 'Beginner Friendly',
    description: 'Start your plant journey with ease',
    image: '/CuratedCollections/outdoor.png',
  },
  {
    id: 'low-maintenance',
    title: 'Low Maintenance',
    description: 'Minimal care, maximum green',
    image: '/CuratedCollections/friendly.png',
  },
] as const;
