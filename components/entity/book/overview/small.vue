<script setup lang="ts">
const props = defineProps<{
  book: Book
}>()

const { request } = useHttp()
const bookNext = ref<Book>()

const getNext = async () => {
  if (!props.book.serie) { return false }
  const reponse = await request<Book>({
    endpoint: '/series/books',
    params: [
      props.book.meta.author,
      props.book.serie?.meta.slug
    ],
    query: {
      next: props.book.volume,
      first: true
    },
    extractData: true
  })

  if (reponse.success) {
    bookNext.value = reponse.body
  }
}
await getNext()
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
              <entity-authors-links :authors="book.authors" short />
            </dd>
          </div>
          <div v-if="book.serie">
            <dt>Series</dt>
            <dd>
              <entity-serie-link :serie="book.serie" :volume="book.volume" />
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
          <div v-if="bookNext">
            <dt>Next</dt>
            <dd>
              <entity-book-link :book="bookNext">
                (vol. {{ bookNext.volume }})
              </entity-book-link>
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
