<script setup lang="ts">
import AppImg from '@/components/app/img.vue'
import FieldRatingStars from '@/components/field/rating-stars.vue'
import { calExactTimeDiff } from '~/utils/methods'
const props = defineProps<{
  review?: Review
}>()

const { moduleSocialRating } = useRuntimeConfig()
const emit = defineEmits(['destroy'])

const overflow = ref(true)
const auth = ref(false)

const toggleFullReview = (review: Review) => {
  overflow.value = !overflow.value
}
const deleteReview = (id: number) => {
  emit('destroy', id)
}
</script>

<template>
  <div v-if="review" class="review flex text-sm text-gray-500 space-x-4">
    <div class="flex-none py-6">
      <app-img
        :src="review.user.avatar"
        :color="review.user.color"
        :alt="review.user.name"
        class="w-10 h-10 rounded-full"
      />
    </div>
    <div class="flex-1 py-6">
      <router-link
        :to="
          $localePath({
            name: 'users-slug',
            params: {
              slug: review.user.slug,
            },
          })
        "
        class="font-medium text-gray-900 dark:text-gray-100 internal-link"
      >
        {{ review.user?.name }}
      </router-link>
      <div>
        <span class="font-medium text-gray"
        >Posted from {{ calExactTimeDiff(review.createdAt) }}</span
        >
        <span
          v-if="review.createdAt !== review.updatedAt"
          class="font-medium text-gray"
        >, modified from {{ calExactTimeDiff(review.updatedAt) }}</span
        >
      </div>

      <field-rating-stars
        v-if="moduleSocialRating"
        :rating="review.rating"
        class="mt-4"
        disabled
      />
      <p class="sr-only">{{ review.rating }} out of 5 stars</p>

      <div
        class="review-text prose prose-lg dark:prose-invert mr-3 mt-4 max-w-none"
      >
        <div
          class="light-md mt-1 overflow-hidden text-sm text-gray"
          :class="overflow ? 'overflow-review' : ''"
          v-html="review.text"
        />
        <button
          v-if="review.text && review.text.length > 300"
          type="button"
          class="mt-2 text-sm font-medium text-primary-600"
          @click="toggleFullReview(review!)"
        >
          <span v-if="overflow">See more</span>
          <span v-else>Hide</span>
        </button>
        <!-- <button
            v-if="
              $auth.$state.loggedIn &&
              review.user.id === $auth.$state.user.data.id
            "
            type="button"
            class="text-gray-300 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-300"
            title="Delete"
            aria-label="Delete"
            @click="deleteReview(review.id)"
          >
            <svg-icon name="trash" class="h-5 w-5" />
          </button> -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.review :deep(.overflow-review) {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.overflow-review :deep(p) {
  display: contents;
}
.overflow-review :deep(p:after) {
  content: '\A';
  white-space: pre;
}

.review-text :deep(p) {
  margin-top: 0 !important;
}
</style>
