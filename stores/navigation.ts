import { defineStore } from 'pinia'

export const useNavigationStore = defineStore({
  id: 'navigation',
  state: () => ({
    main: [
      {
        label: 'books',
        route: {
          name: 'books',
          // query: {
          //   sort: 'title_sort'
          // }
        }
      },
      {
        label: 'series',
        route: {
          name: 'series',
          // query: {
          //   sort: 'title_sort'
          // }
        }
      },
      {
        label: 'authors',
        route: {
          name: 'authors',
          // query: {
          //   sort: 'lastname'
          // }
        }
      },
      {
        label: 'genres-tags',
        route: {
          name: 'tags',
        }
      }
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
          },
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
        route: { name: 'profile' },
        isAdmin: false
      },
      {
        label: 'Settings',
        icon: 'cog',
        route: { name: 'profile-settings' },
        isAdmin: false
      }
    ],
    admin: [
      {
        label: 'Admin',
        icon: 'control',
        route: { name: 'profile-admin' },
        isAdmin: true
      }
    ],
    guest: [
      { label: 'Sign in', icon: 'login', route: { name: 'sign-in' } },
      { label: 'Sign up', icon: 'register', route: { name: 'sign-up' } }
    ]
  }),
})
