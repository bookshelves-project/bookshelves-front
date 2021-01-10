<template>
  <div>
    <page-title />
    <!-- <div class="px-4 py-2">
      <nuxt-link
        v-for="guide in guides"
        :key="guide.id"
        :to="guide.path"
        class="block px-2 py-1 my-2 text-lg font-semibold transition-colors duration-300 rounded-md hover:bg-gray-100 w-max"
      >
        
      </nuxt-link>
    </div> -->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li>
          <nuxt-link
            v-for="guide in guides"
            :key="guide.id"
            :to="guide.path"
            class="block transition-colors duration-300 hover:bg-gray-50"
          >
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="flex items-center flex-1 min-w-0">
                <div class="flex-shrink-0">
                  <!-- <img
                    class="w-12 h-12 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> -->
                </div>
                <div
                  class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4"
                >
                  <div
                    class="flex items-center text-xl font-semibold text-indigo-600"
                  >
                    {{ guide.title }}
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        Updated at
                        <time datetime="2020-01-07">{{
                          $getDate(guide.updatedAt)
                        }}</time>
                      </p>
                      <p
                        class="flex items-center mt-2 text-sm text-gray-500 truncate"
                      >
                        {{ guide.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <!-- Heroicon name: chevron-right -->
                <svg
                  class="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pageTitle from '~/components/blocks/page-title.vue'
export default {
  name: 'GuidesIndex',
  components: { pageTitle },
  async asyncData({ $content }) {
    const guides = await $content('guides', { deep: true })
      .without(['toc', 'body'])
      .sortBy('position')
      .fetch()
    // const content = await $content('documentation', { deep: true })
    // .only(['title', 'path'])
    // .fetch()

    // let pages = []
    // content.forEach((markdownFile) => {
    //   const path = markdownFile.path.replace('/documentation/', '').split('/')
    //   const Page = {
    //     label: path[0],
    //     guides: [],
    //     number: 0,
    //     route: 'type-slug',
    //   }
    //   pages.push(Page)
    // })

    // const pagesAll = pages

    // // delete duplicates
    // pages = pages.filter(
    //   (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    // )
    // // alphabetic sorting
    // pages.sort((a, b) => (a.label > b.label ? 1 : -1))

    // pagesAll.forEach((pageA) => {
    //   pages.forEach((page) => {
    //     if (pageA.label === page.label) {
    //       page.number += 1
    //     }
    //   })
    // })

    // pages.unshift({ label: 'Home', iconStroke: false, route: 'home' })

    return {
      guides,
      // welcome,
      // pages,
    }
  },
}
</script>
