<template>
  <div v-if="document" class="main-content">
    <app-header
      :title="document.title"
      :subtitle="document.category ? `Into: ${document.category}` : ''"
      :text="document.description"
      :image="picture"
      :border="false"
    />
    <div class="flex flex-wrap-reverse w-full xl:col-span-3">
      <div class="prose prose-lg dark:prose-light">
        <nuxt-content :document="document" />
      </div>
      <div class="relative block w-full lg:mx-auto lg:w-1/4 lg:max-w-prose">
        <div
          class="
            lg:sticky lg:top-20
            h-full
            lg:h-auto lg:max-h-(screen-5)
            max-w-xl
            lg:mx-auto
          "
        >
          <blocks-content-table-of-content
            :toc="document.toc"
          ></blocks-content-table-of-content>
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
import { capitalize } from '~/plugins/utils/methods'

export default {
  name: 'ContentPage',
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
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
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
