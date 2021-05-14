<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <footer aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="container px-4 py-12 max-w-7xl sm:px-6 lg:py-16 lg:px-8">
      <div class="grid grid-cols-6 mx-auto space-y-12 xl:space-y-0">
        <div class="col-span-6 xl:col-start-1 xl:col-end-4">
          <div class="max-w-md space-y-8">
            <nuxt-link to="/" class="flex items-center lg:mx-0 w-max group">
              <svg-icon
                name="bookshelves"
                class="w-12 h-12 text-gray-300 transition-colors duration-100 group-hover:text-gray-400"
              />
              <div
                class="mt-2 ml-3 text-2xl text-gray-300 transition-colors duration-100 md:text-xl font-handlee group-hover:text-gray-400"
              >
                Bookshelves
              </div>
            </nuxt-link>
            <p class="text-base text-gray-500">
              Download and read eBooks on your own or learn more about your
              eReader.
            </p>
            <div class="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex">
              <a
                v-for="socialIcon in socialIcons"
                :key="socialIcon.id"
                :href="socialIcon.link"
                target="_blank"
                rel="noopener noreferrer"
                :title="socialIcon.label"
                :aria-label="socialIcon.label"
                class="block text-gray-400 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <svg-icon :name="`${socialIcon.icon}`" class="w-8 h-8" />
              </a>
              <color-switcher-toggle />
            </div>
          </div>
        </div>
        <div class="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
          <h3
            class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
          >
            Bookshelves
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in navigationSupport" :key="link.id">
              <nuxt-link
                :to="link.route"
                class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
              >
                {{ link.label }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
          <h3
            class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
          >
            Project
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in navigationCompany" :key="link.id">
              <nuxt-link
                :to="link.route"
                class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
              >
                {{ link.label }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
          <h3
            class="text-sm font-semibold tracking-wider text-gray-400 uppercase"
          >
            Legal
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in navigationLegal" :key="link.id">
              <nuxt-link
                :to="link.route"
                class="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
              >
                {{ link.label }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div
          class="flex items-center justify-between pt-8 mt-12 border-t border-gray-200"
        >
          <div
            class="text-base text-left text-gray-400 md:items-center md:flex lg:text-center"
          >
            <a
              href="https://creativecommons.org"
              target="_blank"
              rel="noopener noreferrer"
              title="Creative commons"
              aria-label="Creative commons"
              class="flex items-center justify-center px-1 py-2 text-base leading-6 text-center text-gray-400 transition-colors duration-300 rounded-md group w-max"
            >
              <span
                v-for="license in licenses"
                :key="license.id"
                :alt="license.label"
                class="w-5 h-5 mr-1 text-gray-400 transition-colors duration-300 fill-current group-hover:text-gray-700 dark:group-hover:text-gray-100"
                v-html="license.svg"
              ></span>
              <span
                class="ml-1 text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-100"
              >
                {{ date(2020) }}
              </span>
            </a>
            <span class="hidden mx-1 lg:block"> · </span>
            <nuxt-link
              :to="`/pages/about`"
              class="flex items-center text-gray-400 transition-colors duration-100 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-100"
            >
              {{ team }} </nuxt-link
            ><span class="hidden lg:mr-1 lg:block">,</span>
            {{ packageJson.license }} license<span class="hidden lg:block"
              >.</span
            >
          </div>
          <back-to-top />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import packageJson from '@/package.json'
import metadata from '@/plugins/metadata/metadata'
import ColorSwitcherToggle from '../special/color-switcher-toggle.vue'
import backToTop from './back-to-top.vue'

export default {
  name: 'DefaultFooter',
  components: { backToTop, ColorSwitcherToggle },
  data() {
    return {
      team: process.env.AUTHOR || metadata.tags.author,
      socialIcons: [
        // {
        //   icon: 'gitlab',
        //   label: 'Repository of Bookshelves',
        //   link: 'https://gitlab.com/ewilan-riviere/bookshelves-front',
        // },
        {
          icon: 'swagger',
          label: 'Swagger: API documentation',
          link: `${this.$config.apiURL}/documentation`,
        },
        {
          icon: 'calibre',
          label: 'Calibre: manage your eBooks',
          link: 'https://calibre-ebook.com',
        },
        {
          icon: 'open-book',
          label: 'OPDS',
          link: `${this.$config.apiURL}/ereader`,
        },
      ],
      navigationSupport: [
        { label: 'Search', icon: 'annotation', route: { name: 'search' } },
        {
          label: 'About',
          route: {
            name: 'content',
            params: { type: 'pages', slug: 'about' },
          },
        },
        { label: 'Contact', route: { name: 'contact' } },
        {
          label: 'OPDS',
          route: {
            name: 'content',
            params: { type: 'pages', slug: 'opds' },
          },
        },
      ],
      navigationCompany: [
        {
          label: 'More eBooks',
          route: {
            name: 'content',
            params: { type: 'pages', slug: 'more-ebooks' },
          },
        },
        {
          label: 'Documentation API',
          route: {
            name: 'content',
            params: { type: 'pages', slug: 'api-documentation' },
          },
        },
        {
          label: 'FAQ',
          route: { name: 'content', params: { type: 'pages', slug: 'faq' } },
        },
      ],
      navigationLegal: [
        {
          label: 'Legal',
          route: { name: 'content', params: { type: 'pages', slug: 'legal' } },
        },
        {
          label: 'Cookies',
          route: {
            name: 'content',
            params: { type: 'pages', slug: 'cookies' },
          },
        },
      ],
      packageJson,
      licenses: [
        {
          label: 'Creative Commons',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"/></svg>`,
        },
        {
          label: 'Creative Commons By',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M314.9 194.4v101.4h-28.3v120.5h-77.1V295.9h-28.3V194.4c0-4.4 1.6-8.2 4.6-11.3 3.1-3.1 6.9-4.7 11.3-4.7H299c4.1 0 7.8 1.6 11.1 4.7 3.1 3.2 4.8 6.9 4.8 11.3zm-101.5-63.7c0-23.3 11.5-35 34.5-35s34.5 11.7 34.5 35c0 23-11.5 34.5-34.5 34.5s-34.5-11.5-34.5-34.5zM247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3z"/></svg>`,
        },
        {
          label: 'Creative Commons Nc',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M247.6 8C387.4 8 496 115.9 496 256c0 147.2-118.5 248-248.4 248C113.1 504 0 393.2 0 256 0 123.1 104.7 8 247.6 8zM55.8 189.1c-7.4 20.4-11.1 42.7-11.1 66.9 0 110.9 92.1 202.4 203.7 202.4 122.4 0 177.2-101.8 178.5-104.1l-93.4-41.6c-7.7 37.1-41.2 53-68.2 55.4v38.1h-28.8V368c-27.5-.3-52.6-10.2-75.3-29.7l34.1-34.5c31.7 29.4 86.4 31.8 86.4-2.2 0-6.2-2.2-11.2-6.6-15.1-14.2-6-1.8-.1-219.3-97.4zM248.4 52.3c-38.4 0-112.4 8.7-170.5 93l94.8 42.5c10-31.3 40.4-42.9 63.8-44.3v-38.1h28.8v38.1c22.7 1.2 43.4 8.9 62 23L295 199.7c-42.7-29.9-83.5-8-70 11.1 53.4 24.1 43.8 19.8 93 41.6l127.1 56.7c4.1-17.4 6.2-35.1 6.2-53.1 0-57-19.8-105-59.3-143.9-39.3-39.9-87.2-59.8-143.6-59.8z"/></svg>`,
        },
      ],
    }
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
