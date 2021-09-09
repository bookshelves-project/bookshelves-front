<template>
  <div class="main-content">
    <div class="flex flex-wrap-reverse w-full xl:col-span-3">
      <div class="w-full ml-auto lg:w-3/4">
        <div class="text-on-img-tailwind">
          <div class="relative w-full">
            <div class="source" style="z-index: -1">
              <img
                :src="picture"
                :alt="`${$nuxt.$route.params.slug} picture`"
                loading="lazy"
                class="h-40 mx-auto opacity-25 object-container"
              />
              <div
                class="
                  absolute
                  z-10
                  w-full
                  text-2xl
                  italic
                  text-center text-white
                "
                style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
              >
                <div class="mx-auto text-lg max-w-prose">
                  <div>
                    <div
                      class="
                        block
                        text-base
                        font-semibold
                        tracking-wide
                        text-center
                        uppercase
                        text-primary-600
                      "
                    >
                      {{ document.category }}
                    </div>
                    <h1
                      class="
                        block
                        mt-2
                        text-3xl
                        font-extrabold
                        leading-8
                        tracking-tight
                        text-center text-gray-900
                        sm:text-4xl
                      "
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
          <nuxt-content :document="document" />
        </div>
      </div>
      <div class="relative block w-full lg:mx-auto lg:w-1/4 lg:max-w-prose">
        <div
          class="
            lg:sticky lg:top-16
            h-full
            lg:h-auto lg:max-h-(screen-5)
            pt-5
            max-w-xl
            mx-auto
          "
        >
          <table-of-content :toc="document.toc"></table-of-content>
          <img
            :src="picture"
            :alt="`${document.title} picture`"
            class="h-40 hidden lg:block"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableOfContent from '~/components/blocks/content/table-of-content.vue'
import { capitalize } from '~/plugins/utils/methods'

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
      capitalize,
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = `${this.document.title} · ${this.capitalize(
      this.$route.params.type
    )}`
    return {
      title,
      description: this.document.description,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
          image: `${this.$config.baseURL}/images/home/ereaders.svg`,
          articlePublishedTime: this.document.createdAt,
          articleAuthor: this.$config.appName,
          articleSection: this.$route.params.type,
        }),
      ],
    }
  },
  computed: {
    picture() {
      const name =
        this.$route.params.type === 'guides'
          ? this.document.category.toLowerCase()
          : this.$route.params.slug
      const picture = `/images/${this.$route.params.type}/${name}.webp`
      return picture
    },
  },
}
</script>
