<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" />
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Genres</h2>
      <blocks-content-list
        :items="genres"
        name="genres"
        route-name="tags-slug"
      />
    </div>
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Tags</h2>
      <blocks-content-list
        :items="tags"
        name="tags"
        menu
        route-name="tags-slug"
      />
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'TagsIndex',
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
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
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
