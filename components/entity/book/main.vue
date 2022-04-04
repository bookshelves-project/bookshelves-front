<script setup lang="ts">
import EntityAuthorsLinks from '@/components/entity/authors-links.vue'
import EntitySerieLink from '@/components/entity/serie-link.vue'
import EntityPublisherLink from '@/components/entity/publisher-link.vue'
import EntityLanguageLink from '@/components/entity/language-link.vue'
import EntityTagsLinks from '@/components/entity/tags-links.vue'
import SvgIcon from '@/components/svg-icon.vue'
import { date } from '~/utils/methods'

const props = defineProps<{
  book: Book
}>()

const files = computed((): DownloadList => {
  let filtered = Object.fromEntries(
    Object.entries(props.book.files!).filter(([key, file]) => file !== null)
  )
  filtered = Object.values(filtered).reverse()

  return filtered
})
</script>

<template>
  <div class="overflow-hidden">
    <dl class="group">
      <div v-if="book.type" class="small">
        <dt>Type</dt>
        <dd>{{ book.type }}</dd>
      </div>
      <div v-if="book.authors" class="small">
        <dt>Authors</dt>
        <dd>
          <entity-authors-links :authors="book.authors" short />
        </dd>
      </div>
      <div v-if="book.serie" class="small">
        <dt>Serie</dt>
        <dd>
          <entity-serie-link :serie="book.serie" :volume="book.volume" />
        </dd>
      </div>
      <div v-if="book.publisher" class="small">
        <dt>Publisher</dt>
        <dd>
          <entity-publisher-link :publisher="book.publisher" />
        </dd>
      </div>
      <div v-if="book.releasedOn" class="small">
        <dt>Published at</dt>
        <dd>
          {{ date(book.releasedOn) }}
        </dd>
      </div>
      <div v-if="book.language" class="small">
        <dt>Language</dt>
        <dd>
          <entity-language-link :language="book.language" />
        </dd>
      </div>
      <div v-if="book.identifier?.isbn" class="small">
        <dt>ISBN</dt>
        <dd>
          {{ book.identifier.isbn }}
        </dd>
      </div>
      <div v-if="book.pageCount" class="small">
        <dt>Page count</dt>
        <dd>
          {{ book.pageCount }}
        </dd>
      </div>
      <div v-if="book.genres && book.genres.length >= 1" class="small">
        <dt>Genre</dt>
        <dd>
          <entity-tags-links :tags="book.genres" short />
        </dd>
      </div>
      <div v-if="book.tags && book.tags.length >= 1" class="small">
        <dt>Tags</dt>
        <dd>
          <entity-tags-links :tags="book.tags" short />
        </dd>
      </div>
    </dl>
    <dl class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="small">
        <dt>Abstract</dt>
        <dd
          v-if="book.description"
          class="word-wraping"
          v-html="book.description"
        ></dd>
        <dd v-else class="word-wraping italic">No abstract.</dd>
      </div>
      <div class="small">
        <dt>Formats</dt>
        <dd>
          <ul
            role="list"
            class="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li
              v-for="file in files"
              :key="file?.format"
              class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
            >
              <div class="w-0 flex-1 flex items-center">
                <svg-icon
                  :name="`format/${file?.format}`"
                  class="flex-shrink-0 h-5 w-5 text-gray-400"
                />
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
        </dd>
      </div>
    </dl>
  </div>
</template>

<style lang="css" scoped>
dt {
  @apply text-sm font-medium text-gray-500 dark:text-gray-400 text-center lg:text-left;
}
dd {
  @apply mt-1 text-sm text-gray-900 dark:text-gray-100 text-center lg:text-left;
}
.group {
  @apply grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
.small {
  @apply md:col-span-1;
}
.large {
  @apply md:col-span-2 lg:col-span-3;
}
</style>
