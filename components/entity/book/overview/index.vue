<script setup lang="ts">
import EntityBookRelated from '@/components/entity/book/related.vue'
import EntityBookRelatedCss from '@/components/entity/book/related-css.vue'
import EntityBookOverviewSmall from '@/components/entity/book/overview/small.vue'
import EntityBookOverviewLarge from '@/components/entity/book/overview/large.vue'
import EntityReview from '@/components/entity/review/index.vue'

defineProps<{
  book: Book
}>()

const related = ref(false)

const success = (payload: boolean) => {
  related.value = payload
}
</script>

<template>
  <div class="divide-y divide-gray-300 dark:divide-gray-700 space-y-10">
    <div class="mx-auto lg:grid lg:grid-cols-3 lg:gap-x-8">
      <entity-book-overview-small :book="book" />

      <entity-book-overview-large :book="book" />
    </div>
    <div
      v-if="
        (book.tags && book.tags.length) || (book.genres && book.genres.length)
      "
      :class="related ? '' : 'hidden'"
    >
      <entity-book-related
        v-if="book.tags?.length || book.genres?.length"
        :book="book"
        @success="success"
      />
      <!-- <entity-book-related-css
        v-if="book.tags?.length || book.genres?.length"
        :book="book"
        @success="success"
      /> -->
    </div>
    <div class="lg:col-span-2 lg:pr-8">
      <entity-review :entity="book" />
    </div>
  </div>
</template>
