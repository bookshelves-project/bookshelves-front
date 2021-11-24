<template>
  <div>
    <transition name="fade">
      <div v-if="books.length" class="space-y-6 display-grid sm:space-y-0">
        <blocks-entity-card
          v-for="(book, id) in books"
          :key="id"
          :cover="book.cover.thumbnail"
          :color="book.cover.color"
          :title="book.title"
          :route="{
            name: 'books-author-slug',
            params: { author: book.meta.author, slug: book.meta.slug },
          }"
        >
          <template #primary>
            <!-- {{ $overflow(book.title, 50) }} -->
            {{ book.title }}
          </template>
          <template #secondary>
            <span v-if="book.authors">
              {{ formatAuthors(book.authors) }}
            </span>
            <!-- <span v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  &
                </span>
              </span> -->
          </template>
          <template #tertiary>
            <span v-if="book.serie" class="italic">
              {{ book.serie.title }},<br />
              vol. {{ book.volume }}
            </span>
            <span class="mt-1 block">
              <!-- {{ formatLanguage(book.language).label }} -->
            </span>
          </template>
        </blocks-entity-card>
      </div>
      <div v-else>Loading...</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Book } from '~/types/books/book'
import { formatAuthors } from '@/utils/methods'

defineProps({
  books: {
    type: Array as () => Array<Book>,
    required: true,
  },
})
</script>
