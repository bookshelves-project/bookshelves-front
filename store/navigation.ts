import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    sidebar: false,
    main: [
      {
        label: 'books',
        route: {
          name: 'books',
          // query: {
          //   sort: 'title_sort'
          // }
        },
      },
      {
        label: 'series',
        route: {
          name: 'series',
          // query: {
          //   sort: 'title_sort'
          // }
        },
      },
      {
        label: 'authors',
        route: {
          name: 'authors',
          // query: {
          //   sort: 'lastname'
          // }
        },
      },
      {
        label: 'tags',
        route: {
          name: 'tags',
        },
      },
    ] as RouteLink[],
    footerProject: {
      title: 'discover',
      links: [
        // { label: 'advanced-search', route: { name: 'search-advanced' } },
        {
          label: 'about',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'about' },
          },
        },
        {
          label: 'features',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'features' },
          },
        },
      ],
    } as FooterColumn,
    footerSupport: {
      title: 'support',
      links: [
        {
          label: 'more-ebooks',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'more-ebooks' },
          },
        },
        {
          label: 'faq',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'faq' },
          },
        },
        { label: 'contact', route: { name: 'contact' } },
      ],
    } as FooterColumn,
    footerAdvanced: {
      title: 'more',
      links: [
        {
          label: 'guides',
          route: {
            name: 'guides',
          },
        },
        {
          label: 'languages',
          route: {
            name: 'languages',
          },
        },
        {
          label: 'publishers',
          route: {
            name: 'publishers',
          },
        },
      ],
    } as FooterColumn,
    footerLegal: {
      title: 'legal',
      links: [
        {
          label: 'legality',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'legal' },
          },
        },
        {
          label: 'privacy',
          route: {
            name: 'type-slug',
            params: { type: 'pages', slug: 'privacy' },
          },
        },
      ],
    } as FooterColumn,
    auth: [
      {
        label: 'My profile',
        icon: 'user-circle',
        route: { name: 'profile' },
      },
      {
        label: 'Settings',
        icon: 'cog',
        route: { name: 'profile-settings' },
      },
    ] as RouteLink[],
    guest: [
      { label: 'Sign in', icon: 'login', route: { name: 'sign-in' } },
      { label: 'Sign up', icon: 'register', route: { name: 'sign-up' } },
    ] as RouteLink[],
  }),
  actions: {
    toggleSidebar(): boolean {
      this.$patch({
        sidebar: !this.sidebar,
      })

      return this.sidebar
    },
    closeSidebar(): boolean {
      this.$patch({
        sidebar: false,
      })

      return this.sidebar
    },
  },
})
