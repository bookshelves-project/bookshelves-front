<template>
  <div class="container max-w-7xl">
    <div class="flex flex-wrap-reverse w-full xl:col-span-3">
      <div class="w-full ml-auto lg:w-3/4">
        <div class="text-on-img-tailwind">
          <div class="relative w-full">
            <div class="source" style="z-index: -1">
              <component
                :is="`icon-${getPicture}`"
                v-if="$route.params.type === 'guides'"
                class="h-40 mx-auto opacity-25 fill-current text-opacity-60 text-primary-600 object-container"
              ></component>
              <img
                v-if="$route.params.type === 'pages'"
                :src="`/images/pages/${$nuxt.$route.params.slug}.webp`"
                :alt="`${$nuxt.$route.params.slug} picture`"
                class="h-40 mx-auto opacity-25 object-container"
              />
              <div
                class="absolute z-10 w-full text-2xl italic text-center text-white"
                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
              >
                <div class="mx-auto text-lg max-w-prose">
                  <div>
                    <h2
                      class="block text-base font-semibold tracking-wide text-center uppercase text-primary-600"
                    >
                      {{ document.category }}
                    </h2>
                    <h1
                      class="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl"
                    >
                      {{ document.title }}
                    </h1>
                  </div>
                  <p class="mt-8 text-xl leading-8 text-gray-500">
                    {{ document.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 pb-10 mx-auto prose prose-lg lg:px-5 lg:pt-8">
          <div v-if="$route.params.slug === 'api-documentation'">
            <a
              :href="`${apiUrl}`"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-base text-gray-500 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-400"
            >
              API Status:
              <span class="font-semibold">
                <span v-if="apiStatusBoolean" class="text-green-600">
                  available
                </span>
                <span v-else class="text-red-600"> unavailable </span>
              </span>
            </a>
          </div>
          <nuxt-content :document="document" />
        </div>
      </div>
      <div class="relative block w-full lg:mx-auto lg:w-1/4 lg:max-w-prose">
        <div
          class="lg:sticky lg:top-16 h-full lg:h-auto lg:max-h-(screen-5) pt-5"
        >
          <table-of-content :toc="document.toc"></table-of-content>
          <component
            :is="`icon-${getPicture}`"
            v-if="$route.params.type === 'guides'"
            class="hidden fill-current lg:block text-opacity-60 text-primary-600"
          ></component>
          <img
            v-if="$route.params.type === 'pages'"
            :src="`/images/pages/${$nuxt.$route.params.slug}.webp`"
            :alt="`${$nuxt.$route.params.slug} picture`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableOfContent from '~/components/common/content/TableOfContent.vue'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'ContentPage',
  components: { TableOfContent },
  async asyncData({ $content, route, params, error }) {
    const path = `/${params.type}/${params.slug}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return {
      document,
    }
  },
  data() {
    return {
      apiUrl: this.$config.apiURL,
      apiStatusBoolean: false,
    }
  },
  head() {
    const title = `${this.document.title}`
    const url = `${this.$config.baseURL}/${this.$route.params.type}/${this.document.slug}`
    const dynamicMeta = dynamicMetadata({
      type: 'article',
      title: this.document.title,
      description: this.document.description,
      url,
      image: `${this.$config.baseURL}/images/no-cover.webp`,
    })
    return {
      title,
      meta: [
        ...dynamicMeta,
        {
          hid: 'article:published_time',
          property: 'article:published_time',
          content: this.document.createdAt,
        },
        {
          hid: 'article:author',
          property: 'article:author',
          content: 'Bookshelves',
        },
        {
          hid: 'article:section',
          property: 'article:section',
          content: this.$route.params.type,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
  computed: {
    getPicture() {
      return this.document.category ? this.$slugify(this.document.category) : ''
    },
  },
  created() {
    if (this.$route.params.slug === 'api-documentation') {
      this.apiStatus()
    }
  },
  methods: {
    async apiStatus() {
      let res = null
      try {
        res = await this.$axios.head(`${this.$config.apiURL}`)
        if (res.status === 200) {
          this.apiStatusBoolean = true
        } else {
          this.apiStatusBoolean = false
        }
      } catch (error) {
        this.apiStatusBoolean = false
      }
    },
  },
}
</script>
