<template>
  <div class="md:flex p-4 md:p-0 h-full slider-card">
    <div>
      <app-img
        class="
          w-32
          h-32
          md:w-64
          mx-auto
          md:h-full md:rounded-none
          rounded-full
          object-cover object-top
          cover
        "
        :src="book.cover.original"
        :color="book.cover.color"
        :title="book.title"
      />
    </div>
    <div
      class="
        pt-6
        md:p-5
        text-center
        md:text-left
        space-y-4
        w-full
        dark:text-gray-100
      "
    >
      <div>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Title
        </span>
        <h3 class="font-semibold text-black">
          {{ book.title }}
        </h3>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Authors
        </span>
        <h3 class="font-semibold">
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
              class="
                text-gray-900
                transition-colors
                duration-100
                border-b border-gray-500
                dark:border-gray-100 dark:hover:border-gray-400
                hover:border-gray-400 hover:text-gray-400
              "
              >{{ author.name }}</nuxt-link
            >
            <span
              v-if="
                book.authors.length > 1 && authorId !== book.authors.length - 1
              "
              >&</span
            >
          </span>
        </h3>
      </div>
      <div v-if="book.volume">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
          >Volume
        </span>
        <h3 class="font-semibold text-black">
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
          >Refer to {{ book.meta.entity }}</app-button
        >
        <span v-else class="italic text-gray-500 dark:text-gray-400"
          >Current page</span
        >
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
