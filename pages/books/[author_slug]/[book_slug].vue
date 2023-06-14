<script lang="ts" setup>
import type { Book } from '~/types'

const route = useRoute()

const book = await useHttp<Book>({
  name: '/books/{author}/{book}',
  params: {
    author: route.params.author_slug,
    book: route.params.book_slug,
  },
})

const crumbs: string[] = [
  'Books',
  `${book?.authors[0].name}`,
  `${book?.title}`,
]

useMetadata({
  title: book?.title,
  description: book?.description,
  image: book?.media?.url,
})
</script>

<template>
  <main v-if="book" class="main-content">
    <layout-header
      :title="book.title"
      :image="book.media?.url"
      :color="book.media?.color"
      :authors="book.authors"
      :crumbs="crumbs"
      favorite
    >
      <div class="mx-auto grid w-max space-y-3">
        <book-cta-download :download="book.download" :files="book.files" />
        <book-cta-reader :download="book.download" :files="book.files" />
      </div>
      <template #extra>
        <div v-if="book.serie" class="text-sm flex items-center">
          <div class="mx-auto lg:mx-0 flex items-center">
            in
            <book-link-serie
              :serie="book.serie"
              :volume="book.volume"
              class="ml-1"
            />
          </div>
        </div>
      </template>
    </layout-header>
    <book-overview :book="book" class="mb-6" />
  </main>
</template>
