<template>
  <div class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <div>
      <section class="flex flex-wrap items-center">
        <nuxt-link
          v-for="publisher in publishers"
          :key="publisher.id"
          :to="{
            name: 'publishers-slug',
            params: { slug: publisher.meta.slug },
          }"
          class="px-3 py-1 m-1 transition-colors duration-100 bg-gray-300 rounded-full hover:bg-primary-300"
        >
          {{ publisher.name }} ({{ publisher.count }})
        </nuxt-link>
      </section>
    </div>
  </div>
</template>

<script>
import sectionHeading from '~/components/blocks/section-heading.vue'
export default {
  name: 'PagePublishers',
  components: { sectionHeading },
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
