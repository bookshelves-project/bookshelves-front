<template>
  <main class="container relative max-w-7xl">
    <section-heading
      :title="`${title} ${currentBook.title}`"
      :subtitle="description"
    />
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="book in books"
            :key="book.id"
            :cover="book.picture.base"
            :color="book.picture.color"
            :title="book.title"
            :route="{
              name: `${book.meta.entity}s-slug`,
              params: {
                author: book.meta.author,
                slug: book.meta.slug,
              },
            }"
          >
            <template #primary>
              {{ $overflow(book.title, 50) }}
            </template>
            <template #secondary>
              <div v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  &
                </span>
              </div>
            </template>
            <template #tertiary>
              {{ capitalize(book.meta.entity) }}
            </template>
          </entity-card>
        </div>
      </div>
    </section>
    <api-error-message v-else />
  </main>
</template>

<script>
import EntityCard from '~/components/blocks/entity-card.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'
import {
  formatLanguage,
  objectIsEmpty,
  getAuthors,
  capitalize,
} from '~/plugins/utils/methods'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

export default {
  name: 'PageRelatedSlug',
  components: { sectionHeading, EntityCard },
  async asyncData({ app, params }) {
    try {
      const [currentBook, books] = await Promise.all([
        app.$axios.$get(`/books/${params.author}/${params.slug}`),
        app.$axios.$get(`/books/related/${params.author}/${params.slug}`),
      ])

      return {
        currentBook: currentBook.data,
        books: books.data,
        apiError: false,
      }
    } catch (error) {
      console.error(error)
      return {
        apiError: true,
      }
    }
  },
  data() {
    return {
      formatLanguage,
      objectIsEmpty,
      getAuthors,
      capitalize,
      title: `Related books & series for `,
      description: `List of all results for related books & series...`,
    }
  },
  head() {
    const title = `${this.title} ${this.currentBook.title}`
    const url = `${this.$config.baseURL}/${this.$nuxt.$route.path}`
    const dynamicMeta = dynamicMetadata({
      title: this.title,
      description: this.description,
      url,
    })
    return {
      title,
      meta: [...dynamicMeta],
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
}
</script>
