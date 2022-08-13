<script setup lang="ts">
defineProps<{
  book: Book
}>()

const { date } = useDate()
</script>

<template>
  <div
    class="col-span-2 order-1 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 lg:pb-2 lg:pr-8"
  >
    <div class="flex flex-col h-full">
      <div>
        <div>
          <h3 class="sr-only">
            Abstract
          </h3>

          <div class="space-y-6">
            <div
              v-if="book.description"
              class="text-sm text-gray-900 dark:text-gray-100 word-wraping"
              v-html="book.description"
            />
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
                  <span v-if="book.releasedOn">({{ date(book.releasedOn) }})</span>
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
      <entity-book-overview-files :files="book.files" />
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
</style>
