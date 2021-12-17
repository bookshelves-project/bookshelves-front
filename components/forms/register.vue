<template>
  <form class="space-y-6" @submit.prevent="submit">
    <fields-input-text
      v-model="form.email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      required
    >
      <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
    </fields-input-text>
    <fields-input-text
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <template v-if="errors.password" #error>{{ errors.password[0] }}</template>
    </fields-input-text>
    <fields-input-text
      v-model="form.password_confirmation"
      name="password_confirmation"
      label="Confirm password"
      type="password"
      required
    >
      <template v-if="errors.password_confirmation" #error>{{ errors.password_confirmation[0] }}</template>
    </fields-input-text>

    <div class="flex items-center space-x-2">
      <app-button type="submit" color="primary" align="center" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">Sign up</span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
      <app-button v-if="isDev" type="button" aria-label="Fill form" @click="fillForm">
        <svg-icon name="test" class="w-5 h-5" />
      </app-button>
    </div>
  </form>
</template>

<script>
import { randomString } from '~/utils/methods'

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: true
      },
      isDev: process.env.NODE_ENV !== 'production',
      errors: {},
      isLoading: false
    }
  },
  methods: {
    fillForm() {
      const name = randomString(6).toLowerCase()
      const email = `${name}@mail.com`
      const password = randomString(10)
      this.form = {
        name,
        email,
        password,
        password_confirmation: password,
        terms: true
      }
    },
    async submit() {
      const name = this.form.email.split('@')
      this.form.name = name[0]
      this.isLoading = true

      try {
        await this.$axios.$post('/register', this.form)
        this.$auth
          .loginWith(this.$auth.options.defaultStrategy, {
            data: this.form
          })
          .catch((error) => {
            console.error(error)
          })
      } catch (error) {
        console.error(error)
        const text =
          Object.values(error.response.data.errors)[0][0] ||
          "Seems you can't sign-up currently, we work on it, please try later"
        this.$nuxt.$emit('toast', {
          title: 'Something unexpected happened',
          text,
          type: 'error'
        })
        // error.response.status
        this.isLoading = false
      }
    }
  }
}
</script>
