<template>
  <div class="px-4 py-6 sm:px-6">
    <ul
      v-if="commentsList.length > 0"
      class="overflow-y-auto max-h-96 scrollbar-thin"
    >
      <transition-group name="list" tag="li">
        <li v-for="comment in commentsList" :key="comment.id" class="mt-8">
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <app-image
                :src="comment.user.avatar"
                class="w-10 h-10"
                class-img="rounded-full"
                :alt="comment.user.name"
              />
            </div>
            <div>
              <div class="text-sm">
                <span class="font-medium text-gray-900 dark:text-gray-100">
                  {{ comment.user.name }}
                </span>
              </div>
              <div
                :ref="comment.id"
                class="mt-1 text-sm text-gray-700 dark:text-gray-300 light-md"
                v-html="$overflow(comment.text, 300)"
              ></div>
              <button
                v-if="comment.text.length > 300"
                type="button"
                class="mt-2 font-semibold text-primary-600"
                @click="displayCommentText(comment.id, comment.text)"
              >
                See more
              </button>
              <fields-rating-stars
                v-if="$config.moduleSocialRating"
                v-model="comment.rating"
                class="mt-1 mb-2"
                disable
              />
              <div class="flex items-center mt-2 space-x-2 text-sm">
                <!-- {{ comment.updatedAt }} -->
                <span class="font-medium text-gray-500"
                  >Posted from {{ calExactTimeDiff(comment.createdAt) }}</span
                >
                <button
                  v-if="
                    $auth.$state.loggedIn &&
                    comment.user.id === $auth.$state.user.data.id
                  "
                  type="button"
                  class="
                    text-gray-400
                    dark:text-gray-200
                    hover:text-gray-500
                    dark:hover:text-gray-300
                  "
                  title="Delete"
                  aria-label="Delete"
                  @click="deleteComment(comment.id)"
                >
                  <svg-icon name="trash" class="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
    <div v-else class="italic text-gray-400">No comments available</div>
  </div>
</template>

<script>
import { calExactTimeDiff } from '@/plugins/utils/methods'
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
    calExactTimeDiff,
    displayCommentText(refId, originalText) {
      this.$refs[refId][0].innerHTML = originalText
    },
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
</script>
