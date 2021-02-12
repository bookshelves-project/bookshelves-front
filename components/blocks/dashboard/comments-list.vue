<template>
  <div class="bg-white rounded-md shadow dark:bg-gray-800">
    <div
      class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6 rounded-t-md"
    >
      <h3 class="flex items-center text-lg font-medium leading-6 text-gray-900">
        Comments list
      </h3>
      <p class="mt-1 text-sm text-gray-500">All your comments will be here.</p>
    </div>
    <div class="p-3 lg:p-5">
      <transition name="fade">
        <div v-if="commentsList.length > 0">
          <div
            v-for="comment in commentsList"
            :key="comment.id"
            class="relative flex items-center justify-between p-2 text-gray-900 transition-colors duration-100 rounded-md dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50"
          >
            <nuxt-link
              :to="{
                name: 'books-slug',
                params: {
                  author: comment.book.author,
                  slug: comment.book.slug,
                },
              }"
              class="relative flex items-center w-full"
            >
              <div>
                <div class="flex items-center">
                  <img
                    v-lazy="comment.book.cover"
                    alt="Book cover"
                    class="object-cover object-center w-8 h-8 rounded-sm shadow"
                  />
                  <div class="ml-1 font-semibold">
                    {{ comment.book.title }}
                  </div>
                </div>
                <div class="flex mt-2">
                  <icon-star
                    v-for="i in comment.rating"
                    :key="i.id"
                    class="text-yellow-500"
                  />
                </div>
                <div
                  class="flex w-full overflow-hidden italic text-gray-700 transition-colors duration-100"
                >
                  <span
                    class="w-full"
                    v-html="`${$overflow(comment.text, 250)}`"
                  ></span>
                </div>

                <div
                  class="items-center hidden mt-2 text-sm text-gray-400 md:flex"
                >
                  <div>
                    {{ $getDate(comment.createdAt) }}
                  </div>
                  <div v-if="comment.createdAt !== comment.updatedAt">
                    {{ $getDate(comment.updatedAt) }}
                  </div>
                </div>
              </div>
            </nuxt-link>
            <button
              class="p-4 text-gray-400 hover:text-gray-500"
              title="Delete"
              @click="deleteFavorite('book', comment.id)"
            >
              <icon-trash />
            </button>
          </div>
        </div>
        <div v-else class="flex flex-wrap items-center text-gray-400">
          <div>Your favorite list is empty, try to favorite any book with</div>
          <div>
            <icon-heart class="ml-1" :is-full="true" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import IconStar from '~/components/icons/icon-star.vue'
import IconTrash from '~/components/icons/icon-trash.vue'
export default {
  name: 'CommentsList',
  // eslint-disable-next-line vue/no-unused-components
  components: { IconTrash, IconStar },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      commentsList: [],
    }
  },
  mounted() {
    this.commentsList = this.comments
  },
  methods: {
    async deleteFavorite(model, slug) {
      const comments = this.commentsList.filter((book) => book.slug !== slug)
      this.commentsList = comments
      try {
        await this.$axios.$post(
          `/api/comments/by-user/${this.$auth.$state.user.id}`
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
