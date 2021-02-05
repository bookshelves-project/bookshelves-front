<template>
  <section aria-labelledby="applicant-information-title">
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2
          id="applicant-information-title"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Description
        </h2>
      </div>
      <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Author</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="book.author">
                {{ book.author.lastname }}, {{ book.author.firstname }}
              </span>
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Publishing</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="book.publisher"
                >{{ book.publisher.name }} ({{
                  $getDate(book.publishDate)
                }})</span
              >
              <span v-else class="italic text-gray-400">Undefined</span>
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Language</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <img
                v-if="book.language"
                :src="book.language.flag"
                :alt="book.language.slug"
              />
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Identifiers</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <transition name="fade">
                <span v-if="book.isbn">
                  <div v-if="!isbnResult">
                    {{ book.isbn }}
                  </div>
                  <div v-else>
                    <div v-if="isbnResult.identifiers">
                      <div v-if="isbnResult.identifiers.isbn13">
                        ISBN 13: {{ isbnResult.identifiers.isbn13.identifier }}
                      </div>
                      <div v-if="isbnResult.identifiers.isbn10">
                        ISBN 10: {{ isbnResult.identifiers.isbn10.identifier }}
                      </div>
                    </div>
                    <span v-else class="italic text-gray-400">Undefined</span>
                  </div>
                </span>
                <span v-else class="italic text-gray-400">Undefined</span>
              </transition>
            </dd>
          </div>
          <div v-if="isbnResult" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Rating</dt>
            <dd class="flex items-center mt-1 text-sm text-gray-900">
              {{ isbnResult.rating }}
            </dd>
          </div>
          <div v-if="isbnResult" class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Page count</dt>
            <dd class="flex items-center mt-1 text-sm text-gray-900">
              {{ isbnResult.pageCount }}
            </dd>
          </div>
          <div v-if="book.description" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Abstract</dt>
            <dd
              class="mt-1 text-sm text-gray-900"
              v-html="book.description"
            ></dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
import isbnTool from 'node-isbn'

export default {
  name: 'BookDescription',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isbnResult: null,
    }
  },
  mounted() {
    this.checkIsbn()
  },
  methods: {
    async checkIsbn() {
      if (this.book.isbn) {
        let isbnFormat = this.book.isbn
        isbnFormat = isbnFormat.replaceAll('-', '')

        const isbnResult = await isbnTool
          .resolve(isbnFormat)
          .then(function (book) {
            return book
          })
          .catch(function (err) {
            console.error('Book not found', err)
            return null
          })
        let isbnObject = null

        if (isbnResult !== null) {
          isbnObject = {
            thumbnail: isbnResult.imageLinks
              ? isbnResult.imageLinks.thumbnail
              : null,
            identifiers: {
              isbn13: isbnResult.industryIdentifiers[0]
                ? isbnResult.industryIdentifiers[0]
                : null,
              isbn10: isbnResult.industryIdentifiers[1]
                ? isbnResult.industryIdentifiers[1]
                : null,
            },
            link: isbnResult.infoLink ? isbnResult.infoLink : null,
            rating: isbnResult.maturityRating
              ? isbnResult.maturityRating
              : null,
            pageCount: isbnResult.pageCount ? isbnResult.pageCount : null,
            publishedDate: isbnResult.publishedDate
              ? isbnResult.publishedDate
              : null,
            publisher: isbnResult.publisher ? isbnResult.publisher : null,
          }
        }
        this.isbnResult = isbnObject
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
