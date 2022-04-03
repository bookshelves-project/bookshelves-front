<template>
  <div>TODO comment-list</div>
</template>
<!-- <template>
  <div class="py-2 lg:pr-4">
    <ul
      v-if="commentsList.length > 0"
      class="overflow-y-auto max-h-96 scrollbar-thin"
    >
      <transition-group name="list" tag="li">
        <block-comments-card
          v-for="comment in commentsList"
          :key="comment.id"
          :comment="comment"
          @destroy="deleteComment"
        />
      </transition-group>
    </ul>
    <div v-else class="italic text-gray-400">No comments available</div>
  </div>
</template>

<script>
export default {
  name: 'CommentsList',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      commentsList: [],
    }
  },
  watch: {
    comments(newValue, oldValue) {
      this.commentsList = newValue
    },
  },
  mounted() {
    this.commentsList = this.comments
  },
  methods: {
    async deleteComment(id) {
      const comments = this.commentsList.filter((comment) => comment.id !== id)
      this.commentsList = comments

      try {
        await this.$axios.$post(`/comments/destroy/${id}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script> -->
