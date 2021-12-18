<template>
  <div class="md:flex p-4 md:p-0 h-full slider-card">
    <div>
      <app-img
        class="w-32 h-32 md:w-64 mx-auto md:h-full md:rounded-none rounded-full object-cover object-top cover"
        :src="book.cover.original"
        :color="book.cover.color"
        :title="book.title"
      />
    </div>
    <div
      class="pt-6 md:p-5 text-center md:text-left space-y-4 w-full dark:text-gray-100"
    >
      <div>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Title
        </span>
        <h3 class="font-semibold">
          {{ book.title }}
        </h3>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Authors
        </span>
        <h3 class="font-semibold">
          <blocks-authors-links :authors="book.authors" short />
        </h3>
      </div>
      <div v-if="book.volume">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Volume
        </span>
        <h3 class="font-semibold">
          {{ book.volume }}
        </h3>
      </div>
      <div class="pt-6">
        <app-button
          v-if="$route.params.slug !== book.meta.slug"
          :color="`white`"
          :to="
            localePath({
              name: `${book.meta.entity}s-author-slug`,
              params: {
                author: book.meta.author,
                slug: book.meta.slug,
              },
            })
          "
        >
          Refer to {{ book.meta.entity }}
        </app-button>
        <span v-else class="italic text-gray-500 dark:text-gray-400">
          Current page
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
