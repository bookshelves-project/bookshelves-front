<template>
  <div class="main-content">
    <app-header
      :title="`${title} ${tag.name}`"
      :subtitle="`${description} ${tag.name}`"
    />
    <div>
      <search-results
        v-if="books.data.length"
        :entity-type="`book`"
        :entities="books.data"
      />
      <div class="mt-14 mb-5">
        <load-more
          :last-page="books.meta.last_page"
          :endpoint="`tags/books/${tag.meta.slug}`"
          :entities="books.data"
          @load="load"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchResults from '~/components/blocks/search-results.vue'
import LoadMore from '~/components/special/load-more.vue'
export default {
  name: 'TagsSlug',
  components: { SearchResults, LoadMore },
  async asyncData({ app, params }) {
    const [tag, books] = await Promise.all([
      app.$axios.$get(`/tags/${params.slug}`),
      app.$axios.$get(`/tags/books/${params.slug}`),
    ])

    return {
      tag: tag.data,
      books,
    }
  },
  data() {
    return {
      title: 'Tag',
      description: 'Books and series with tag',
    }
  },
  head() {
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = `${this.title}${this.tag.name}`
    return {
      title,
      meta: [
        ...dynamicMetadata.default({
          title,
          description: this.description,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
  methods: {
    load(data) {
      this.books.data = data
    },
  },
}
</script>
