<template>
  <form class="space-y-6" @submit.prevent="submit">
    <div>
      <div class="flex justify-between">
        <label for="email" class="block text-sm font-medium text-gray-700">
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
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex">
        <label for="password" class="block text-sm font-medium text-gray-700">
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
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex">
        <label for="password" class="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <span v-if="errors.passwordConfirm" class="text-sm text-red-600">
          {{ errors.password[0] }}
        </span>
      </div>
      <div class="mt-1">
        <input
          id="passwordConfirm"
          v-model="form.passwordConfirm"
          name="passwordConfirm"
          type="password"
          autocomplete="current-password-confirm"
          required
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    <button
      class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      type="submit"
    >
      <transition name="fade">
        <span v-if="!isLoading"> Sign up </span>
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
  name: 'FormSignUp',
  data() {
    return {
      form: {
        email: 'ewilan@mail.com',
        password: 'password',
        passwordConfirm: 'password',
        remember: false,
      },
      errors: {},
      isLoading: false,
    }
  },
  methods: {
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
          await this.$axios.$post('/api/login', this.form)
        } else {
          await this.$auth.loginWith('laravelSanctum', {
            data: this.form,
          })
        }
      } catch (error) {
        console.error(error)
        this.errors = error.response.data.errors
      }
      this.isLoading = false
    },
  },
}
</script>
