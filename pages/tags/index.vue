<template>
  <div class="main-content">
    <section-heading :title="title" :subtitle="description" />
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Genres</h2>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="tag in genres"
          :key="tag.id"
          :to="{ name: 'tags-slug', params: { slug: tag.meta.slug } }"
        >
          {{ tag.name }} ({{ tag.count }})
        </chip>
      </section>
    </div>
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Tags</h2>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="tag in tags"
          :key="tag.id"
          :to="{ name: 'tags-slug', params: { slug: tag.meta.slug } }"
        >
          {{ tag.name }} ({{ tag.count }})
        </chip>
      </section>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import sectionHeading from '~/components/blocks/section-heading.vue'
import Chip from '~/components/blocks/chip.vue'
export default {
  name: 'TagsIndex',
  components: { sectionHeading, Chip },
  async asyncData({ app }) {
    const [genres, tags] = await Promise.all([
      app.$axios.$get(
        `/tags?${qs.stringify({
          type: 'genre',
        })}`
      ),
      app.$axios.$get(`/tags`),
    ])

    return {
      genres: genres.data,
      tags: tags.data,
    }
  },
  data() {
    return {
      title: 'Genres & Tags',
      description: 'Find books and series by their genres and tags.',
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = this.title
    return {
      title,
      meta: [
        ...dynamicMetadata({
          title,
          description: this.description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
}
</script>
