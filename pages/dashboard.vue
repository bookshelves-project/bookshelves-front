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
        <data-list-template :data-list="favorites" @deleted="deleted">
          <template #title>
            <icon-heart class="text-red-600" :is-full="true" />
            <div class="ml-2">Favorites list</div>
          </template>
          <template #subtitle>
            All your favorites books will be here.
          </template>
          <template #no-data>
            Your favorite list is empty, try to favorite any book with
            <icon-heart :is-full="true" />
          </template>
          <template #content="{ data }">
            <div
              class="block w-full font-semibold transition-colors duration-100"
            >
              <span class="hidden md:block">
                {{ data.title }}
              </span>
              <span class="hidden sm:block md:hidden">
                {{ $overflow(data.title, 20) }}
              </span>
              <span class="block sm:hidden">
                {{ $overflow(data.title, 16) }}
              </span>
            </div>
            <div
              v-if="data.serie"
              class="flex-wrap items-center hidden md:flex"
            >
              <span class="mx-1">in</span>
              <div class="block transition-colors duration-100 w-max">
                {{ data.serie.title }}
              </div>
            </div>
          </template>
        </data-list-template>
      </div>
      <data-list-template
        :data-list="comments"
        :with-image="false"
        @deleted="deleted"
      >
        <template #title>
          <icon-heart class="text-red-600" :is-full="true" />
          <div class="ml-2">Comments list</div>
        </template>
        <template #subtitle> All your comments will be here. </template>
        <template #no-data>
          Your comments list is empty, try to comment any book.
        </template>
        <template #content="{ data }">
          <div>
            <div class="flex items-center">
              <img
                v-lazy="data.cover"
                alt="Book cover"
                class="object-cover object-center w-16 h-16 rounded-sm shadow"
              />
              <div class="ml-3 font-semibold">
                {{ data.book.title }}
              </div>
            </div>
            <div class="flex mt-2">
              <icon-star
                v-for="i in data.rating"
                :key="i.id"
                class="text-yellow-500"
              />
            </div>
            <div
              class="flex w-full overflow-hidden italic text-gray-700 transition-colors duration-100"
            >
              <span
                class="w-full"
                v-html="`${$overflow(data.text, 250)}`"
              ></span>
            </div>

            <div class="items-center hidden mt-2 text-sm text-gray-400 md:flex">
              <div>
                {{ $getDate(data.createdAt) }}
              </div>
              <div v-if="data.createdAt !== data.updatedAt">
                {{ $getDate(data.updatedAt) }}
              </div>
            </div>
          </div>
        </template>
      </data-list-template>
      <!-- <comments-list :comments="comments" /> -->
    </div>
    <div
      class="grid grid-cols-1 space-y-4 lg:space-y-0 lg:space-x-4 lg:grid-cols-2"
    ></div>
  </div>
</template>

<script>
import DataListTemplate from '~/components/blocks/dashboard/data-list-template.vue'
import sectionHeading from '~/components/blocks/section-heading.vue'
import IconHeart from '~/components/icons/icon-heart.vue'

import favorites from '~/mixins/favorites'
import comments from '~/mixins/comments'
import IconStar from '~/components/icons/icon-star.vue'
export default {
  name: 'Dashboard',
  components: {
    sectionHeading,
    IconHeart,
    DataListTemplate,
    IconStar,
  },
  mixins: [favorites, comments],
  middleware: 'auth',
  async asyncData({ app, query, error, params, $content, $auth, store }) {
    try {
      const [favorites, comments] = await Promise.all([
        app.$axios.$get(`/api/favorites/book`),
        app.$axios.$get(`/api/comments/by-user/${$auth.$state.user.id}`),
      ])
      return {
        favorites: favorites.data,
        comments: comments.data,
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    deleted(data) {
      console.log(data)
      this.deleteFavorite(data.model, data.slug)
    },
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
