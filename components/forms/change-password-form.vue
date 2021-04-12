<template>
  <form @submit.prevent="submitPassword">
    <div class="overflow-hidden shadow sm:rounded-md">
      <div class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-4">
            <label
              for="current_password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Current password</label
            >
            <input
              id="current_password"
              v-model="formPassword.current_password"
              required
              type="password"
              name="current_password"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm dark:bg-gray-200"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >New password</label
            >
            <input
              id="password"
              v-model="formPassword.password"
              required
              type="password"
              name="password"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm dark:bg-gray-200"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Confirm new password</label
            >
            <input
              id="password_confirmation"
              v-model="formPassword.password_confirmation"
              required
              type="password"
              name="password_confirmation"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm dark:bg-gray-200"
            />
          </div>
        </div>
        <div class="mt-1 text-gray-700 dark:text-gray-200">
          <div v-if="passwordUpdate">
            <span v-if="passwordsMatch" class="text-green-600">
              Yours passwords match.
            </span>
            <span v-else class="text-red-600">
              Yours passwords not match.
            </span>
          </div>
          <br v-else />
        </div>
      </div>
      <div class="px-4 py-3 text-right bg-gray-50 dark:bg-gray-800 sm:px-6">
        <v-button
          type="submit"
          color="primary"
          :disabled="passwordUpdate && !passwordsMatch"
        >
          Change password
        </v-button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChangePasswordForm',
  data() {
    return {
      formPassword: {
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
    'formPassword.password'(newValue, oldValue) {
      this.checkPasswords()
    },
    'formPassword.password_confirmation'(newValue, oldValue) {
      this.passwordUpdate = true
      this.checkPasswords()
    },
  },
  methods: {
    async submitPassword() {
      try {
        await this.$axios.$post('/user/update-password', this.formPassword)
        this.formPassword = {
          current_password: '',
          password: '',
          password_confirmation: '',
        }
        this.$swal({
          title: 'Update success',
          text: 'Password updated',
          icon: 'success',
          confirmButtonText: 'Understand',
        })
      } catch (error) {
        console.error(error)
        this.$swal({
          title: 'Oops!',
          text: 'An error appends!',
          icon: 'error',
          confirmButtonText: 'Understand',
        })
      }
    },
    checkPasswords() {
      if (
        this.formPassword.password === this.formPassword.password_confirmation
      ) {
        this.passwordsMatch = true
      } else {
        this.passwordsMatch = false
      }
    },
  },
}
</script>
