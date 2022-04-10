<script setup lang="ts">
import EntityAuthorsLinks from '@/components/entity/authors-links.vue'
import EntitySerieLink from '@/components/entity/serie-link.vue'
import EntityPublisherLink from '@/components/entity/publisher-link.vue'
import EntityLanguageLink from '@/components/entity/language-link.vue'
import EntityTagsLinks from '@/components/entity/tags-links.vue'
import EntityBookLink from '@/components/entity/book-link.vue'
import EntityBookRelated from '@/components/entity/book/related.vue'
import { date } from '~/utils/methods'

const props = defineProps<{
  book: Book
}>()

const { nuxtFetch } = useFetchable()
const bookNext = ref<Book>()
const related = ref(false)

const getNext = async () => {
  if (props.book.serie) {
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

const files = computed((): DownloadList => {
  let filtered = Object.fromEntries(
    Object.entries(props.book.files!).filter(([key, file]) => file !== null)
  )
  filtered = Object.values(filtered).reverse()

  return filtered
})
const success = (payload: boolean) => {
  related.value = payload
}
</script>

<template>
  <div class="divide-y divide-gray-300 dark:divide-gray-700 space-y-10">
    <div class="mx-auto lg:grid lg:grid-cols-3 lg:gap-x-8">
      <!-- Data list  -->
      <div class="mt-4 lg:mt-0 lg:col-span-1 order-2">
        <h2 class="sr-only">Information</h2>
        <p class="text-3xl text-gray-900 dark:text-gray-100">
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
                  <entity-serie-link
                    :serie="book.serie"
                    :volume="book.volume"
                  />
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

      <!-- Data list details  -->
      <div
        class="col-span-2 order-1 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 lg:pb-2 lg:pr-8"
      >
        <div class="flex flex-col h-full">
          <div>
            <div>
              <h3 class="sr-only">Abstract</h3>

              <div class="space-y-6">
                <div
                  class="text-sm text-gray-900 dark:text-gray-100 word-wraping"
                  v-if="book.description"
                  v-html="book.description"
                ></div>
              </div>
            </div>
            <div :class="{ 'mt-10': book.description }">
              <h3
                class="text-sm font-medium text-gray-900 dark:text-gray-100 sr-only"
              >
                Details
              </h3>

              <div class="mt-4">
                <ul role="list" class="data-list-details">
                  <li v-if="book.publisher">
                    <span>
                      <span>Publisher:</span>
                      <entity-publisher-link :publisher="book.publisher" />
                      <span v-if="book.releasedOn"
                        >({{ date(book.releasedOn) }})</span
                      >
                    </span>
                  </li>
                  <li v-if="book.pageCount">
                    <span> Page count: {{ book.pageCount }} </span>
                  </li>
                  <li v-if="book.genres && book.genres.length >= 1">
                    <span>
                      <span>Genre:</span>
                      <entity-tags-links :tags="book.genres" short />
                    </span>
                  </li>
                  <li v-if="book.tags && book.tags.length >= 1">
                    <span>
                      <span>Tags:</span>
                      <entity-tags-links :tags="book.tags" short />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <section aria-labelledby="download-heading" class="mt-auto">
            <div class="mt-4 space-y-6">
              <div>
                <h2
                  id="download-heading"
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Formats
                </h2>
                <ul
                  role="list"
                  class="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 mt-3"
                >
                  <li
                    v-for="file in files"
                    :key="file?.format"
                    class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                  >
                    <div class="w-0 flex-1 flex items-center">
                      <span
                        class="font-bold uppercase text-primary-600 dark:text-primary-500"
                        >{{ file?.format }}</span
                      >
                      <span class="ml-2 flex-1 w-0 truncate">
                        {{ file?.name }}
                      </span>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex items-center">
                      <div class="text-gray-500 dark:text-gray-400 mr-1">
                        {{ file?.size }}
                      </div>
                      <a
                        :href="file?.url"
                        class="font-medium text-primary-600 dark:text-primary-500 hover:bg-gray-100 py-1 px-2 rounded-md dark:hover:bg-gray-800"
                        download
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
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
      <slot name="reviews" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.data-list-details {
  @apply pl-4 list-disc text-sm space-y-2;
  & li {
    @apply text-gray-400 dark:text-gray-200;
    & span {
      @apply text-gray-600 dark:text-gray-400 flex items-center space-x-1;
    }
  }
}
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
