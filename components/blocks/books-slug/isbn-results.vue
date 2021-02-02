<template>
  <section v-if="isbnResult" aria-labelledby="notes-title">
    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="items-center justify-between px-4 py-5 md:flex sm:px-6">
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">
            Google Books
          </h2>
          <div>
            <a
              :href="isbnResult.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
          </div>
        </div>
        <div class="flex px-4 py-6 sm:px-6">
          <div class="mr-5">
            <img :src="isbnResult.thumbnail" alt="" />
          </div>
          <div>
            <ul>
              <li>
                <ul>
                  <li>
                    ISBN 13: {{ isbnResult.identifiers.isbn13.identifier }}
                  </li>
                  <li>
                    ISBN 10: {{ isbnResult.identifiers.isbn10.identifier }}
                  </li>
                </ul>
              </li>
              <li>Rating: {{ isbnResult.rating }}</li>
              <li>Page count: {{ isbnResult.pageCount }}</li>
              <li>
                Published by {{ isbnResult.publihser }} at
                {{ $getDate(isbnResult.publishedDate) }}
              </li>
              <li></li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import isbnTool from 'node-isbn'

export default {
  name: 'IsbnResults',
  props: {
    bookIsbn: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isbn: null,
      isbnResult: null,
    }
  },
  async mounted() {
    await this.checkIsbn()
  },

  methods: {
    async checkIsbn() {
      if (this.bookIsbn) {
        let isbnFormat = this.bookIsbn
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
        if (isbnResult) {
          isbnObject = {
            thumbnail: isbnResult.imageLinks.thumbnail,
            identifiers: {
              isbn13: isbnResult.industryIdentifiers[0],
              isbn10: isbnResult.industryIdentifiers[1],
            },
            link: isbnResult.infoLink,
            rating: isbnResult.maturityRating,
            pageCount: isbnResult.pageCount,
            publishedDate: isbnResult.publishedDate,
            publihser: isbnResult.publisher,
          }
        }
        this.isbnResult = isbnObject
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
