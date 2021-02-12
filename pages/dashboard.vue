<template>
  <div class="container max-w-7xl">
    <section-heading
      title="Dashboard"
      :subtitle="`Welcome ${this.$auth.user.name}`"
      :image="$auth.$state.user.profile_photo_url"
    />
    <div
      class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2"
    >
      <div class="space-y-6 xl:col-start-1 xl:col-span-1">
        <favorites-list :books="books" />
      </div>

      <comments-list :comments="comments" />
    </div>
    <div
      class="grid grid-cols-1 space-y-4 lg:space-y-0 lg:space-x-4 lg:grid-cols-2"
    ></div>
  </div>
</template>

<script>
import CommentsList from '~/components/blocks/dashboard/comments-list.vue'
import FavoritesList from '~/components/blocks/dashboard/favorites-list.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'

export default {
  name: 'Dashboard',
  components: { sectionHeading, FavoritesList, CommentsList },
  middleware: 'auth',
  async asyncData({ app, query, error, params, $content, $auth, store }) {
    try {
      const [books, comments] = await Promise.all([
        app.$axios.$get(`/api/favorite/book`),
        app.$axios.$get(`/api/comments/by-user/${$auth.$state.user.id}`),
      ])
      return {
        books: books.data,
        comments: comments.data,
      }
    } catch (error) {
      console.error(error)

      return {
        books: {},
      }
    }
  },
  head() {
    const title = 'Dashboard'
    const description = 'An overview of all your activities on Bookshelves.'
    const image = `${process.env.BASE_URL}/open-graph.png`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/dashboard`,
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
