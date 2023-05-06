import { defineStore } from 'pinia'
import type { FooterColumn, RouteLink } from '~/types/navigation'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    sidebar: false,
    main: [
      {
        label: 'books',
        icon: 'navigation-book',
        route: {
          name: 'books',
        },
      },
      {
        label: 'series',
        icon: 'navigation-serie',
        route: {
          name: 'series',
        },
      },
      {
        label: 'authors',
        icon: 'navigation-author',
        route: {
          name: 'authors',
        },
      },
      {
        label: 'tags',
        icon: 'navigation-tag',
        route: {
          name: 'tags',
        },
      },
    ] as RouteLink[],
    footerProject: {
      title: 'discover',
      links: [
        {
          label: 'about',
          route: {
            name: 'slug',
            params: { slug: 'about' },
          },
        },
        {
          label: 'features',
          route: {
            name: 'slug',
            params: { slug: 'features' },
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
            name: 'slug',
            params: { slug: 'more-ebooks' },
          },
        },
        {
          label: 'faq',
          route: {
            name: 'slug',
            params: { slug: 'faq' },
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
            name: 'slug',
            params: { slug: 'legal' },
          },
        },
        {
          label: 'privacy',
          route: {
            name: 'slug',
            params: { slug: 'privacy' },
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
  getters: {
    getFooterProject: state => state.footerProject,
    getFooterSupport(state) {
      const config = useRuntimeConfig()
      const moduleContact = config.public.moduleContact
      const support = state.footerSupport
      if (!moduleContact) {
        const links = state.footerSupport.links.filter(
          e => e.label !== 'contact',
        )
        state.footerSupport.links = links
      }

      return support
    },
    getFooterAdvanced: state => state.footerAdvanced,
    getFooterLegal: state => state.footerLegal,
  },
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
