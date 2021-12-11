<template>
  <div>
    <nav class="hidden md:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-2">
        <li>
          <div>
            <nuxt-link :to="localePath({ name: 'index' })">
              <!-- Heroicon name: solid/home -->
              <svg
                class="shrink-0 h-5 w-5 text-gray-400 hover:text-gray-500 transition-colors duration-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span class="sr-only">Home</span>
            </nuxt-link>
          </div>
        </li>

        <li v-for="(link, id) in crumbs" :key="id">
          <div class="flex items-center">
            <svg-icon name="chevron-right" class="shrink-0 h-5 w-5 text-gray-300" />
            <component
              :is="id >= crumbs.length - 1 ? 'span' : 'nuxt-link'"
              :to="localePath(link.path)"
              class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-100 p-1 rounded-md"
              :class="
                id >= crumbs.length - 1
                  ? ''
                  : 'hover:text-gray-700 hover:bg-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-700'
              "
            >{{ capitalize(link.title) }}</component>
          </div>
        </li>
      </ol>
    </nav>
    <nuxt-link
      :to="localePath({ name: 'index' })"
      class="flex md:hidden items-center font-semibold text-xl"
    >
      <svg-icon name="arrow-narrow-right" class="w-5 h-5 transform rotate-180" />
      <span class="ml-2 mb-1">Home</span>
    </nuxt-link>
  </div>
</template>

<script>
import { capitalize, capitalizeEach } from '~/utils/methods'
export default {
  name: 'Breadcrumb',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      let params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params = params.filter(e => e.length > 3)
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          param = param.split('?')[0]
          let title = param.replace(/-/g, ' ')
          title = title.split('#')
          crumbs.push({
            title: capitalizeEach(title[0]),
            ...match
          })
        }
      })
      crumbs.forEach((crumb) => {
        crumb.title = this.translateSlug(crumb.title)
      })
      return crumbs
    }
  },
  methods: {
    capitalize,
    translateSlug(slug) {
      const slugs = {
        'retours d experience': "retours d'experience"
      }
      return slugs[slug] || slug
    }
  }
}
</script>
