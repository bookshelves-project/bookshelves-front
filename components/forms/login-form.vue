<template>
  <form class="space-y-6" @submit.prevent="submit">
    <div v-if="isDev">
      <button
        type="button"
        class="flex items-center px-3 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-700"
        @click="fillForm"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="ml-2"> Fill form </span>
      </button>
    </div>
    <div>
      <div class="flex justify-between">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </label>
        <span v-if="errors.email" class="text-sm text-red-600">
          {{ errors.email[0] }}
        </span>
      </div>
      <div class="mt-1">
        <input
          id="email"
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <span v-if="errors.password" class="text-sm text-red-600">
          {{ errors.password[0] }}
        </span>
      </div>
      <div class="mt-1">
        <input
          id="password"
          v-model="form.password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember_me"
          v-model="form.remember"
          name="remember_me"
          type="checkbox"
          class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
        />
        <label
          for="remember_me"
          class="block ml-2 text-sm text-gray-900 dark:text-gray-100"
        >
          Remember me
        </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
          Forgot your password?
        </a>
      </div>
    </div>

    <button
      class="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      type="submit"
    >
      <transition name="fade">
        <span v-if="!isLoading"> Sign in </span>
        <span v-else class="flex items-center">
          <svg
            class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing
        </span>
      </transition>
    </button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false,
      },
      formTesting: {
        email: 'ewilan@dotslashplay.it',
        password: 'password',
        remember: true,
      },
      isDev: process.env.NODE_ENV !== 'production',
      errors: {},
      isLoading: false,
    }
  },
  methods: {
    fillForm() {
      for (const [key] of Object.entries(this.form)) {
        this.form[key] = this.formTesting[key]
      }
    },
    async logout() {
      try {
        await this.$axios.$post('/api/logout')
      } catch (error) {
        console.error(error)
      }
    },
    async submit() {
      this.isLoading = true
      try {
        const manual = false
        if (manual) {
          await this.$axios.$get('/sanctum/csrf-cookie')
          await this.$axios.$post('/login', this.form)
          const books = await this.$axios.$get('/api/books/update')
          console.log(books)
        } else {
          await this.$auth.loginWith('laravelSanctum', {
            data: this.form,
          })
          this.isLoading = false
        }
      } catch (error) {
        console.error(error)
        // this.errors = error.response.data.errors
        this.$store.commit('setAlertMessage', {
          type: 'danger',
          title: 'Error!',
          message:
            "We are sorry but your message can't be send, try in some time.",
        })
        setTimeout(() => {
          this.$store.commit('toggleShowAlert')
        }, 100)
        setTimeout(() => {
          this.$store.commit('setShowAlert', false)
        }, 4000)
        this.isLoading = false
      }
    },
  },
}
</script>
