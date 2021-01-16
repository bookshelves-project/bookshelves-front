<template>
  <div>
    <page-title />
    <div class="xl:grid xl:grid-cols-3">
      <div class="xl:col-span-2">
        <ul
          class="px-2 mx-auto my-5 space-y-3 md:px-10 lg:mx-0 lg:pl-5 lg:w-5/6 xl:w-full"
        >
          <nuxt-link
            v-for="guide in guides"
            :key="guide.id"
            :to="guide.path"
            class="block px-6 py-4 overflow-hidden transition-colors duration-100 bg-white rounded-md shadow hover:bg-gray-50"
          >
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="flex items-center flex-1 min-w-0">
                <div class="flex-shrink-0">
                  <img
                    class="object-cover w-12 h-12 rounded-full"
                    src="/images/no-cover.webp"
                    alt=""
                  />
                </div>
                <div
                  class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4"
                >
                  <div>
                    <p class="text-xl font-medium text-indigo-600 truncate">
                      {{ guide.title }}
                    </p>
                    <p class="flex items-center mt-2 text-sm text-gray-500">
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="ml-1 truncate">
                        {{ guide.category }}
                      </span>
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900">
                        Updated at
                        <time :datetime="guide.updatedAt">{{
                          $getDate(guide.updatedAt)
                        }}</time>
                      </p>
                      <p class="flex items-start mt-2 text-sm text-gray-500">
                        <!-- Heroicon name: check-circle -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
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
        </ul>
      </div>
      <div class="xl:col-span-1">
        <design-xl />
      </div>
    </div>
  </div>
</template>

<script>
import DesignXl from '~/components/blocks/design-xl.vue'
import pageTitle from '~/components/blocks/page-title.vue'
export default {
  name: 'GuidesIndex',
  components: { pageTitle, DesignXl },
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
