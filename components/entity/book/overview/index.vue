<script setup lang="ts">
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
    <div class="mx-auto md:grid md:grid-cols-3 md:gap-x-8">
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
    </div>
    <div class="lg:col-span-2 lg:pr-8">
      <entity-review :entity="book" />
    </div>
  </div>
</template>
