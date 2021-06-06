<template>
  <div class="container max-w-7xl">
    <section-heading :title="`Tag: ${tag.name}`" :subtitle="description" />
    <div>
      <search-results
        v-if="tag.books.length"
        :entity-type="`book`"
        :entities="tag.books"
      />
    </div>
  </div>
</template>

<script>
import SearchResults from '~/components/blocks/search-results.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'TagsSlug',
  components: { sectionHeading, SearchResults },
  async asyncData({ app, params }) {
    const tag = await app.$axios.$get(`/tags/${params.slug}`)

    return {
      tag: tag.data,
    }
  },
  data() {
    return {
      title: 'Tag',
      description: '',
    }
  },
}
</script>
