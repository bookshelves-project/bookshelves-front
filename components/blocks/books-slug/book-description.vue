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
        <dl
          class="space-y-8 md:grid md:gap-x-4 md:gap-y-8 md:space-y-0 md:grid-cols-2"
        >
          <div v-if="book.authors" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Authors
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <h2>
                <span
                  v-for="(author, authorId) in book.authors"
                  :key="authorId"
                  class="mr-1"
                >
                  <nuxt-link
                    :to="{
                      name: 'authors-slug',
                      params: { slug: author.slug },
                    }"
                    class="text-gray-900 transition-colors duration-100 border-b border-gray-500 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 hover:text-gray-400"
                    >{{ author.name }}</nuxt-link
                  >
                  <span
                    v-if="
                      book.authors.length > 1 &&
                      authorId !== book.authors.length - 1
                    "
                    >&</span
                  >
                </span>
              </h2>
            </dd>
          </div>
          <div v-if="book.serie" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Serie
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <h2>
                <nuxt-link
                  :to="{
                    name: 'series-slug',
                    params: {
                      author: book.serie.author,
                      slug: book.serie.slug,
                    },
                  }"
                  class="text-gray-900 transition-colors duration-100 border-b border-gray-500 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 hover:text-gray-400"
                  >{{ book.serie.title }}</nuxt-link
                >
                (vol. {{ book.serieVolume }})
              </h2>
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
              <!-- <img :src="book.language.flag" :alt="book.language.slug" /> -->
              {{ $getLanguage(book.language) }}
            </dd>
          </div>
          <div
            v-if="book.identifier.isbn || book.identifier.isbn13"
            class="sm:col-span-1"
          >
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Identifiers
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              <ul>
                <li v-if="book.identifier.isbn">
                  ISBN: {{ book.identifier.isbn }}
                </li>
                <li v-if="book.identifier.isbn13">
                  ISBN13: {{ book.identifier.isbn13 }}
                </li>
              </ul>
            </dd>
          </div>
          <div v-if="book.pageCount" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-500">
              Page count
            </dt>
            <dd
              class="flex items-center mt-1 text-sm text-gray-900 dark:text-gray-100"
            >
              {{ book.pageCount }}
            </dd>
          </div>
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
              class="mt-1 text-sm text-gray-900 dark:text-gray-100 word-wraping"
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
