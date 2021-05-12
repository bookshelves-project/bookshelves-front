<template>
  <main class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <div class="gap-4 lg:grid lg:grid-cols-2">
      <nuxt-link
        v-for="guide in guides"
        :key="guide.id"
        :to="{
          name: 'content',
          params: { type: 'guides', slug: guide.slug },
        }"
        :title="guide.title"
        :aria-label="guide.title"
        class="block col-span-1 px-3 py-2 overflow-hidden transition-colors duration-100 bg-white rounded-md shadow lg:px-6 lg:py-4 h-36 hover:bg-gray-50 dark:bg-gray-800"
      >
        <div
          class="flex items-center h-full px-2 py-2 lg:px-4 lg:py-4 lg:h-auto sm:px-6"
        >
          <div class="flex items-center flex-1 min-w-0">
            <div class="flex-shrink-0">
              <component
                :is="`icon-${getPicture(guide)}`"
                class="object-cover w-12 h-12 text-opacity-50 rounded-full fill-current text-primary-600"
              ></component>
            </div>
            <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
              <h2 class="my-auto text-xl font-medium text-primary-600">
                {{ guide.title }}
              </h2>
              <div class="hidden md:block">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-100">
                    <span v-if="guide.updatedAt">
                      <time :datetime="guide.updatedAt">{{
                        $formatDate(guide.updatedAt)
                      }}</time>
                    </span>
                    <span v-else>
                      <time :datetime="guide.createdAt">{{
                        $formatDate(guide.createdAt)
                      }}</time>
                    </span>
                  </p>
                  <div></div>
                  <p
                    class="flex items-start mt-2 text-sm italic text-gray-800 dark:text-gray-300 line-clamp-2"
                  >
                    {{ guide.description }}
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
    </div>
  </main>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

export default {
  name: 'GuidesIndex',
  components: { sectionHeading },
  async asyncData({ $content }) {
    const guides = await $content('guides', { deep: true })
      .without(['toc', 'body'])
      .where({ draft: false })
      .sortBy('position')
      .fetch()

    return {
      guides,
    }
  },
  data() {
    return {
      title: `Guides`,
      description: `To know more about eBooks & eReaders`,
    }
  },
  head() {
    const title = this.title
    const url = `${this.$config.baseURL}/guides`
    const dynamicMeta = dynamicMetadata({
      title: this.title,
      description: this.description,
      url,
    })
    return {
      title,
      meta: [...dynamicMeta],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: this.$config.baseURL,
        text: 'Home',
      },
      {
        url: `${this.$config.baseURL}/guides`,
        text: 'Guides',
      },
    ]
    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
    }
  },
  methods: {
    getPicture(guide) {
      return guide.category ? this.$slugify(guide.category) : ''
    },
  },
}
</script>
