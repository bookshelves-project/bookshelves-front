export const state = () => ({
  main: [
    { label: 'books', route: 'books' },
    { label: 'series', route: 'series' },
    { label: 'authors', route: 'authors' },
    { label: 'genres-tags', route: 'tags' }
  ],
  footer: {
    project: {
      title: 'discover',
      links: [
        { label: 'advanced-search', route: { name: 'search-advanced' } },
        {
          label: 'about',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'about' }
          }
        },
        {
          label: 'features',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'features' }
          }
        }
      ]
    },
    support: {
      title: 'support',
      links: [
        {
          label: 'more-ebooks',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'more-ebooks' }
          }
        },
        {
          label: 'faq',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'faq' }
          }
        },
        { label: 'contact', route: { name: 'contact' } }
      ]
    },
    advanced: {
      title: 'more',
      links: [
        {
          label: 'guides',
          route: {
            name: 'guides'
          }
        },
        {
          label: 'languages',
          route: {
            name: 'languages'
          }
        },
        {
          label: 'publishers',
          route: {
            name: 'publishers'
          }
        }
      ]
    },
    legal: {
      title: 'legal',
      links: [
        {
          label: 'legality',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'legal' }
          }
        },
        {
          label: 'privacy',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'privacy' }
          }
        }
      ]
    }
  },
  auth: [
    {
      label: 'My profile',
      icon: 'user-circle',
      route: 'profile',
      isAdmin: false
    },
    {
      label: 'Settings',
      icon: 'cog',
      route: 'profile-settings',
      isAdmin: false
    }
  ],
  admin: [
    {
      label: 'Admin',
      icon: 'control',
      route: 'profile-admin',
      isAdmin: true
    }
  ],
  guest: [
    { label: 'Sign in', icon: 'login', route: 'sign-in' },
    { label: 'Sign up', icon: 'register', route: 'sign-up' }
  ]
})

export const getters = {
  main: state => state.main,
  footer: state => state.footer,
  auth: state => state.auth,
  admin: state => state.admin,
  guest: state => state.guest
}
