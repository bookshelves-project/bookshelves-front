export const state = () => ({
  navigation: [
    { label: 'books', icon: 'catalog', route: 'books' },
    { label: 'series', icon: 'catalog', route: 'series' },
    { label: 'authors', icon: 'annotation', route: 'authors' },
    { label: 'guides', icon: 'annotation', route: 'guides' },
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
