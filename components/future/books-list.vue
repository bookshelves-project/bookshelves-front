<template>
  <div>
    <transition name="fade">
      <div v-if="books.length" class="space-y-6 display-grid sm:space-y-0">
        <block-entity-card
          v-for="(book, id) in books"
          :key="id"
          :cover="book.cover?.thumbnail"
          :color="book.cover?.color"
          :title="book.title"
          :route="{
            name: 'books-author-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #title>
            <span class="line-clamp-2">
              {{ book.title }}
            </span>
          </template>
          <template #subtitle>
            <span v-if="book.authors">{{ formatAuthors(book.authors) }}</span>
          </template>
          <template #extra>
            <span v-if="book.serie" class="italic">
              {{ book.serie.title }},
              <br />
              vol. {{ book.volume }}
            </span>
            <span class="mt-1 block">
              {{ formatLanguage(book.language) }}
            </span>
          </template>
        </block-entity-card>
      </div>
      <div v-else>Loading...</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { formatAuthors, formatLanguage } from '~/utils/methods'
import { Book } from '~/types'

defineProps({
  books: {
    type: Array as () => Book[],
    required: true,
  },
})
</script>
