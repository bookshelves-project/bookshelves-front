<script setup lang="ts">
const props = defineProps<{
  crumbs?: string[]
}>()

interface Crumb {
  title: string
  route?: {
    name: string
    params?: Keyable
    query?: Keyable
  }
}

const crumbs = ref<Crumb[]>([])

function capitalizeEach(string: string) {
  const arr = string.split(' ')

  for (let i = 0; i < arr.length; i++)
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)

  return arr.join(' ')
}

function translateSlug(slug: string): string {
  const slugs: Keyable = {
    // 'retours d experience': "retours d'experience",
  }
  return slugs[slug] || slug
}

const getCrumbsList = computed((): Crumb[] => {
  const route = useRoute()
  const router = useRouter()

  /**
   * Transform full path into parts
   */
  const fullPath = route.fullPath
  let params = fullPath.startsWith('/')
    ? fullPath.substring(1).split('/')
    : fullPath.split('/')

  const crumbsList: Crumb[] = []

  let path = ''
  params = params.filter(e => e.length > 3)
  params.forEach((param) => {
    path = `${path}/${param}`
    const match = router.resolve(path) // try to find route
    if (match.name !== null) {
      param = param.split('?')[0] // remove query
      const title = param.replace(/-/g, ' ') // replace `-` with space
      const titleSplitted = title.split('#')

      crumbsList.push({
        title: capitalizeEach(titleSplitted[0]),
        // @ts-expect-error TODO: fix this
        route: match,
      })
    }
  })
  crumbsList.forEach((crumb: any) => {
    crumb.title = translateSlug(crumb.title)
  })
  if (props.crumbs) {
    for (let i = 0; i < crumbsList.length; i++) {
      const element = crumbsList[i]
      const currentTitle = props.crumbs[i]
      element.title = currentTitle
    }
  }

  return crumbsList
})
crumbs.value = getCrumbsList.value
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex flex-wrap items-center space-x-2">
      <li>
        <div>
          <typed-link :to="{ name: 'index' }">
            <svg-icon
              name="home"
              class="h-5 w-5 shrink-0 text-gray-400 transition-colors duration-100 hover:text-gray-500"
              aria-hidden="true"
            />
            <span class="sr-only">Home</span>
          </typed-link>
        </div>
      </li>

      <li v-for="(crumb, id) in crumbs" :key="id">
        <div class="flex items-center">
          <svg-icon
            name="chevron-right"
            class="h-5 w-5 shrink-0 text-gray-300"
          />
          <nuxt-link
            :to="crumb.route"
            class="breadcrumb-link"
            :class="id >= crumbs.length - 1 ? '' : 'breadcrumb-link-active'"
          >
            {{ crumb.title }}
          </nuxt-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style lang="css" scoped>
.breadcrumb-link {
  @apply ml-1 rounded-md p-1 text-sm font-medium text-gray-500 transition-colors duration-100 dark:text-gray-400;
}
.breadcrumb-link-active {
  @apply hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100;
}
</style>
