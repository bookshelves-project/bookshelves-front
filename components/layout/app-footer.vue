<template>
  <footer class="bg-white dark:bg-gray-900" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <nuxt-link to="/" class="flex items-center lg:mx-0 w-max group">
            <svg-icon
              name="book"
              class="
                w-12
                h-12
                text-gray-400
                transition-colors
                duration-100
                dark:text-gray-400
                group-hover:text-gray-500
                dark:group-hover:text-gray-300
              "
            />
            <div
              class="
                mt-2
                ml-3
                text-2xl text-gray-400
                transition-colors
                duration-100
                md:text-xl
                font-handlee
                dark:text-gray-400
                group-hover:text-gray-500
                dark:group-hover:text-gray-300
              "
            >
              {{ $config.appName }}
            </div>
          </nuxt-link>
          <p class="text-base text-gray-500">
            {{ desc }}
          </p>
          <div class="flex space-x-6">
            <a
              v-for="socialIcon in socialIcons"
              :key="socialIcon.id"
              :href="socialIcon.link"
              target="_blank"
              rel="noopener noreferrer"
              :title="socialIcon.label"
              :aria-label="socialIcon.label"
              class="
                block
                text-gray-400
                hover:text-gray-500
                dark:hover:text-gray-500 dark:text-gray-400
              "
            >
              <svg-icon :name="`${socialIcon.icon}`" class="w-6 h-6" />
            </a>
            <color-switcher-toggle />
          </div>
        </div>
        <div
          class="
            grid grid-cols-1
            gap-8
            mt-12
            sm:grid-cols-2
            xl:mt-0 xl:col-span-2
          "
        >
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <footer-column :navigation="navigation.project" />
            <footer-column
              class="mt-12 md:mt-0"
              :navigation="navigation.support"
            />
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <footer-column :navigation="navigation.advanced" />
            <footer-column
              class="mt-12 md:mt-0"
              :navigation="navigation.legal"
            />
          </div>
        </div>
      </div>
      <div
        class="
          relative
          pt-8
          mt-12
          border-t border-gray-200
          dark:border-gray-600
        "
      >
        <div
          class="
            space-y-2
            text-base text-gray-400
            md:space-y-0 md:items-center md:flex
            xl:text-center
          "
        >
          <a
            href="https://creativecommons.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Creative commons"
            aria-label="Creative commons"
            class="
              flex
              items-center
              space-x-2
              transition-colors
              duration-100
              hover:text-gray-500
            "
          >
            <span class="flex space-x-1">
              <svg-icon
                v-for="license in licenses"
                :key="license.id"
                :alt="license.label"
                :name="license.name"
                class="w-5 h-5"
              ></svg-icon>
            </span>
            <span>{{ date(2020) }}</span>
          </a>
          <span class="md:flex">
            <span class="hidden mx-1 md:block">·</span>
            <nuxt-link
              :to="`/pages/about`"
              class="transition-colors duration-100 hover:text-gray-500"
              >{{ team }}</nuxt-link
            >
            <span class="hidden mx-1 md:block">·</span
            ><span class="block md:flex">{{ packageJson.license }} license</span
            ><span class="hidden md:block">.</span></span
          >
        </div>
        <back-to-top class="absolute bottom-0 right-0" />
      </div>
    </div>
  </footer>
</template>

<script>
import packageJson from '@/package.json'
import metadata from '@/plugins/metadata/metadata'
import ColorSwitcherToggle from '../special/color-switcher-toggle.vue'
import backToTop from './back-to-top.vue'
import FooterColumn from './footer-column.vue'

export default {
  name: 'AppFooter',
  components: { backToTop, ColorSwitcherToggle, FooterColumn },
  data() {
    return {
      team: process.env.AUTHOR || metadata.tags.author,
      socialIcons: [
        {
          icon: 'swagger',
          label: 'API documentation',
          link: `${this.$apiUrlBase('/docs')}`,
        },
        {
          icon: 'calibre',
          label: 'Calibre: manage your eBooks',
          link: 'https://calibre-ebook.com',
        },
        {
          icon: 'open-book',
          label: 'Catalog: simple interface for eReader browser',
          link: `${this.$apiUrlBase('/catalog')}`,
        },
        {
          icon: 'feed',
          label: 'OPDS feed',
          link: `${this.$apiUrlBase('/opds')}`,
        },
      ],
      navigation: {
        project: {
          title: this.$config.appName,
          links: [
            { label: 'Advanced search', route: { name: 'search-advanced' } },
            {
              label: 'About',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'about' },
              },
            },
            {
              label: 'OPDS & Catalog',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'opds-catalog' },
              },
            },
          ],
        },
        support: {
          title: 'Support',
          links: [
            {
              label: 'More eBooks',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'more-ebooks' },
              },
            },
            {
              label: 'FAQ',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'faq' },
              },
            },
            { label: 'Contact', route: { name: 'contact' } },
          ],
        },
        advanced: {
          title: 'More',
          links: [
            {
              label: 'Genres & Tags',
              route: {
                name: 'tags',
              },
            },
            {
              label: 'Languages',
              route: {
                name: 'languages',
              },
            },
            {
              label: 'Publishers',
              route: {
                name: 'publishers',
              },
            },
          ],
        },
        legal: {
          title: 'Legal',
          links: [
            {
              label: 'Legal',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'legal' },
              },
            },
            {
              label: 'Privacy',
              route: {
                name: 'content',
                params: { type: 'pages', slug: 'privacy' },
              },
            },
          ],
        },
      },
      packageJson,
      licenses: [
        {
          label: 'Creative Commons',
          name: `creative-commons/cc`,
        },
        {
          label: 'Creative Commons By',
          name: `creative-commons/by`,
        },
        {
          label: 'Creative Commons Nc',
          name: `creative-commons/nc`,
        },
      ],
    }
  },
  computed: {
    desc() {
      return metadata.tags.description
    },
  },
  methods: {
    date(begin) {
      begin = parseInt(begin)
      const current = new Date().getFullYear()
      const year = `${begin} - ${current}`
      if (begin === current) {
        return begin
      }
      return year
    },
  },
}
</script>

<style lang="postcss" scoped>
@variants hover, group-hover {
  /deep/ path {
    @apply transition-colors duration-300;
  }
  /deep/ .icon-github:hover path {
    fill: #181717;
  }
  /deep/ .icon-gitlab:hover path {
    fill: #fc6d26;
  }
  /deep/ .icon-twitter:hover path {
    fill: #1da1f2;
  }
  /deep/ .icon-swagger:hover path {
    fill: #85ea2d;
  }
  /deep/ .icon-portfolio:hover path {
    @apply text-primary-600;
  }
  /deep/ .icon-mail:hover path {
    fill: #d14836;
  }
  /deep/ .nuxt-svg path:nth-child(1) {
    fill: #2f495e;
  }
  /deep/ .nuxt-svg path:nth-child(2) {
    fill: #00c58e;
  }
  /deep/ .nuxt-svg path:nth-child(3) {
    fill: #00c58e;
  }
  /deep/ .nuxt-svg path:nth-child(4) {
    fill: #00c58e;
  }
  /deep/ .nuxt-svg path:nth-child(5) {
    fill: #2f495e;
  }
  /deep/ .tailwind-svg path:nth-child(1) {
    fill: #14b4c6;
  }
  /deep/ .tailwind-svg path:nth-child(2) {
    fill: black;
  }
  /deep/ .laravel-svg path:nth-child(1) {
    fill: #ff2d20;
  }
}
</style>
