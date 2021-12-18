<template>
  <div class="main-content">
    <app-header title="Sitemap" subtitle="" />
    <nuxt-link
      v-for="(route, id) in routes"
      :key="id"
      :to="localePath({ name: route.name })"
      class="block"
    >
      {{ route.name }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { Route } from '~/types'

const router = useRouter()
const routes = computed(() => {
  const routesList: Route[] = []
  let routes: Route[] = []
  router.options.routes?.forEach((route) => {
    routes.push({
      name: route.name,
      path: route.path,
    })
  })
  routes = routes.filter((e: Route) => e.name?.includes('__en'))
  routes = routes.sort((a: any, b: any) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  )
  routes.forEach((route: Route) => {
    if (!route.path?.includes(':')) {
      routesList.push({
        name: route.name?.replace('___en', ''),
        path: route.path,
      })
    }
  })

  return routesList
})
</script>

<style scoped></style>
