<script setup lang="ts">
const router = useRouter()
const isOpen = ref(false)

const openHelp = (status: boolean) => {
  isOpen.value = status
}

const getRoutes = () => {
  const routes: any[] = []
  if (router && router.options.routes) {
    router.options.routes.forEach((route) => {
      routes.push({
        name: route.name,
        path: route.path,
      })
    })
    console.warn('------------')
    // routes = routes.filter((e) => e.name.includes('__en'))
    // routes = routes.sort((a, b) =>
    //   a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    // )
    routes.forEach((route) => {
      console.warn(`${route.name.replace('___en', '')} => ${route.path}`)
    })
    console.warn('------------')
    // console.log('i18n is enabled!')
  }

  const { pushToast } = useToast()
  pushToast({
    title: 'Check your console',
    text: 'List of all routes is available.',
    type: 'success',
  })
  isOpen.value = false
}

const links = [
  {
    label: 'Routes',
    description: 'Print all routes in console',
    method: getRoutes,
    icon: 'router',
  },
  {
    label: 'Roadmap',
    description: 'A guide about Bookshelves roadmap',
    href: 'https://bookshelves-documentation.netlify.app/development/roadmap',
    img: 'https://bookshelves.ink/images/bookshelves.svg',
  },
]
</script>

<template>
  <div>
    <button
      name="router"
      class="fixed bottom-0 right-0 z-50 rounded-tl-md bg-gray-700 p-1 transition-colors duration-100 hover:bg-gray-600"
      type="button"
      @click="() => (isOpen = !isOpen)"
    >
      <span
        class="flex items-center rounded-md text-sm font-medium shadow-sm transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <span class="sr-only">Help</span>
        <span class="h-5 w-5 text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
    <app-dialog :open="isOpen" @close="openHelp">
      <div class="p-5">
        <h2 class="text-xs font-medium uppercase tracking-wide text-gray">
          Helper
        </h2>
        <ul role="list" class="mt-3 grid grid-cols-1 space-y-4">
          <li
            v-for="(item, id) in links"
            :key="id"
            class="rounded-md border border-gray-200 shadow-sm transition-colors duration-75 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <component
              :is="item.method ? 'button' : 'a'"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              class="col-span-1 flex w-full text-left"
              @click="item.method ? item.method() : (isOpen = false)"
              @click.native="isOpen = false"
            >
              <div class="items-center justify-between truncate rounded-r-md">
                <div class="flex-1 truncate p-2 text-sm">
                  <div class="font-medium text-gray-900 dark:text-gray-100">
                    {{ item.label }}
                  </div>
                  <p class="text-gray-500">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </component>
          </li>
        </ul>
      </div>
    </app-dialog>
  </div>
</template>
