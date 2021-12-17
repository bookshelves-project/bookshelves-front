<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" :border="false" />
    <blocks-content-list :items="languages" name="languages" route-name="languages-slug" />
    <!-- <div>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="language in languages"
          :key="language.id"
          :to="
            localePath({
              name: 'books',
              query: { 'filter[languages]': language.meta.slug },
            })
          "
        >
          <span class="flex items-center space-x-2">
            <span>{{ language.name }}</span>
            {{ formatLanguage(language.meta.slug).flag }}
          </span>
        </chip>
      </section>
    </div>-->
  </div>
</template>

<script>
import { formatLanguage } from '~/utils/methods'
export default {
  name: 'PageLanguages',
  async asyncData({ app }) {
    try {
      const languages = await app.$axios.$get('languages')

      return {
        languages: languages.data
      }
    } catch (error) { }
  },
  data() {
    return {
      formatLanguage,
      title: 'Languages of eBooks and series',
      description:
        'You can read your eBooks in many languages, browse each possibilities!'
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = this.title
    return {
      title,
      description: this.description,
      meta: [
        ...dynamicMetadata.default({
          title,
          url: this.$nuxt.$route.path
        })
      ]
    }
  }
}
</script>
