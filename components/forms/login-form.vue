<template>
  <form class="space-y-6" @submit.prevent="submit">
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
          class="
            block
            w-full
            px-3
            py-2
            placeholder-gray-400
            border border-gray-300
            rounded-md
            shadow-sm
            appearance-none
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
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
          class="
            block
            w-full
            px-3
            py-2
            placeholder-gray-400
            border border-gray-300
            rounded-md
            shadow-sm
            appearance-none
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
        />
      </div>
    </div>

    <div class="justify-between md:flex md:items-center">
      <div class="flex items-center">
        <input
          id="remember_me"
          v-model="form.remember"
          name="remember_me"
          type="checkbox"
          class="
            w-4
            h-4
            text-indigo-600
            border-gray-300
            rounded
            focus:ring-indigo-500
          "
        />
        <label
          for="remember_me"
          class="block ml-2 text-sm text-gray-900 dark:text-gray-100"
        >
          Remember me
        </label>
      </div>
      <!-- <div class="mt-6 text-sm md:mt-0">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot your password?
        </a>
      </div> -->
    </div>

    <div class="flex items-center justify-center space-x-2">
      <button
        class="
          flex
          justify-center
          w-full
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          border border-transparent
          rounded-md
          shadow-sm
          bg-primary-600
          hover:bg-primary-600
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-primary-600
        "
        type="submit"
      >
        <transition name="fade">
          <span v-if="!isLoading"> Sign in </span>
          <span v-else class="flex items-center space-x-1">
            <loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </button>
      <button
        v-if="isDev"
        type="button"
        class="
          flex
          items-center
          px-3
          py-2
          font-semibold
          text-white
          transition-colors
          duration-100
          rounded-md
          bg-primary-600
          hover:bg-primary-600
        "
        aria-label="Fill form"
        @click="fillForm"
      >
        <svg-icon name="test" class="w-5 h-5" />
      </button>
    </div>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

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
        email: 'admin@mail.com',
        password: 'password',
        remember: true,
      },
      isDev: process.env.NODE_ENV !== 'production',
      errors: {},
      isLoading: false,
    }
  },
  methods: {
    ...mapMutations({
      setIsVisible: 'notification/setIsVisible',
      setTitle: 'notification/setTitle',
      setText: 'notification/setText',
      setType: 'notification/setType',
    }),
    fillForm() {
      for (const [key] of Object.entries(this.form)) {
        this.form[key] = this.formTesting[key]
      }
    },
    async logout() {
      try {
        await this.$axios.$post('/logout')
      } catch (error) {
        console.error(error)
      }
    },
    submit() {
      this.isLoading = true
      try {
        this.$auth
          .loginWith(this.$auth.options.defaultStrategy, { data: this.form })
          .then(() => {
            // if we are remembering the user, we
            // need to set the remember cookie
            if (this.form.remember_me) {
              this.$auth.$storage.setCookie(
                `_remember.${this.$auth.options.defaultStrategy}`,
                this.$auth.strategy.token.get(),
                { maxAge: 2147483647 }
              )
            }
          })
          .catch((error) => {
            console.error(error)

            let title = ''
            let text = ''
            try {
              switch (error.response.status) {
                case 422:
                  title = 'Check your credentials'
                  text = error.response.data.errors.email[0] || text
                  break

                default:
                  title = 'Something unexpected happened'
                  text =
                    "Seems you can't sign-in currently, we work on it, please try later"
                  break
              }
            } catch (error) {
              console.error(error)
            }
            this.setIsVisible(true)
            this.setTitle(title)
            this.setText(text)
            this.setType('error')
            this.isLoading = false
          })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
