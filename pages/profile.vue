<template>
  <div class="container max-w-7xl">
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form enctype="multipart/form-data" @submit.prevent="submit">
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700"
                      >Name</label
                    >
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      name="name"
                      autocomplete="name"
                      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="email_address"
                      class="block text-sm font-medium text-gray-700"
                      >Email address</label
                    >
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      name="email"
                      autocomplete="email"
                      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div class="flex items-center mt-1">
                      <div v-show="!photoPreview">
                        <img
                          :src="user.data.avatar"
                          :alt="user.data.name"
                          class="object-cover w-12 h-12 rounded-full"
                        />
                      </div>
                      <div v-show="photoPreview">
                        <span
                          class="block w-12 h-12 rounded-full"
                          :style="
                            'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' +
                            photoPreview +
                            '\');'
                          "
                        >
                        </span>
                      </div>

                      <input
                        ref="photo"
                        type="file"
                        style="display: none"
                        accept="image/jpeg, image/png, image/webp"
                        @change="updatePhotoPreview"
                      />
                      <button
                        type="button"
                        class="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        @click="selectNewPhoto"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        class="px-3 py-2 ml-2 text-sm font-medium leading-4 text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        @click="deletePhoto"
                      >
                        Delete
                      </button>
                      <div v-if="isLoading" class="ml-3 italic text-gray-500">
                        {{ progress }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <v-button type="submit" color="primary">
                  <transition name="fade">
                    <span v-if="!isLoading">Update profile</span>
                    <span v-else class="flex items-center space-x-1">
                      <icon-load class="w-5 h-5 text-white" />
                      <div>Processing</div>
                    </span>
                  </transition>
                </v-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"></div>
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Update password
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              You need to have current password to change it.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="submitPassword">
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="current_password"
                      class="block text-sm font-medium text-gray-700"
                      >Current password</label
                    >
                    <input
                      id="current_password"
                      v-model="formPassword.current_password"
                      required
                      type="password"
                      name="current_password"
                      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                      >New password</label
                    >
                    <input
                      id="password"
                      v-model="formPassword.password"
                      required
                      type="password"
                      name="password"
                      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="password_confirmation"
                      class="block text-sm font-medium text-gray-700"
                      >Confirm new password</label
                    >
                    <input
                      id="password_confirmation"
                      v-model="formPassword.password_confirmation"
                      required
                      type="password"
                      name="password_confirmation"
                      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div class="mt-1 text-gray-700">
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
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLoad from '~/components/icons/icon-load.vue'
import vButton from '~/components/special/v-button.vue'
export default {
  name: 'PageProfile',
  components: { vButton, IconLoad },
  async asyncData({ app }) {
    const user = await app.$axios.$get(`/user`)
    return { user }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        photo: '',
      },
      formPassword: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      isLoading: false,
      progress: 0,
      photoPreview: null,
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
  created() {
    this.form.name = this.user.data.name
    this.form.email = this.user.data.email
  },
  methods: {
    async submit() {
      this.isLoading = true
      const data = new FormData()
      if (this.$refs.photo.files[0]) {
        this.form.photo = this.$refs.photo.files[0]
        data.append('photo', this.form.photo)
      }

      data.append('name', this.form.name)
      data.append('email', this.form.email)

      const config = {
        onUploadProgress: (progressEvent) =>
          (this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )),
      }
      try {
        const user = await this.$axios.$post('/user/update', data, config)
        this.$auth.setUser(user)
        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
    },
    async submitPassword() {
      try {
        await this.$axios.$put('/user/password', this.formPassword)
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
    selectNewPhoto() {
      this.$refs.photo.click()
    },
    updatePhotoPreview() {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.photoPreview = e.target.result
      }

      reader.readAsDataURL(this.$refs.photo.files[0])
    },
    async deletePhoto() {
      try {
        const user = await this.$axios.$get('/user/delete/avatar')
        this.photoPreview = null
        this.form.photo = null
        this.$auth.setUser(user)
      } catch (error) {}
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
