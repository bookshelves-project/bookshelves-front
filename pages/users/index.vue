<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import AppImg from '@/components/app/img.vue'

const { nuxtAsyncList } = useFetchable()

const users = ref<User[]>()

await nuxtAsyncList<User>('/users').then((e) => (users.value = e.data))

const title = 'All users'
const subtitle = 'All Bookshelves users'

useMetadata({
  title: title,
  description: subtitle,
})
</script>
<template>
  <main class="main-content">
    <app-header :title="title" :subtitle="subtitle" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <nuxt-link
        v-for="user in users"
        :key="user.id"
        :to="$localePath({ name: 'users-slug', params: { slug: user.slug } })"
        class="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
      >
        <div class="shrink-0">
          <app-img
            class="h-10 w-10 rounded-full"
            :src="user.avatar"
            :color="user.color"
          />
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
            {{ user.name }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-300 truncate">
            Reviews: {{ user.reviews_count }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </main>
</template>

<!-- <template>
  <main class="main-content">
    <app-header :title="title" :subtitle="subtitle" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <nuxt-link
        v-for="user in users"
        :key="user.id"
        :to="localePath({ name: 'users-slug', params: { slug: user.slug } })"
        class="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
      >
        <div class="shrink-0">
          <app-img
            class="h-10 w-10 rounded-full"
            :src="user.avatar"
            :color="user.avatar.color"
          />
        </div>
        <div class="flex-1 min-w-0">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
            {{ user.name }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-300 truncate">
            Reviews: {{ user.reviewsCount }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'PageUsers',
  async asyncData({ app }) {
    const users = await app.$axios.$get('/users')

    return {
      users: users.data,
    }
  },
  data() {
    return {

    }
  },
}
</script> -->
