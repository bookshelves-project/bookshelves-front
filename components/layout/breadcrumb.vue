<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'

const props = defineProps<{
  title?: string
}>()

interface Link {
  title: string
  route?: object
}

const capitalizeEach = (string: string) => {
  const arr = string.split(' ')

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }

  return arr.join(' ')
}

const crumbs = computed((): Link[] => {
  const route = useRoute()
  const router = useRouter()

  /**
   * Transform full path into parts
   */
  const fullPath = route.fullPath
  let params = fullPath.startsWith('/')
    ? fullPath.substring(1).split('/')
    : fullPath.split('/')

  const crumbs: Link[] = []

  let path = ''
  params = params.filter(e => e.length > 3)
  params.forEach((param) => {
    path = `${path}/${param}`
    const match = router.resolve(path) // try to find route
    if (match.name !== null) {
      param = param.split('?')[0] // remove query
      const title = param.replace(/-/g, ' ') // replace `-` with space
      const titleSplitted = title.split('#')

      crumbs.push({
        title: capitalizeEach(titleSplitted[0]),
        route: match
      })
    }
  })
  crumbs.forEach((crumb: any) => {
    crumb.title = translateSlug(crumb.title)
  })
  if (props.title) {
    crumbs.splice(-1, 1, {
      title: props.title
    })
  }

  return crumbs
})

const translateSlug = (slug: string): string => {
  const slugs: Keyable = {
    // 'retours d experience': "retours d'experience",
  }
  return slugs[slug] || slug
}
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex flex-wrap items-center space-x-2">
      <li>
        <div>
          <router-link :to="$localePath({ name: 'index' })">
            <svg-icon
              name="home"
              class="h-5 w-5 shrink-0 text-gray-400 transition-colors duration-100 hover:text-gray-500"
              aria-hidden="true"
            />
            <span class="sr-only">Home</span>
          </router-link>
        </div>
      </li>

      <li v-for="(crumb, id) in crumbs" :key="id">
        <div class="flex items-center">
          <svg-icon
            name="chevron-right"
            class="h-5 w-5 shrink-0 text-gray-300"
          />
          <component
            :is="id >= crumbs.length - 1 ? 'span' : 'router-link'"
            :to="$localePath(crumb.route)"
            class="ml-1 rounded-md p-1 text-sm font-medium text-gray-500 transition-colors duration-100 dark:text-gray-400 capitalize"
            :class="
              id >= crumbs.length - 1
                ? ''
                : 'hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            "
          >
            {{ crumb.title }}
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>
