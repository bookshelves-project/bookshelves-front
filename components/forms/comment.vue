<template>
  <div class="p-2">
    <transition name="fade">
      <div v-if="$auth.$state.loggedIn" class="flex space-x-3">
        <div class="flex-shrink-0 hidden md:block">
          <app-img
            :src="$auth.$state.user.data.avatar"
            class="w-10 h-10 rounded-full"
            :alt="$auth.$state.user.data.username"
          />
        </div>
        <div class="flex-1 min-w-0">
          <form @submit.prevent="submit">
            <fields-input-text
              id="text"
              v-model="form.text"
              name="text"
              rows="3"
              maxlength="1500"
              placeholder="Add a comment*"
              multiline
            ></fields-input-text>
            <fields-rating-stars
              v-if="$config.moduleSocialRating"
              v-model="form.rating"
              class="mt-2 mb-1"
            />
            <div class="flex items-center justify-between mt-3">
              <a
                href="https://www.markdownguide.org/cheat-sheet/"
                target="_blank"
                rel="noopener noreferrer"
                class="
                  inline-flex
                  items-start
                  space-x-2
                  text-sm text-gray-500
                  group
                  hover:text-gray-900
                  dark:hover:text-gray-100
                "
              >
                <!-- Heroicon name: solid/question-mark-circle -->
                <svg
                  class="
                    flex-shrink-0
                    w-5
                    h-5
                    text-gray-400
                    group-hover:text-gray-500
                  "
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
                <span> You can use Markdown. </span>
              </a>
              <button
                type="submit"
                :class="
                  form.text === ''
                    ? 'bg-primary-400 text-gray-300 cursor-not-allowed'
                    : 'hover:bg-primary-600 bg-primary-600 text-white'
                "
                class="
                  inline-flex
                  items-center
                  justify-center
                  px-4
                  py-2
                  text-sm
                  font-medium
                  border border-transparent
                  rounded-md
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-primary-600
                "
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
</template>

<script>
export default {
  name: 'FormsComment',
  data() {
    return {
      form: {
        text: '',
        rating: 0
      }
    }
  },
  methods: {
    async submit() {
      const slug = this.$route.params.slug
      try {
        const entity = this.$route.name.split('-')[0].slice(0, -1)
        await this.$axios.$post(`/comments/store/${entity}/${slug}`, this.form)
        this.form.text = ''
        this.form.rating = 0
        this.$nuxt.$emit('notification', {
          title: 'Success!',
          text: 'Thanks you for your comment.',
          type: 'success'
        })
      } catch (error) {
        this.$nuxt.$emit('notification', {
          title: 'Error',
          text: error.response.data.error,
          type: 'error'
        })
      }
      this.$emit('refresh', slug)
    }
  }
}
</script>
