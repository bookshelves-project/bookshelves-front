<template>
  <div class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <div>
      <section class="flex flex-wrap items-center">
        <nuxt-link
          v-for="language in languages"
          :key="language.id"
          :to="{
            name: 'books',
            query: { lang: language.meta.slug },
          }"
          class="px-3 py-1 m-1 transition-colors duration-100 bg-primary-100 rounded-full hover:bg-primary-300 flex items-center space-x-2"
        >
          <span>{{ language.name }}</span>
          <img
            :src="formatLanguage(language.meta.slug, 'flag')"
            :alt="language.name"
          />
          <!-- ({{ language.count }}) -->
        </nuxt-link>
      </section>
    </div>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
import { formatLanguage } from '~/plugins/utils/methods'
export default {
  name: 'PageLanguages',
  components: { sectionHeading },
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
}
</script>
