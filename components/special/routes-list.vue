<template>
  <button
    v-if="devMode"
    name="router"
    class="
      fixed
      z-50
      bottom-0
      right-0
      bg-gray-700
      p-2
      rounded-tl-md
      hover:bg-gray-600
      transition-colors
      duration-100
    "
    type="button"
    @click="routes"
  >
    <span
      class="
        flex
        items-center
        text-sm
        font-medium
        transition-all
        duration-100
        rounded-md
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
      "
    >
      <span class="sr-only">Routes</span>
      <span class="w-6 h-6 text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="13" width="18" height="8" rx="2"></rect>
          <line x1="17" y1="17" x2="17" y2="17.01"></line>
          <line x1="13" y1="17" x2="13" y2="17.01"></line>
          <line x1="15" y1="13" x2="15" y2="11"></line>
          <path d="M11.75 8.75a4 4 0 0 1 6.5 0"></path>
          <path d="M8.5 6.5a8 8 0 0 1 13 0"></path>
        </svg>
      </span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'RoutesList',
  data() {
    return {
      devMode: process.env.NODE_ENV !== 'production',
    }
  },
  methods: {
    routes() {
      let routes = []
      this.$router.options.routes.forEach((route) => {
        routes.push({
          name: route.name,
          path: route.path,
        })
      })
      console.log('------------')
      routes = routes.filter((e) => e.name.includes('__en'))
      routes = routes.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
      routes.forEach((route) => {
        console.log(`${route.name.replace('___en', '')} => ${route.path}`)
      })
      console.log('------------')
      console.log('i18n is enabled!')
      console.log('You have to set your routes with localePath().')
      this.$nuxt.$emit('notification', {
        title: 'Check your console',
        text: 'List of all routes is available.',
        type: 'success',
      })
    },
  },
}
</script>
