<script setup lang="ts">
import AppImg from '@/components/app/img.vue'
import FieldRatingStars from '@/components/field/rating-stars.vue'
import { calExactTimeDiff } from '~/utils/methods'
const props = defineProps<{
  comment?: CommentData
}>()

const { moduleSocialRating } = useRuntimeConfig()
const emit = defineEmits(['destroy'])

const overflow = ref(true)
const auth = ref(false)

const toggleFullComment = (comment: CommentData) => {
  overflow.value = !overflow.value
}
const deleteComment = (id: number) => {
  emit('destroy', id)
}
</script>

<template>
  <div v-if="comment" class="comment flex text-sm text-gray-500 space-x-4">
    <div class="flex-none py-6">
      <app-img
        :src="comment.user.avatar"
        :color="comment.user.color"
        :alt="comment.user.name"
        class="w-10 h-10 rounded-full"
      />
    </div>
    <div class="flex-1 py-6 pr-6">
      <h3 class="font-medium text-gray-900 dark:text-gray-100">
        {{ comment.user?.name }}
      </h3>
      <div>
        <span class="font-medium text-gray-500 dark:text-gray-400"
          >Posted from {{ calExactTimeDiff(comment.createdAt) }}</span
        >
        <span
          v-if="comment.createdAt !== comment.updatedAt"
          class="font-medium text-gray-500 dark:text-gray-400"
          >, modified from {{ calExactTimeDiff(comment.updatedAt) }}</span
        >
      </div>

      <field-rating-stars
        v-if="moduleSocialRating"
        :rating="comment.rating"
        class="mt-4"
        disabled
      />
      <p class="sr-only">{{ comment.rating }} out of 5 stars</p>

      <div
        class="comment-text prose prose-lg dark:prose-invert mt-4 max-w-none"
      >
        <div
          class="light-md mt-1 overflow-hidden text-sm text-gray-500 dark:text-gray-400"
          :class="overflow ? 'overflow-comment' : ''"
          v-html="comment.text"
        />
        <button
          v-if="comment.text && comment.text.length > 300"
          type="button"
          class="mt-2 text-sm font-medium text-primary-600"
          @click="toggleFullComment(comment!)"
        >
          <span v-if="overflow">See more</span>
          <span v-else>Hide</span>
        </button>
        <!-- <button
            v-if="
              $auth.$state.loggedIn &&
              comment.user.id === $auth.$state.user.data.id
            "
            type="button"
            class="text-gray-300 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-300"
            title="Delete"
            aria-label="Delete"
            @click="deleteComment(comment.id)"
          >
            <svg-icon name="trash" class="h-5 w-5" />
          </button> -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.comment :deep(.overflow-comment) {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.overflow-comment :deep(p) {
  display: contents;
}
.overflow-comment :deep(p:after) {
  content: '\A';
  white-space: pre;
}
</style>
