export const state = () => ({
  navigation: [
    { label: 'Books', icon: 'book-open', route: 'books' },
    { label: 'Series', icon: 'book-open', route: 'series' },
    { label: 'Authors', icon: 'annotation', route: 'authors' },
    { label: 'Guides', icon: 'annotation', route: 'guides' },
  ],
  authNavigationTrue: [
    {
      label: 'Dashboard',
      icon: 'template',
      route: 'dashboard',
      isAdmin: false,
    },
    {
      label: 'Profile',
      icon: 'cog',
      route: 'profile',
      isAdmin: false,
    },
    {
      label: 'Admin',
      icon: 'control',
      route: 'admin',
      isAdmin: true,
    },
  ],
  authNavigationFalse: [
    { label: 'Sign in', icon: 'login', route: 'sign-in' },
    { label: 'Sign up', icon: 'register', route: 'sign-up' },
  ],
})
