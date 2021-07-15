<template>
  <div class="container max-w-7xl">
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
}
</script>
