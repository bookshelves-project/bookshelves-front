<template>
  <form @submit.prevent="submitPassword">
    <div class="grid grid-cols-6 gap-6">
      <fields-input-text
        v-model="form.current_password"
        name="current_password"
        label="Current password"
        type="password"
        class="col-span-6 md:col-span-4"
        required
      />
      <fields-input-text
        v-model="form.password"
        name="password"
        label="New password"
        type="password"
        class="col-span-6 md:col-span-4"
        required
      />
      <fields-input-text
        v-model="form.password_confirmation"
        name="password_confirmation"
        label="New password confirm"
        type="password"
        class="col-span-6 md:col-span-4"
        required
      />
    </div>
    <div class="mt-1 text-gray-700 dark:text-gray-200">
      <div v-if="passwordUpdate">
        <span v-if="passwordsMatch" class="text-green-600">
          Yours passwords match.
        </span>
        <span v-else class="text-red-600"> Yours passwords not match. </span>
      </div>
      <br v-else />
    </div>
    <div class="px-4 py-3 text-right sm:px-6">
      <app-button
        type="submit"
        color="primary"
        :disabled="passwordUpdate && !passwordsMatch"
      >
        Change password
      </app-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormsChangePassword',
  data() {
    return {
      form: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      isLoading: false,
      passwordUpdate: false,
      passwordsMatch: false,
    }
  },
  watch: {
    'form.password'(newValue, oldValue) {
      this.checkPasswords()
    },
    'form.password_confirmation'(newValue, oldValue) {
      this.passwordUpdate = true
      this.checkPasswords()
    },
  },
  methods: {
    async submitPassword() {
      try {
        await this.$axios.$post('/profile/update-password', this.form)
        this.form = {
          current_password: '',
          password: '',
          password_confirmation: '',
        }
        this.$nuxt.$emit('notification', {
          title: 'Success!',
          text: 'Your password has been updated.',
          type: 'success',
        })
      } catch (error) {
        console.error(error)
        this.$nuxt.$emit('notification', {
          title: 'Error!',
          text: 'An error happened.',
          type: 'error',
        })
      }
    },
    checkPasswords() {
      if (this.form.password === this.form.password_confirmation) {
        this.passwordsMatch = true
      } else {
        this.passwordsMatch = false
      }
    },
  },
}
</script>
