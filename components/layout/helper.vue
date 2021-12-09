<template>
  <div v-if="isDev">
    <button
      name="router"
      class="fixed z-50 bottom-0 right-0 bg-gray-700 p-2 rounded-tl-md hover:bg-gray-600 transition-colors duration-100"
      type="button"
      @click="() => (isOpen = !isOpen)"
    >
      <span
        class="flex items-center text-sm font-medium transition-all duration-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <span class="sr-only">Help</span>
        <span class="w-6 h-6 text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </span>
    </button>
    <app-modal :open="isOpen" @close="openHelp">
      <div class="p-5">
        <h2
          class="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide"
        >Helper</h2>
        <ul role="list" class="mt-3 grid grid-cols-1 space-y-4">
          <li
            v-for="(item,id) in links"
            :key="id"
            class="shadow-sm rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-75"
          >
            <component
              :is="item.method ? 'button' : 'a'"
              target="_blank"
              :href="item.url"
              rel="noopener noreferrer"
              type="button"
              class="flex col-span-1 w-full text-left"
              @click="item.method ? item.method() : isOpen = false"
            >
              <div
                class="flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md"
              >
                <svg-icon v-if="item.icon" :name="item.icon" class="w-6 h-6 dark:text-white" />
                <img v-else-if="item.img" :src="item.img" :alt="item.label" class="w-6 h-6" />
              </div>
              <div class="flex-1 flex items-center justify-between rounded-r-md truncate">
                <div class="flex-1 py-2 text-sm truncate">
                  <div class="text-gray-900 dark:text-gray-100 font-medium">{{ item.label }}</div>
                  <p class="text-gray-500">{{ item.description }}</p>
                </div>
              </div>
            </component>
          </li>
        </ul>
      </div>
    </app-modal>
  </div>
</template>

<script setup lang="ts">
import { wrapProperty } from '@nuxtjs/composition-api'
import { ToastType } from '~/types'

const ctx = useContext()
// const useNuxt = wrapProperty('$nuxt', false)
const isDev = ctx.isDev
const router = useRouter()
const isOpen = ref(false)

const openHelp = (status: boolean) => {
  isOpen.value = status
}

const routes = () => {
  let routes: any[] = []
  if (router.options.routes) {
    router.options.routes.forEach((route) => {
      routes.push({
        name: route.name,
        path: route.path
      })
    })
    console.log('------------')
    routes = routes.filter(e => e.name.includes('__en'))
    routes = routes.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )
    routes.forEach((route) => {
      console.log(`${route.name.replace('___en', '')} => ${route.path}`)
    })
    console.log('------------')
    console.log('i18n is enabled!')
    console.log('You have to set your routes with localePath().')
  }

  ctx.$toast(
    'Check your console',
    'List of all routes is available.',
    ToastType.success
  )
  isOpen.value = false
}

const links = [
  {
    label: 'Routes',
    description: 'Print all routes in console',
    method: routes,
    icon: 'router'
  },
  {
    label: 'Nuxt Typescript',
    description: 'TypeScript Support for Nuxt.js',
    url: 'https://typescript.nuxtjs.org/guide/introduction',
    img: 'https://typescript.nuxtjs.org/icon.svg'
  },
  {
    label: 'Nuxt Composition API',
    description: 'Vue 3 Composition API in Nuxt',
    url: 'https://composition-api.nuxtjs.org/getting-started/introduction',
    img: 'https://v3.vuejs.org/logo.png'
  },
  {
    label: 'Windi CSS',
    description: 'Next generation utility-first CSS framework',
    url: 'https://windicss.org/guide/',
    img: 'https://windicss.org/assets/logo.svg'
  },
  {
    label: 'Nuxt 2',
    description: 'Documentation',
    url: 'https://nuxtjs.org/docs/get-started/installation/',
    img: 'https://nuxtjs.org/design-kit/colored-logo.svg'
  },
  {
    label: 'Nuxt 3',
    description: 'Documentation',
    url: 'https://v3.nuxtjs.org/docs/usage/data-fetching',
    img: 'https://nuxtjs.org/design-kit/colored-logo.svg'
  },
  {
    label: 'Vue 3 Composition API',
    description: 'Documentation',
    url: 'https://v3.vuejs.org/guide/composition-api-introduction.html',
    img: 'https://v3.vuejs.org/logo.png'
  },
  {
    label: 'Vue 3 Lifecycle Hooks',
    description: 'Documentation',
    url: 'https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html',
    img: 'https://v3.vuejs.org/logo.png'
  }
]

</script>
