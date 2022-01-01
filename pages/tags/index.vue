<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description">
      <template #filters>
        <block-filters negligible />
      </template>
    </app-header>
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Genres</h2>
      <block-content-list
        :items="genres"
        name="genres"
        route-name="tags-slug"
      />
    </div>
    <div class="mb-10">
      <h2 class="mb-6 font-handlee text-2xl">Tags</h2>
      <block-content-list :items="tags" name="tags" route-name="tags-slug" />
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { stringify } from 'qs'

export default {
  name: 'TagsIndex',
  async asyncData({ app, query }) {
    const queryList = { ...query }

    const [genres, tags] = await Promise.all([
      app.$axios.$get(
        `/tags?${stringify({
          'filter[type]': 'genre',
          ...queryList,
        })}`
      ),
      app.$axios.$get(
        `/tags?${stringify({
          'filter[type]': 'tag',
          ...queryList,
        })}`
      ),
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
    const dynamicMetadata = require('~/utils/metadata/dynamic')
    const title = this.title
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
  watchQuery: ['filter[show_negligible]'],
}
</script>
