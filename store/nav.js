export const state = () => ({
  navigation: [
    { label: 'Books', icon: 'catalog', route: 'books' },
    { label: 'Series', icon: 'catalog', route: 'series' },
    { label: 'Authors', icon: 'annotation', route: 'authors' },
    { label: 'Guides', icon: 'annotation', route: 'guides' },
  ],
  authNavigationTrue: [
    {
      label: 'My profile',
      icon: 'user-circle',
      route: 'profile',
      isAdmin: false,
    },
    {
      label: 'Settings',
      icon: 'cog',
      route: 'profile-settings',
      isAdmin: false,
    },
  ],
  authNavigationAdmin: [
    {
      label: 'Admin',
      icon: 'control',
      route: 'profile-admin',
      isAdmin: true,
    },
  ],
  authNavigationFalse: [
    { label: 'Sign in', icon: 'login', route: 'sign-in' },
    { label: 'Sign up', icon: 'register', route: 'sign-up' },
  ],
})
