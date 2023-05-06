<script setup lang="ts">
import type { Api, Book } from '~/types'

const props = defineProps<{
  book: Book
}>()

const bookNext = ref<Book>()

async function nextSerieVolume() {
  if (!props.book.serie)
    return false

  const reponse = await useHttp<Api<Book>>({
    name: '/series/{author}/{serie}/{volume}/next',
    params: {
      author: props.book.meta.author,
      serie: props.book.serie?.meta.slug,
      volume: props.book.volume,
    },
  })

  if (reponse.value?.ok)
    bookNext.value = reponse.value?._data?.data
}
await nextSerieVolume()
</script>

<template>
  <div class="mt-4 md:mt-0 md:col-span-1 order-2">
    <h2 class="sr-only">
      Information
    </h2>
    <p
      class="text-3xl font-semibold text-gray-900 dark:text-gray-100 font-handlee"
    >
      {{ book.type }}
    </p>

    <div class="mt-6">
      <div class="mt-6">
        <dl class="data-list">
          <div>
            <dt>Authors</dt>
            <dd>
              <book-link-authors :authors="book.authors" short />
            </dd>
          </div>
          <div v-if="book.serie">
            <dt>Series</dt>
            <dd>
              <book-link-serie :serie="book.serie" :volume="book.volume" />
            </dd>
          </div>
          <div v-if="book.language">
            <dt>Language</dt>
            <dd>
              <book-link-language :language="book.language" />
            </dd>
          </div>
          <div v-if="book.identifier?.isbn">
            <dt>ISBN</dt>
            <dd>
              {{ book.identifier.isbn }}
            </dd>
          </div>
          <div v-if="bookNext">
            <dt>Next vol.</dt>
            <dd>
              <book-link :book="bookNext">
                (vol. {{ bookNext.volume }})
              </book-link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.data-list {
  @apply space-y-6;
  & dt {
    @apply text-sm font-medium text-gray text-left;
  }
  & dd {
    @apply mt-1 text-sm text-gray-900 dark:text-gray-100 text-left;
  }
}
</style>
