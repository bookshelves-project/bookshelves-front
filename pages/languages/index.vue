<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="language in languages"
          :key="language.id"
          :to="
            localePath({
              name: 'books',
              query: { lang: language.meta.slug },
            })
          "
        >
          <span class="flex items-center space-x-2">
            <span>{{ language.name }}</span>
            <img
              :src="formatLanguage(language.meta.slug, 'flag')"
              :alt="language.name"
            />
          </span>
          <!-- ({{ language.count }}) -->
        </chip>
      </section>
    </div>
  </div>
</template>

<script>
import Chip from '~/components/blocks/chip.vue'
import { formatLanguage } from '~/plugins/utils/methods'
export default {
  name: 'PageLanguages',
  components: { Chip },
  async asyncData({ app }) {
    try {
      const languages = await app.$axios.$get('languages')

      return {
        languages: languages.data,
      }
    } catch (error) {}
  },
  data() {
    return {
      formatLanguage,
      title: 'Languages',
      description: '',
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = this.title
    return {
      title,
      description: this.description,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
}
</script>
