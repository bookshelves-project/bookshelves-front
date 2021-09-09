<template>
  <div class="main-content">
    <section-heading :title="title" :subtitle="description" />
    <div>
      <section class="flex flex-wrap items-center">
        <chip
          v-for="publisher in publishers"
          :key="publisher.id"
          :to="{
            name: 'publishers-slug',
            params: { slug: publisher.meta.slug },
          }"
        >
          {{ publisher.name }} ({{ publisher.count }})
        </chip>
      </section>
    </div>
  </div>
</template>

<script>
import Chip from '~/components/blocks/chip.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'PagePublishers',
  components: { sectionHeading, Chip },
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
