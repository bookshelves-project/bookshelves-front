<template>
  <form class="space-y-6" @submit.prevent="submit">
    <div>
      <div class="flex justify-between">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address<span class="text-red-600">*</span>
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
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password<span class="text-red-600">*</span>
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
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
        />
      </div>
    </div>

    <div class="space-y-1">
      <div class="flex">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm password<span class="text-red-600">*</span>
        </label>
        <span v-if="errors.password_confirmation" class="text-sm text-red-600">
          {{ errors.password[0] }}
        </span>
      </div>
      <div class="mt-1">
        <input
          id="passwordConfirm"
          v-model="form.password_confirmation"
          name="passwordConfirm"
          type="password"
          autocomplete="current-password-confirm"
          required
          class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm"
        />
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <button
        class="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
        type="submit"
      >
        <transition name="fade">
          <span v-if="!isLoading"> Sign up </span>
          <span v-else class="flex items-center space-x-1">
            <svg-icon name="load" class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </button>
      <button
        v-if="isDev"
        type="button"
        class="flex items-center px-3 py-2 font-semibold text-white transition-colors duration-100 rounded-md bg-primary-600 hover:bg-primary-600"
        @click="fillForm"
      >
        <svg-icon name="test" class="w-5 h-5 text-white" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      formTesting: {
        name: this.$randomString(6),
        email: `${this.$randomString(6)}@mail.com`,
        password: this.$randomString(10),
        password_confirmation: this.$randomString(10),
      },
      isDev: process.env.NODE_ENV !== 'production',
      errors: {},
      isLoading: false,
    }
  },
  methods: {
    fillForm() {
      const name = this.$randomString(6).toLowerCase()
      const email = `${name}@mail.com`
      const password = this.$randomString(10)
      this.form = {
        name,
        email,
        password,
        password_confirmation: password,
      }
    },
    async logout() {
      try {
        await this.$axios.$post('/logout')
      } catch (error) {
        console.error(error)
      }
    },
    async submit() {
      const name = this.form.email.split('@')
      this.form.name = name[0]
      this.isLoading = true
      try {
        await this.$axios.$post('/register', this.form)
        await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        })
      } catch (error) {
        console.error(error)
        this.errors = error.response.data.errors
        this.isLoading = false
      }
    },
  },
}
</script>
