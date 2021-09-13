<template>
  <section
    v-if="$config.moduleSocial"
    aria-labelledby="book-comments"
    class="border-t border-gray-200 dark:border-gray-600"
  >
    <div class="sm:overflow-hidden">
      <div class="px-4 py-5 sm:px-6">
        <h2
          id="notes-title"
          class="text-lg font-medium text-gray-900 dark:text-gray-100"
        >
          Comments
        </h2>
      </div>
      <div class="grid lg:grid-cols-2 lg:gap-4">
        <blocks-comments-list
          :comments="commentsList"
          class="order-2 lg:order-1"
        />
        <forms-comment class="order-1 lg:order-2" @refresh="refresh" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlockCommentsIndex',
  props: {
    entity: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      commentsList: [],
    }
  },
  created() {
    this.commentsList = this.entity.comments
  },
  methods: {
    async refresh(slug) {
      try {
        const entity = this.$route.name.split('-')[0].slice(0, -1)
        const comments = await this.$axios.$get(`/comments/${entity}/${slug}`)
        this.commentsList = comments.data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
