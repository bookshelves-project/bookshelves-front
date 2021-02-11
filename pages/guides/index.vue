<template>
  <main class="container max-w-7xl">
    <section-heading
      title="Guides"
      subtitle="To know more about eBooks & eReaders"
    />
    <div class="space-x-4 xl:grid xl:grid-cols-3">
      <div class="col-span-2">
        <ul class="px-2 mx-auto my-5 space-y-3">
          <nuxt-link
            v-for="guide in guides"
            :key="guide.id"
            :to="guide.path"
            class="block px-3 py-2 overflow-hidden transition-colors duration-100 bg-white rounded-md shadow lg:px-6 lg:py-4 h-36 hover:bg-gray-50 dark:bg-gray-800"
          >
            <div
              class="flex items-center h-full px-2 py-2 lg:px-4 lg:py-4 lg:h-auto sm:px-6"
            >
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
                    <p
                      class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300"
                    >
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
                    <h2 class="text-xl font-medium text-primary-600 truncate">
                      {{ guide.title }}
                    </h2>
                  </div>
                  <div class="hidden md:block">
                    <div>
                      <p class="text-sm text-gray-900 dark:text-gray-100">
                        Updated at
                        <time :datetime="guide.updatedAt">{{
                          $getDate(guide.updatedAt)
                        }}</time>
                      </p>
                      <div>
                        {{ $getDate(guide.createdAt) }}
                      </div>
                      <p class="flex items-start mt-2 text-sm text-gray-500">
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
                        {{ $overflow(guide.description, 80) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
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
      <div class="xl:col-span-1"></div>
    </div>
  </main>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
// import DesignXl from '~/components/blocks/design-xl.vue'
// import pageTitle from '~/components/blocks/page-title.vue'
export default {
  name: 'GuidesIndex',
  components: { sectionHeading },
  // components: { pageTitle, DesignXl },
  async asyncData({ $content }) {
    const guides = await $content('guides', { deep: true })
      .without(['toc', 'body'])
      .where({ draft: false })
      .sortBy('created_at')
      .fetch()

    // let guidesSort = guides.sort((a, b) =>
    //   a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
    // )
    // guidesSort = guidesSort.reverse()

    return {
      guides,
      // welcome,
      // pages,
    }
  },
  head() {
    const title = 'Guides on Bookshelves'
    const description = 'How to use your eReader or softwares to manage EPUB.'
    const image = `${process.env.BASE_URL}/open-graph.png`
    return {
      title,
      titleTemplate: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/guides`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss">
.warning {
  @apply dark:bg-yellow-900;
}
</style>
