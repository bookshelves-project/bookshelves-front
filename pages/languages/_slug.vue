<template>
  <div v-if="language" class="main-content">
    <app-header :title="title" :subtitle="description" :border="false" />
    <div class="lg:grid lg:grid-cols-2 lg:gap-4 space-y-2 lg:space-y-0">
      <nuxt-link
        :to="
          localePath({
            name: 'books',
            query: {
              'filter[languages]': language.meta.slug,
            },
          })
        "
        class="link"
      >
        <img src="/images/bibliophile.svg" />
        <h2>An eBook?</h2>
      </nuxt-link>
      <nuxt-link
        :to="
          localePath({
            name: 'series',
            query: {
              'filter[languages]': language.meta.slug,
            },
          })
        "
        class="link"
      >
        <img src="/images/book-lover.svg" />
        <h2>A series?</h2>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLanguagesSlug',
  async asyncData({ app, params }) {
    const language = await app.$axios.$get(`/languages/${params.slug}`)

    return {
      language: language.data
    }
  },
  data() {
    return {
      title: 'eBooks & series into',
      description: 'Do you want to read an eBook or a series?'
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description: this.description,
          url: this.$nuxt.$route.path
        })
      ]
    }
  },
  mounted() {
    this.title = `${this.title} ${this.language.name}`
  }
}
</script>

<style lang="postcss" scoped>
.link {
  @apply block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-2;
  & img {
    @apply h-96 mx-auto;
  }
  & h2 {
    @apply text-center text-3xl font-semibold font-handlee mt-6;
  }
}
</style>
