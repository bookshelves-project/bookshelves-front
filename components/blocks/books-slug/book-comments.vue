<template>
  <section aria-labelledby="notes-title">
    <div
      class="bg-white shadow dark:bg-gray-800 sm:rounded-lg sm:overflow-hidden"
    >
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div class="px-4 py-5 sm:px-6">
          <h2
            id="notes-title"
            class="text-lg font-medium text-gray-900 dark:text-gray-100"
          >
            Comments
          </h2>
        </div>
        <div class="px-4 py-6 sm:px-6">
          <transition name="fade">
            <ul v-if="commentsList.length > 0" class="space-y-8">
              <li v-for="comment in commentsList" :key="comment.id">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="w-10 h-10 rounded-full"
                      :src="comment.user.picture"
                      :alt="comment.user.name"
                    />
                  </div>
                  <div>
                    <div class="text-sm">
                      <span
                        class="font-medium text-gray-900 dark:text-gray-100"
                      >
                        {{ comment.user.name }}
                      </span>
                    </div>
                    <!-- <div v-if="comment.rating" class="flex items-center mt-1">
                      <icon-star
                        v-for="i in comment.rating"
                        :key="i.id"
                        class="text-yellow-400"
                      />
                    </div> -->
                    <div
                      :ref="comment.id"
                      class="mt-1 text-sm text-gray-700 dark:text-gray-300 light-md"
                      v-html="$overflow(comment.text, 300)"
                    ></div>
                    <button
                      v-if="comment.text.length > 300"
                      class="mt-2 font-semibold text-primary-600"
                      @click="displayCommentText(comment.id, comment.text)"
                    >
                      See more
                    </button>
                    <div class="flex items-center mt-2 space-x-2 text-sm">
                      <span class="font-medium text-gray-500"
                        >{{
                          getDate(comment.createdAt, comment.updatedAt)
                            .daysDiff
                        }}d ago</span
                      >
                      <button
                        v-if="
                          $auth.$state.loggedIn &&
                          comment.user.id === $auth.$state.user.data.id
                        "
                        class="text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-300"
                        title="Delete"
                        @click="deleteComment(comment.id)"
                      >
                        <icon-trash class="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else class="italic text-gray-400">No comments available</div>
          </transition>
        </div>
      </div>
      <div
        class="px-4 py-6 border-t border-transparent bg-gray-50 dark:bg-gray-800 dark:border-gray-700 sm:px-6"
      >
        <transition name="fade">
          <div v-if="$auth.$state.loggedIn" class="flex space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                :src="$auth.$state.user.data.avatar"
                alt="avatar"
              />
            </div>
            <div class="flex-1 min-w-0">
              <form @submit.prevent="submit">
                <div>
                  <label for="text" class="sr-only">About</label>
                  <textarea
                    id="text"
                    v-model="form.text"
                    name="text"
                    rows="3"
                    maxlength="1500"
                    class="block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-200 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Add a comment*"
                  ></textarea>
                  <div class="ml-1 text-sm text-gray-400">
                    {{ form.text.length }}/1500
                  </div>
                </div>
                <!-- <div class="mt-3 mb-5">
                  <div class="mt-1">
                    <select
                      id="rating"
                      v-model="form.rating"
                      name="rating"
                      autocomplete="rating"
                      :class="
                        form.rating === null
                          ? 'italic text-gray-400'
                          : 'not-italic text-gray-900'
                      "
                      class="block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option
                        disabled
                        hidden
                        value="null"
                        class="italic text-gray-400"
                      >
                        Select a rating (optional)
                      </option>
                      <option
                        v-for="i in 5"
                        :key="i.id"
                        class="not-italic text-gray-900"
                      >
                        {{ i }}
                      </option>
                    </select>
                  </div>
                </div> -->
                <div class="flex items-center justify-between mt-3">
                  <a
                    href="https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-start space-x-2 text-sm text-gray-500 group hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <!-- Heroicon name: solid/question-mark-circle -->
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span> You can use GitHub flavored Markdown. </span>
                  </a>
                  <button
                    type="submit"
                    :class="
                      form.text === ''
                        ? 'bg-primary-400 text-gray-300 cursor-not-allowed'
                        : 'hover:bg-primary-700 bg-primary-600 text-white'
                    "
                    class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    :disabled="form.text === ''"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-else class="text-gray-400">
            You must be logged in to post a comment
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import IconTrash from '~/components/icons/icon-trash.vue'
export default {
  name: 'BookComments',
  components: { IconTrash },
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      commentsList: [],
      form: {
        text: '',
        rating: null,
      },
      error: null,
    }
  },
  created() {
    this.commentsList = this.book.comments
  },
  methods: {
    displayCommentText(refId, originalText) {
      this.$refs[refId][0].innerHTML = originalText
    },
    getDate(createdDate, updatedDate) {
      // the param is raw DateTime from API like 2020-10-16T08:18:49.000000Z
      // convert date to JS Date
      // example here date param is '2020-10-16T08:18:49.000000Z'
      createdDate = new Date(createdDate)
      updatedDate = new Date(updatedDate)
      let dateOfUpdate = new Date()
      const today = new Date()
      const date = createdDate
      const differenceBetweenCreatedUpdated = createdDate - updatedDate
      if (isNaN(differenceBetweenCreatedUpdated)) {
        dateOfUpdate = createdDate
      } else {
        dateOfUpdate = updatedDate
      }
      const difference = today - dateOfUpdate
      let diffD = 0
      if (!isNaN(difference)) {
        diffD = Math.floor((today - dateOfUpdate) / (1000 * 60 * 60 * 24))
        diffD = diffD.toString()
        diffD = diffD.replace('-', '')
      }

      // define options
      let userLang = 'en'
      // for Nuxt
      if (process.client) {
        userLang = navigator.language || navigator.userLanguage
      }

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const dateOptions = {
        year: 'numeric',
        // weekday: 'long',
        month: 'long',
        day: 'numeric',
      }
      // eslint-disable-next-line no-unused-vars
      const hoursOptions = {
        // timeZone: 'UTC',
        timeZone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }

      const dateToStringLocale = date.toLocaleString(userLang, dateOptions)
      const timeToStringLocale = date.toLocaleTimeString()

      const dateTime = {
        date: dateToStringLocale,
        time: timeToStringLocale,
      }

      return { daysDiff: diffD, dateTime }
    },
    async submit() {
      const slug = this.$route.params.slug
      try {
        await this.$axios.$post(`/comments/store/book/${slug}`, this.form)
        this.form.text = ''
        this.form.rating = null
      } catch (error) {
        this.error = error.response.data
        this.$store.commit('setAlertMessage', {
          type: 'warning',
          title: error.response.data.error,
          message: 'Delete or edit previous comment.',
        })
        this.$store.commit('toggleShowAlert')
        setTimeout(() => {
          this.$store.commit('setShowAlert', false)
        }, 3000)
      }
      try {
        const comments = await this.$axios.$get(`/comments/book/${slug}`)
        this.commentsList = comments.data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment(idOfCommentToDelete) {
      const comments = this.commentsList.filter(
        (comment) => comment.id !== idOfCommentToDelete
      )
      this.commentsList = comments

      try {
        await this.$axios.$post(`/comments/destroy/${idOfCommentToDelete}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.light-md {
  & /deep/ p {
    @apply my-4;
  }
}
</style>
