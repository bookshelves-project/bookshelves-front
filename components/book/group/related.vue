<script lang="ts" setup>
import type { Book, SelectedEntities } from '~/types'

const props = defineProps<{
  book: Book
  snap?: boolean
}>()

const emit = defineEmits<{
  (e: 'success', payload: boolean): void
}>()

const isAvailable = ref(true)

const related: SelectedEntities = {
  key: 'selection',
  name: '/entities/related/{author}/{book}',
  params: {
    author: props.book.meta.author,
    book: props.book.meta.slug,
  },
  eyebrow: 'Do you want more?',
  right: false,
  title: 'Related books & series',
  text: 'Based on tags & genre, not in same series. Limited to 10 first results.',
}
function success(payload: boolean) {
  isAvailable.value = payload
  emit('success', payload)
}
</script>

<template>
  <div class="mt-8">
    <div v-if="isAvailable">
      <book-group-swiper
        :selection="related"
        @success="success"
      />
      <div class="mt-6 flex">
        <app-button
          :to="{
            name: 'related-author_slug-entity_slug',
            params: {
              author_slug: book.meta.author,
              entity_slug: book.meta.slug,
            },
          }"
          color="white"
          align="center"
        >
          View all results
        </app-button>
      </div>
    </div>
  </div>
</template>
