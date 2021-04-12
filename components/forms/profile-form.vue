<template>
  <form enctype="multipart/form-data" @submit.prevent="submit">
    <div class="overflow-hidden shadow sm:rounded-md">
      <div class="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-4">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Name</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm dark:bg-gray-200"
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label
              for="email_address"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Email address</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm dark:bg-gray-200"
            />
          </div>

          <transition name="fade">
            <div v-if="!form.gravatar" class="col-span-6 sm:col-span-4">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Photo
              </label>
              <div class="flex items-center mt-1">
                <div v-show="!photoPreview">
                  <img
                    :src="user.data ? user.data.avatar : null"
                    :alt="user.data ? user.data.name : null"
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
                  class="px-3 py-2 ml-3 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:bg-gray-800 dark:text-gray-200"
                  @click="selectNewPhoto"
                >
                  Change
                </button>
                <button
                  type="button"
                  class="px-3 py-2 ml-2 text-sm font-medium leading-4 text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-800 dark:text-red-300"
                  @click="deletePhoto"
                >
                  Delete
                </button>
                <div v-if="isLoading" class="ml-3 italic text-gray-500">
                  {{ progress }}%
                </div>
              </div>
            </div>
          </transition>
          <div class="col-span-6 sm:col-span-4">
            <div class="max-w-lg space-y-4">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="gravatar"
                    v-model="form.gravatar"
                    name="gravatar"
                    type="checkbox"
                    class="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-600"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="gravatar"
                    class="font-medium text-gray-700 dark:text-gray-200"
                    >Use Gravatar</label
                  >
                  <p class="text-gray-500">
                    If you want to use Gravatar for your avatar, check this box.
                    If you want to upload your custom avatar or default avatar,
                    uncheck this box.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-3 text-right bg-gray-50 dark:bg-gray-800 sm:px-6">
        <v-button type="submit" color="primary">
          <transition name="fade">
            <span v-if="!isLoading">Update profile</span>
            <span v-else class="flex items-center space-x-1">
              <svg-icon name="load" class="w-5 h-5 text-white" />
              <div>Processing</div>
            </span>
          </transition>
        </v-button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ProfileForm',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        photo: '',
        gravatar: false,
      },
      isLoading: false,
      progress: 0,
      photoPreview: null,
    }
  },
  created() {
    if (this.user.data) {
      this.form.name = this.user.data.name
      this.form.email = this.user.data.email
      this.form.gravatar = this.user.data.gravatar
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      const data = new FormData()
      if (this.$refs.photo && this.$refs.photo.files[0]) {
        this.form.photo = this.$refs.photo.files[0]
        data.append('photo', this.form.photo)
      }

      data.append('name', this.form.name)
      data.append('email', this.form.email)
      data.append('gravatar', this.form.gravatar)

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
  },
}
</script>
