<template>
  <div class="p-2">
    <transition name="fade">
      <div v-if="$auth.$state.loggedIn" class="flex space-x-3">
        <div class="shrink-0 hidden md:block">
          <app-img
            :src="$auth.$state.user.data.avatar"
            class="w-10 h-10"
            override="rounded-full"
            :alt="$auth.$state.user.data.username"
          />
        </div>
        <div class="flex-1 min-w-0">
          <form @submit.prevent="submit">
            <field-text-input
              id="text"
              v-model="form.text"
              name="text"
              rows="3"
              maxlength="1500"
              placeholder="Add a comment*"
              multiline
            ></field-text-input>
            <field-rating-stars
              v-if="$config.moduleSocialRating"
              v-model="form.rating"
              class="mt-1 mb-1"
            />
            <div class="flex items-center justify-between mt-1">
              <a
                href="https://www.markdownguide.org/cheat-sheet/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-start space-x-2 text-sm text-gray-500 group hover:text-gray-900 dark:hover:text-gray-100"
              >
                <svg-icon
                  name="question-mark-circle"
                  class="shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                />
                <span>You can use Markdown.</span>
              </a>
              <button
                type="submit"
                :class="
                  form.text === ''
                    ? 'bg-primary-400 text-gray-300 cursor-not-allowed'
                    : 'hover:bg-primary-600 bg-primary-600 text-white'
                "
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
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
        rating: 0,
      },
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
        this.$nuxt.$emit('toast', {
          title: 'Success!',
          text: 'Thanks you for your comment.',
          type: 'success',
        })
      } catch (error) {
        this.$nuxt.$emit('toast', {
          title: 'Error',
          text: error.response.data.error,
          type: 'error',
        })
      }
      this.$emit('refresh', slug)
    },
  },
}
</script>
