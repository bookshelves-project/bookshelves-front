<script setup lang="ts">
import AppHeader from '@/components/app/header.vue'
import UserDataList from '@/components/user/data/list.vue'

const { nuxtAsyncData } = useHttp()
const route = useRoute()

const user = ref<User>()
const title = ref('Profile of ')

await nuxtAsyncData<User>('/users', [route.params.slug]).then((e) => {
  user.value = e
  title.value = e.name
})

useMetadata({
  title: title.value
})
</script>

<template>
  <main class="main-content">
    <app-header
      v-if="user"
      :title="title"
      :image="user.avatar"
      :text="user.about"
    />
    <div
      v-if="user"
      class="grid items-start grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8"
    >
      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <user-data-list
          v-if="user.display_favorites"
          endpoint="/users/favorites"
          title="Favorites list"
          subtitle="All your favorites will be here."
          empty="Your favorite list is empty, try to favorite any book, series or author."
          icon="heart"
        />
        <div v-else class="italic text-gray-400 dark:text-gray-500">
          {{ user.name }} don't want to show favorites.
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 xl:col-span-1">
        <user-data-list
          v-if="user.display_reviews"
          endpoint="/users/reviews"
          title="Reviews list"
          subtitle="All your reviews will be here."
          empty="Your reviews list is empty, try to review any book, series or author."
          icon="review"
        />
        <div v-else class="italic text-gray-400 dark:text-gray-500">
          {{ user.name }} don't want to show review.
        </div>
      </div>
    </div>
  </main>
</template>
