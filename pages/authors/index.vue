<template>
  <main class="container max-w-7xl">
    <section-heading :title="title" :subtitle="description" />
    <section v-if="!apiError">
      <div>
        <div class="space-y-6 display-grid sm:space-y-0">
          <entity-card
            v-for="(author, authorId) in authors.data"
            :key="authorId"
            :cover="author.picture.base"
            :image-alt="author.name"
            :route="{
              name: 'authors-slug',
              params: { slug: author.slug },
            }"
          >
            <template #primary>
              {{ author.lastname }} {{ author.firstname }}
            </template>
            <template #secondary> {{ author.booksNumber }} books </template>
          </entity-card>
        </div>
      </div>
      <div class="mt-6 mb-5">
        <pagination
          :link-gen="linkGen"
          :pages="pages"
          :current-page="currentPage"
          :limit="5"
          class="flex justify-center"
          @event="event"
        >
        </pagination>
      </div>
    </section>
    <api-error-message v-else />
  </main>
</template>

<script>
import qs from 'qs'

import Pagination from '~/components/special/pagination.vue'
import EntityCard from '~/components/blocks/entity-card.vue'
import SectionHeading from '~/components/blocks/section-heading.vue'
import ApiErrorMessage from '~/components/special/api-error-message.vue'
import dynamicMetadata from '~/plugins/utils/dynamic-metadata'

export default {
  name: 'AuthorsIndex',
  components: { Pagination, EntityCard, SectionHeading, ApiErrorMessage },
  async asyncData({ app, query }) {
    try {
      const page = query.page
      const [authors] = await Promise.all([
        app.$axios.$get(
          `/authors?${qs.stringify({
            page: page || 1,
            'per-page': 32,
          })}`
        ),
      ])

      return {
        authors,
        pages: authors.meta.last_page,
        currentPage: authors.meta.current_page,
        perPage: authors.meta.per_page,
        total: authors.meta.total,
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
      componentKey: 0,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      title: `Authors`,
      description: `Want to find all books written by specific author?`,
    }
  },
  head() {
    const title = this.title
    const url = `${process.env.BASE_URL}/authors`
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
  jsonld() {
    const breadcrumbs = [
      {
        url: process.env.BASE_URL,
        text: 'Home',
      },
      {
        url: `${process.env.BASE_URL}/authors`,
        text: 'Authors',
      },
    ]
    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      itemListElement: items,
    }
  },
  watchQuery: ['page'],
  methods: {
    linkGen(pageNum) {
      // this.componentKey += 1
      return {
        name: this.$route.name,
        query: pageNum === 1 ? {} : { page: pageNum },
      }
    },
    event(data) {
      this.componentKey += 1
    },
  },
}
</script>
