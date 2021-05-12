<template>
  <div class="mt-6">
    <form
      class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      @submit.prevent="sumbit"
    >
      <div class="sm:col-span-2">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            maxlength="100"
            autocomplete="name"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-300 dark:border-gray-300"
            required
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            maxlength="100"
            autocomplete="email"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm dark:bg-gray-300 dark:border-gray-300 focus:ring-primary-600 focus:border-primary-600"
            required
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="message"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message<span class="text-red-600">*</span>
        </label>
        <div class="mt-1">
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            rows="4"
            class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-300 dark:border-gray-300"
            minlength="25"
            maxlength="1500"
            required
          ></textarea>
          <div class="flex justify-between ml-1 text-sm text-gray-400">
            <span>Min. 25 characters</span>
            <span>Currently {{ form.message.length }}/1500</span>
          </div>
        </div>
      </div>
      <div class="hidden sm:col-span-2">
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id="conditions"
              v-model="form.honeypot"
              name="conditions"
              type="checkbox"
              class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-600"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="conditions" class="font-medium text-gray-700"
              >Accept conditions</label
            >
            <p class="text-gray-500">
              Accept conditions about data privacy about Bookshelves to send
              your message to Bookshelves Team.
            </p>
          </div>
        </div>
      </div>
      <div class="sm:col-span-2">
        <div class="flex items-center space-x-2">
          <button
            class="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            type="submit"
          >
            <transition name="fade">
              <div v-if="!loading" class="flex items-center space-x-2">
                <svg-icon name="airplane" class="w-5 h-5" />
                <div>Let's talk</div>
              </div>
              <div v-else class="flex items-center space-x-1">
                <icon-load class="w-5 h-5 text-white" />
                <div>Processing</div>
              </div>
            </transition>
          </button>
          <button
            v-if="isDev"
            type="button"
            class="flex items-center px-3 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-600"
            @click="fillForm"
          >
            <svg-icon name="test" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      loading: false,
      success: false,
      errors: false,
      isDev: process.env.NODE_ENV !== 'production',
      form: {
        name: '',
        email: '',
        message: '',
        honeypot: false,
      },
      formTesting: {
        name: 'Ewilan',
        email: 'ewilan@dotslashplay.it',
        message:
          'Dolor pariatur exercitation duis dolore eu ut commodo quis incididunt ad voluptate sit. Do est nulla adipisicing ut dolore amet dolore nostrud labore. Magna laborum aliqua duis eiusmod quis aliquip officia veniam adipisicing est magna nostrud culpa. Laborum nisi nisi sit Lorem fugiat aute deserunt ea reprehenderit sint sint nulla ad labore.',
        honeypot: false,
      },
    }
  },
  mounted() {
    if (this.$auth.$state.loggedIn) {
      this.form.name = this.$auth.$state.user.data.name
      this.form.email = this.$auth.$state.user.data.email
    }
  },
  methods: {
    fillForm() {
      for (const [key] of Object.entries(this.form)) {
        this.form[key] = this.formTesting[key]
      }
    },
    async sumbit() {
      this.loading = true

      try {
        if (!this.form.honeypot) {
          await this.$axios.post('/submission', this.form)
        }

        this.success = true
        this.errors = false
        this.form = {
          name: '',
          email: '',
          message: '',
          honeypot: false,
        }

        const title = 'Message sended!'
        const message = 'Thanks you for your message.'
        this.$store.commit('setAlertMessage', {
          type: 'success',
          title,
          message,
        })
        this.$store.commit('overlay/setIsVisible', true)
        this.$store.commit('modal/setIsVisible', true)
        setTimeout(() => {
          this.$store.commit('overlay/setIsVisible', false)
          this.$store.commit('modal/setIsVisible', false)
        }, 2500)
      } catch (e) {
        // console.error(e)
        this.errors = true
        const title = 'Error!'
        const message =
          "We are sorry but your message can't be send, try in some time."
        this.$store.commit('setAlertMessage', {
          type: 'danger',
          title,
          message,
        })
        this.$store.commit('overlay/setIsVisible', true)
        this.$store.commit('modal/setIsVisible', true)
        setTimeout(() => {
          this.$store.commit('overlay/setIsVisible', false)
          this.$store.commit('modal/setIsVisible', false)
        }, 2500)
      }
      this.loading = false
    },
  },
}
</script>

<style lang="postcss" scoped></style>
