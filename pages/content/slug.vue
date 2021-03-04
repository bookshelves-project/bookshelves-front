<template>
  <div class="container max-w-7xl">
    <div class="text-on-img-tailwind">
      <div class="relative w-full">
        <div class="source" style="z-index: -1">
          <img
            src="/images/no-cover.webp"
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
          :href="`${apiUrl}/api`"
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
      <!-- <ul>
        <li
          v-for="link of document.toc"
          :key="link.id"
          class="text-gray-700 dark:text-gray-300"
          :class="{
            'border-t border-dashed dark:border-gray-800 first:border-t-0':
              link.depth === 2,
          }"
        >
          <a
            :href="`#${link.id}`"
            class="block text-sm duration-300 ease-in-out scrollactive-item transition-padding hover:pl-1"
            :class="{
              'py-2': link.depth === 2,
              'ml-2 pb-2': link.depth === 3,
            }"
            >{{ link.text }}</a
          >
        </li>
      </ul> -->
      <nuxt-content :document="document" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentPage',
  async asyncData({ $content, store, app, params, error }) {
    const path = `/pages/${params.slug}`
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
      apiUrl: process.env.API_URL,
      apiStatusBoolean: false,
      interval: 600000,
    }
  },
  head() {
    const title = `${this.document.title}`
    const description = this.document.description
    const image = `${process.env.BASE_URL}/images/no-cover.webp`
    const url = `${process.env.BASE_URL}/pages/${this.document.slug}`
    return {
      title,
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
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
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
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
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
  created() {
    this.apiStatus()
    setInterval(() => {
      this.apiStatus()
    }, this.interval)
  },
  methods: {
    async apiStatus() {
      let res = null
      try {
        res = await this.$http.head(`${process.env.API_URL}/api`)
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

<style lang="postcss" scoped></style>
