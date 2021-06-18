<template>
  <main class="container relative max-w-7xl">
    <section-heading
      :title="`${title} ${publisher.name}`"
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
              name: `books-slug`,
              params: { author: book.meta.author, slug: book.meta.slug },
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
              <div v-if="book.serie" class="italic">
                {{ book.serie.title }},<br />
                vol. {{ book.volume }}
              </div>
              <div class="mt-1">
                {{ getLanguage(book.language) }}
              </div>
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
import { getLanguage, getAuthors } from '~/plugins/utils/methods'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

export default {
  name: 'PageRelatedSlug',
  components: { sectionHeading, EntityCard },
  async asyncData({ app, params }) {
    try {
      const [publisher, books] = await Promise.all([
        app.$axios.$get(`/publishers/${params.slug}`),
        app.$axios.$get(`/publishers/books/${params.slug}`),
      ])

      return {
        publisher: publisher.data,
        books: books.data,
        apiError: false,
      }
    } catch (error) {
      return {
        apiError: true,
      }
    }
  },
  data() {
    return {
      getLanguage,
      getAuthors,
      title: `Books published by `,
      description: `List of all books for publisher`,
    }
  },
  head() {
    const title = `${this.title} ${this.publisher.name}`
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
