export default [
  {
    path: '/',
    component: () => import('../../views/Home'),
    name: 'Home',
  },
  {
    path: '/venue/:id',
    component: () => import('../../views/VenueDetails'),
    name: 'Venue Details',
  }
]
