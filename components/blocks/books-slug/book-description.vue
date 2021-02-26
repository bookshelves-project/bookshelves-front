<template>
  <section aria-labelledby="applicant-information-title">
    <div class="shadow sm:rounded-lg dark:bg-gray-800">
      <div class="px-4 py-5 sm:px-6">
        <div
          id="applicant-information-title"
          class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          Description
        </div>
      </div>
      <div
        class="px-4 py-5 border-t border-gray-200 dark:border-gray-700 sm:px-6"
      >
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div v-if="book.authors" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Author
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <span v-for="(author, authorId) in book.authors" :key="authorId">
                <h2>{{ author.name }}</h2>
              </span>
            </dd>
          </div>
          <div v-if="book.serie" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Serie
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <h2>{{ book.serie.title }}, vol. {{ book.serie.number }}</h2>
            </dd>
          </div>
          <div v-if="book.publisher" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Publishing
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <span
                >{{ book.publisher.name }} ({{
                  $getDate(book.publishDate)
                }})</span
              >
            </dd>
          </div>
          <div v-if="book.language" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Language
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <img :src="book.language.flag" :alt="book.language.slug" />
            </dd>
          </div>
          <!-- <div v-if="book.isbn" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Identifiers
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <transition name="fade">
                <div v-if="!isbnResult">
                  {{ book.isbn.isbn || book.isbn.isbn13 }}
                </div>
                <div v-else>
                  <div
                    v-if="
                      isbnResult.identifiers && isbnResult.identifiers.isbn13
                    "
                  >
                    <div v-if="isbnResult.identifiers.isbn13">
                      ISBN 13: {{ isbnResult.identifiers.isbn13.identifier }}
                    </div>
                    <div v-if="isbnResult.identifiers.isbn10">
                      ISBN 10: {{ isbnResult.identifiers.isbn10.identifier }}
                    </div>
                  </div>
                  <span v-else>
                    <span v-if="book.isbn">
                      {{ book.isbn.isbn || book.isbn.isbn13 }}
                    </span>
                    <span v-else class="italic text-gray-400">Undefined</span>
                  </span>
                </div>
              </transition>
            </dd>
          </div> -->
          <!-- <div v-if="isbnResult && isbnResult.rating" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Rating
            </dt>
            <dd
              class="flex items-center mt-1 text-sm text-gray-900 dark:text-gray-100"
            >
              {{ isbnResult.rating }}
            </dd>
          </div>
          <div v-if="isbnResult && isbnResult.pageCount" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Page count
            </dt>
            <dd
              class="flex items-center mt-1 text-sm text-gray-900 dark:text-gray-100"
            >
              {{ isbnResult.pageCount }}
            </dd>
          </div> -->
          <div v-if="book.tags.length >= 1" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Tags
            </dt>
            <dd
              class="flex flex-wrap mt-1 text-sm text-gray-900 dark:text-gray-100"
            >
              <span v-for="(tag, tagId) in book.tags" :key="tagId">
                {{ tag.name
                }}<span v-if="tagId !== book.tags.length - 1" class="mr-1"
                  >,</span
                >
              </span>
            </dd>
          </div>
          <div v-if="book.description" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Abstract
            </dt>
            <dd
              class="mt-1 text-sm text-gray-900 dark:text-gray-100"
              v-html="book.description"
            ></dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BookDescription',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped></style>
