<template>
  <div>
    <div class="relative">
      <main class="xl:grid xl:grid-cols-2 xl:relative">
        <div class="xl:col-span-1">
          <div class="px-4 mt-10 sm:px-8 xl:pr-16">
            <div class="mx-auto xl:mx-0 max-w-prose">
              <h1
                class="text-4xl font-extrabold tracking-tight text-center text-gray-900 xl:text-left sm:text-5xl md:text-6xl xl:text-5xl xl:text-6xl"
              >
                <span class="block xl:inline">Welcome on</span>
                <span class="block text-indigo-600 xl:inline">Bookshelves</span>
              </h1>
              <p
                class="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div class="mt-10 sm:flex sm:justify-center xl:justify-start">
                <div class="rounded-md shadow">
                  <a
                    href="#"
                    class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Discover collection
                  </a>
                </div>
              </div>
            </div>
            <div class="mx-auto mt-24 mb-20 prose prose-lg">
              <nuxt-content :document="welcome" />
            </div>
          </div>
        </div>
        <div class="xl:col-span-1">
          <design-xl />
        </div>
      </main>
    </div>

    <div class="bg-indigo-800">
      <div
        class="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 xl:px-8 xl:py-20"
      >
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            A big collection of eBooks
          </h2>
          <p class="mt-3 text-xl text-indigo-200 sm:mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus repellat laudantium.
          </p>
        </div>
        <dl
          class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8"
        >
          <div class="flex flex-col">
            <dt
              class="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200"
            >
              eBooks
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              {{ booksCount }}
            </dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt
              class="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200"
            >
              Series
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              {{ seriesCount }}
            </dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt
              class="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200"
            >
              Authors
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-white">
              {{ authorsCount }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
import designXl from '~/components/blocks/design-xl.vue'
export default {
  name: 'Home',
  components: { designXl },
  auth: 'auth',
  layout: 'auth',
  async asyncData({ app, query, error, $content, store }) {
    try {
      const welcome = await $content('welcome').fetch()

      // const booksStore = store.state.books
      // if (booksStore.length < 1) {
      //   const page = query.page
      const [booksCount, seriesCount, authorsCount] = await Promise.all([
        app.$axios.$get('/books/count'),
        app.$axios.$get('/series/count'),
        app.$axios.$get('/authors/count'),
      ])
      // } else {
      //   console.log('detect books in store!')
      // }

      //   const posts = await app.$axios.$get(
      //   `/blog/posts?${qs.stringify({
      //     page: page || 1,
      //     perPage: 6
      //   })}`
      // )
      // return {
      // posts: posts.data,
      // pages: posts.meta.pagination.total_pages,
      // currentPage: posts.meta.pagination.current_page
      // }

      return {
        welcome,
        booksCount,
        seriesCount,
        authorsCount,
      }
    } catch (error) {
      console.error(error)

      return {
        welcome: {},
      }
    }
  },
  data() {
    return {
      pinnedProjectDropdownOpened: false,
      projectDropdownOpened: false,
      // old
      isLoading: false,
      apiData: null,
      menuIsOpen: false,
      profileDropdownIsOpen: false,
      layerMenuIsDisplayed: false,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
