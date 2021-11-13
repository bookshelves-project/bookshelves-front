<template>
  <div class="main-content">
    <app-header :title="title" :subtitle="description" />
    <blocks-content-list
      :items="publishers"
      name="publishers"
      menu
      route-name="publishers-slug"
    />
  </div>
</template>

<script>
export default {
  name: 'PagePublishers',
  async asyncData({ app }) {
    const publishers = await app.$axios.$get(`/publishers`)

    return {
      publishers: publishers.data,
    }
  },
  data() {
    return {
      title: 'Publishers',
      description: '',
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
