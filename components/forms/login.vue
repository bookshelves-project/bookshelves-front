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
      <template v-if="errors.email" #error>
        {{ errors.email[0] }}
      </template>
    </fields-input-text>
    <fields-input-text
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <template v-if="errors.password" #error>
        {{ errors.password[0] }}
      </template>
    </fields-input-text>

    <div class="justify-between md:flex md:items-center">
      <fields-checkbox
        v-model="form.remember"
        name="remember_me"
        label="Remember me"
      />
      <!-- <div class="mt-6 text-sm md:mt-0">
        <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
          Forgot your password?
        </a>
      </div> -->
    </div>

    <div class="flex items-center justify-center space-x-2">
      <app-button type="submit" align="center" color="primary" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading"> Sign in </span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
      <app-button v-if="isDev" type="button" @click="fillForm">
        <svg-icon name="test" class="w-5 h-5" />
      </app-button>
    </div>
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
        remember: false
      },
      formTesting: {
        email: 'admin@mail.com',
        password: 'password',
        remember: true
      },
      isDev: process.env.NODE_ENV !== 'production',
      errors: {},
      isLoading: false
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

            let title = 'Something unexpected happened'
            let text =
              "Seems you can't sign-in currently, we work on it, please try later"
            try {
              switch (error.response.status) {
                case 404:
                  title = 'Check your credentials'
                  text = 'This account not exist in our database.'
                  break
                case 422:
                  title = 'Check your credentials'
                  text = error.response.data.errors.email[0] || text
                  break

                default:
                  break
              }
            } catch (error) {
              console.error(error)
            }
            this.$nuxt.$emit('notification', {
              title,
              text,
              type: 'error'
            })

            this.isLoading = false
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
