<script setup lang="ts">
import EntityAuthorsLinks from '@/components/entity/authors-links.vue'
import EntitySerieLink from '@/components/entity/serie-link.vue'
import EntityLanguageLink from '@/components/entity/language-link.vue'
import EntityBookLink from '@/components/entity/book-link.vue'

const props = defineProps<{
  book: Book
}>()

const { nuxtFetch } = useFetchable()
const bookNext = ref<Book>()

const getNext = async () => {
  if (props.book.serie !== null) {
    await nuxtFetch<ApiResponse<Book>>(
      '/series/books',
      [props.book.meta.author, props.book.serie?.meta.slug],
      {
        next: props.book.volume,
        first: true,
      }
    )
      .then((e) => (bookNext.value = e?.data))
      .catch((e) => {})
  }
}
await getNext()
</script>

<template>
  <div class="mt-4 lg:mt-0 lg:col-span-1 order-2">
    <h2 class="sr-only">Information</h2>
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
              <entity-authors-links :authors="book.authors" short />
            </dd>
          </div>
          <div v-if="book.serie">
            <dt>Series</dt>
            <dd>
              <entity-serie-link :serie="book.serie" :volume="book.volume" />
            </dd>
          </div>
          <div v-if="bookNext">
            <dt>Do you want vol. {{ bookNext.volume }}?</dt>
            <dd>
              <entity-book-link :book="bookNext" />
            </dd>
          </div>
          <div v-if="book.language">
            <dt>Language</dt>
            <dd>
              <entity-language-link :language="book.language" />
            </dd>
          </div>
          <div v-if="book.identifier?.isbn">
            <dt>ISBN</dt>
            <dd>
              {{ book.identifier.isbn }}
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
    @apply text-sm font-medium text-gray-500 dark:text-gray-400 text-left;
  }
  & dd {
    @apply mt-1 text-sm text-gray-900 dark:text-gray-100 text-left;
  }
}
</style>
