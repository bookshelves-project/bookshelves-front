<template>
  <div class="main-content">
    <section-heading :title="title" :subtitle="description" />
    <div>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="language in languages"
          :key="language.id"
          :to="{
            name: 'books',
            query: { lang: language.meta.slug },
          }"
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
import sectionHeading from '~/components/blocks/section-heading.vue'
import { formatLanguage } from '~/plugins/utils/methods'
export default {
  name: 'PageLanguages',
  components: { sectionHeading, Chip },
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
