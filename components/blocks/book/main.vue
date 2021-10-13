<template>
  <section aria-labelledby="book-main">
    <div
      class="
        space-y-8
        lg:grid lg:gap-x-4 lg:gap-y-8 lg:space-y-0 lg:grid-cols-2
        pb-6
      "
    >
      <dl
        class="
          space-y-8
          md:grid md:gap-x-4 md:gap-y-8 md:space-y-0 md:grid-cols-2
        "
      >
        <div v-if="book.authors" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
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
                  :to="
                    localePath({
                      name: 'authors-slug',
                      params: { slug: author.meta.slug },
                    })
                  "
                  class="internal-link"
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
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Serie
          </dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
            <h2>
              <nuxt-link
                :to="
                  localePath({
                    name: 'series-author-slug',
                    params: {
                      author: book.serie.meta.author,
                      slug: book.serie.meta.slug,
                    },
                  })
                "
                class="internal-link"
              >
                {{ book.serie.title }}
              </nuxt-link>
              (vol. {{ book.volume }})
            </h2>
          </dd>
        </div>
        <div v-if="book.publisher" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Publishing
          </dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
            <nuxt-link
              :to="
                localePath({
                  name: 'publishers-slug',
                  params: { slug: book.publisher.meta.slug },
                })
              "
              class="internal-link"
              >{{ book.publisher.name }}</nuxt-link
            >
            ({{ $formatDate(book.publishDate) }})
          </dd>
        </div>
        <div v-if="book.language" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Language
          </dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
            <nuxt-link
              :to="
                localePath({
                  name: 'books',
                  query: { lang: book.language },
                })
              "
              class="internal-link"
            >
              {{ formatLanguage(book.language) }}
            </nuxt-link>
          </dd>
        </div>
        <div v-if="book.identifier" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Identifiers
          </dt>
          <dd
            v-if="book.identifier.isbn || book.identifier.isbn13"
            class="mt-1 text-sm text-gray-900 dark:text-gray-100"
          >
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
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Page count
          </dt>
          <dd
            class="
              flex
              items-center
              mt-1
              text-sm text-gray-900
              dark:text-gray-100
            "
          >
            {{ book.pageCount }}
          </dd>
        </div>
        <div v-if="book.genres.length >= 1" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Genre
          </dt>
          <dd
            class="flex flex-wrap mt-1 text-sm text-gray-900 dark:text-gray-100"
          >
            <span v-for="(genre, genreId) in book.genres" :key="genreId">
              <nuxt-link
                :to="
                  localePath({
                    name: 'tags-slug',
                    params: { slug: genre.meta.slug },
                  })
                "
                class="internal-link"
                >{{ genre.name }}</nuxt-link
              ><span v-if="genreId !== book.genres.length - 1" class="mr-1"
                >,</span
              >
            </span>
          </dd>
        </div>
        <div v-if="book.tags.length >= 1" class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Tags
          </dt>
          <dd
            class="flex flex-wrap mt-1 text-sm text-gray-900 dark:text-gray-100"
          >
            <span v-for="(tag, tagId) in book.tags" :key="tagId">
              <nuxt-link
                :to="
                  localePath({
                    name: 'tags-slug',
                    params: { slug: tag.meta.slug },
                  })
                "
                class="internal-link"
                >{{ tag.name }}</nuxt-link
              ><span v-if="tagId !== book.tags.length - 1" class="mr-1">,</span>
            </span>
          </dd>
        </div>
      </dl>
      <dl>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Abstract
          </dt>
          <dd
            v-if="book.description"
            class="mt-1 text-sm text-gray-900 dark:text-gray-100 word-wraping"
            v-html="book.description"
          ></dd>
          <dd
            v-else
            class="
              mt-1
              text-sm text-gray-900
              dark:text-gray-100
              word-wraping
              italic
            "
          >
            No abstract.
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
import { formatLanguage } from '~/plugins/utils/methods'
export default {
  name: 'BookMain',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formatLanguage,
    }
  },
}
</script>
