<script lang="ts" setup>
import type { Book } from '~/types'

const props = defineProps<{
  book: Book
}>()

const related = ref(true)
const success = () => (related.value = true)
const hasTags = computed(() => props.book.tags && props.book.tags.length)
const hasGenres = computed(() => props.book.genres && props.book.genres.length)
</script>

<template>
  <div class="divide-y divide-gray-300 dark:divide-gray-700 space-y-10">
    <div class="mx-auto md:grid md:grid-cols-3 md:gap-x-8">
      <book-overview-informations :book="book" />
      <book-overview-presentation class="mt-10 md:mt-0" :book="book" />
    </div>
    <div>
      <div
        v-if="hasTags || hasGenres"
        :class="related ? '' : 'hidden'"
      >
        <book-group-related
          v-if="book.tags?.length || book.genres?.length"
          :book="book"
          @success="success"
        />
      </div>
      <div class="lg:col-span-2 lg:pr-8">
      <!-- <entity-review :entity="book" /> -->
      </div>
    </div>
  </div>
</template>
