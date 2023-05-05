<script setup lang="ts">
defineProps<{
  post: Post
}>()

const { date } = useDate()
</script>

<template>
  <typed-link
    :to="{
      name: 'guides-slug',
      params: { slug: post.meta?.slug },
    }"
    :title="post.title"
    :aria-label="post.title"
    class="relative block transition-colors duration-75 px-3 py-2 rounded-md shadow hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <div v-if="post.pin" class="pinned absolute top-0 left-0 h-12 w-12 p-1">
      <svg-icon name="star-full" class="w-5 h-5 text-gray-400" />
    </div>
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="min-w-0 flex-1 flex items-center">
        <div class="flex-shrink-0">
          <app-img :src="post.cover" :alt="`${post.title}`" class="w-12 h-12" />
        </div>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <p
              class="font-semibold text-primary-600 dark:text-primary-400 truncate"
            >
              {{ post.title }}
            </p>
            <p class="mt-2 flex items-center text-sm text-gray-500">
              <span class="truncate">
                {{ post.category }}
              </span>
            </p>
          </div>
          <div class="hidden md:block">
            <div>
              <p class="text-sm text-gray-900 dark:text-gray-100">
                Published at
                <time
                  v-if="post.publishedAt"
                  :datetime="post.publishedAt.toString()"
                >
                  {{ date(post.publishedAt) }}
                </time>
              </p>
              <p class="mt-2 flex items-center text-sm text-gray line-clamp-2">
                {{ post.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- Heroicon name: solid/chevron-right -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </typed-link>
</template>

<style scoped>
.pinned {
  clip-path: polygon(100% 0, 0% 100%, 0 0);
  @apply bg-gray-100 dark:bg-gray-700 rounded-md;
}
</style>
