<template>
  <div class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <div>
      <h2>Genres</h2>
      <section class="flex flex-wrap items-center">
        <nuxt-link
          v-for="tag in genres"
          :key="tag.id"
          :to="{ name: 'tags-slug', params: { slug: tag.slug } }"
          class="px-3 py-1 m-1 transition-colors duration-100 bg-gray-300 rounded-full hover:bg-primary-300"
        >
          {{ tag.name }} ({{ tag.count }})
        </nuxt-link>
      </section>
    </div>
    <div>
      <h2>Tags</h2>
      <section class="flex flex-wrap items-center">
        <nuxt-link
          v-for="tag in tags"
          :key="tag.id"
          :to="{ name: 'tags-slug', params: { slug: tag.slug } }"
          class="px-3 py-1 m-1 transition-colors duration-100 bg-gray-300 rounded-full hover:bg-primary-300"
        >
          {{ tag.name }} ({{ tag.count }})
        </nuxt-link>
      </section>
    </div>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'TagsIndex',
  components: { sectionHeading },
  async asyncData({ app }) {
    const [genres, tags] = await Promise.all([
      app.$axios.$get(`/genres`),
      app.$axios.$get(`/tags`),
    ])

    return {
      genres: genres.data,
      tags: tags.data,
    }
  },
  data() {
    return {
      title: 'Tags',
      description: '',
    }
  },
}
</script>
