<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-2">
      <li>
        <div>
          <nuxt-link
            :to="{ name: 'index' }"
            class="text-gray-400 hover:text-gray-500"
          >
            <!-- Heroicon name: solid/home -->
            <svg
              class="flex-shrink-0 h-5 w-5"
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
          <svg-icon name="slash" class="flex-shrink-0 h-5 w-5 text-gray-300" />
          <component
            :is="id >= crumbs.length - 1 ? 'span' : 'nuxt-link'"
            :to="link.path"
            class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ capitalize(link.title) }}
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { capitalize } from '@/plugins/utils/methods'
export default {
  name: 'Breadcrumb',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          param = param.split('?')[0]
          let title = param.replace(/-/g, ' ')
          title = title.split('#')
          crumbs.push({
            title: title[0],
            ...match,
          })
        }
      })
      crumbs.forEach((crumb) => {
        crumb.title = this.translateSlug(crumb.title)
      })
      return crumbs
    },
  },
  methods: {
    capitalize,
    translateSlug(slug) {
      const slugs = {
        'retours d experience': "retours d'experience",
      }
      return slugs[slug] || slug
    },
  },
}
</script>
