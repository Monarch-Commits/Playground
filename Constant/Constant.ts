// Category
export const categories = [
  { id: 'all', name: 'All' },

  // 🌿 Plant Collections
  { id: 'indoor', name: 'Indoor Plants' },
  { id: 'outdoor', name: 'Outdoor Plants' },
  { id: 'beginner', name: 'Beginner Friendly' },
  { id: 'low-maintenance', name: 'Low Maintenance' },
  { id: 'flowering', name: 'Flowering Plants' },
  { id: 'air-purifying', name: 'Air Purifying Plants' },
  { id: 'small-space', name: 'Small Space Plants' },
  { id: 'pet-friendly', name: 'Pet Friendly Plants' },
] as const;

// Curated Collections
export const CuratedCollections = [
  {
    id: 'indoor',
    title: 'Indoor Plants',
    description: 'Perfect for your home and cozy spaces',
    image: '/CuratedCollections/indoor.png',
    href: '/',
  },
  {
    id: 'beginner',
    title: 'Beginner Friendly',
    description: 'Start your plant journey with ease',
    image: '/CuratedCollections/outdoor.png',
    href: '/',
  },
  {
    id: 'low-maintenance',
    title: 'Low Maintenance',
    description: 'Minimal care, maximum green',
    image: '/CuratedCollections/friendly.png',
    href: '/',
  },
] as const;
