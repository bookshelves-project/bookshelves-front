<template>
  <form enctype="multipart/form-data" @submit.prevent="submit">
    <div class="overflow-hidden">
      <div class="grid grid-cols-6 gap-6 mx-1">
        <div class="col-span-6 md:col-span-4">
          <fields-input-text
            v-model="form.name"
            name="name"
            label="Name"
            autocomplete="name"
            required
          >
            Your current user permalink is {{ user.slug }}, you can access to
            your
            <nuxt-link
              :to="
                localePath({ name: 'users-slug', params: { slug: user.slug } })
              "
              class="border-b border-gray-500 hover:text-gray-600 hover:border-gray-600"
            >
              public profile </nuxt-link
            >.
          </fields-input-text>
        </div>
        <fields-input-text
          v-model="form.email"
          name="email"
          label="Email"
          autocomplete="email"
          type="email"
          class="col-span-6 md:col-span-4"
          required
        />
        <fields-radios
          v-model="form.gender"
          :options="genders"
          label="Gender"
          name="gender"
          class="col-span-6 md:col-span-4"
          flex
          required
        />
        <fields-input-text
          v-model="form.about"
          name="about"
          label="About"
          helper="Some notes about you."
          multiline
          class="col-span-6 md:col-span-4"
          maxlength="2048"
        />
        <transition name="fade">
          <div v-if="!form.use_gravatar" class="col-span-6 md:col-span-4">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Avatar</label
            >
            <div class="flex items-center mt-1">
              <div v-show="!avatarPreview">
                <app-img
                  :src="user ? user.avatar : null"
                  :alt="user ? user.name : null"
                  class="object-cover w-12 h-12 rounded-full"
                />
              </div>
              <div v-show="avatarPreview">
                <span
                  class="block w-12 h-12 rounded-full"
                  :style="
                    'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' +
                    avatarPreview +
                    '\');'
                  "
                />
              </div>

              <input
                ref="avatar"
                type="file"
                style="display: none"
                accept="image/jpeg, image/png, image/webp"
                @change="updateAvatarPreview"
              />
              <div class="space-x-2 ml-4">
                <app-button color="white" @click="selectNewAvatar"
                  >Change</app-button
                >
                <app-button color="danger" @click="deleteAvatar"
                  >Delete</app-button
                >
              </div>
              <div v-if="isLoading" class="ml-3 italic text-gray-500">
                {{ progress }}%
              </div>
            </div>
          </div>
        </transition>
        <div class="col-span-6 md:col-span-4">
          <!-- <fields-rich-text-editor /> -->
        </div>
        <div class="col-span-6 md:col-span-4">
          <fieldset class="space-y-5">
            <legend
              class="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Options
            </legend>
            <fields-checkbox
              v-model="form.use_gravatar"
              name="use_gravatar"
              label="Use gravatar"
            >
              Check this if you want to use gravatar for your avatar.
            </fields-checkbox>
            <fields-checkbox
              v-model="form.display_favorites"
              name="display_favorites"
              label="Display favorites"
            >
              Check this if you want to display your favorites publickly.
            </fields-checkbox>
            <fields-checkbox
              v-model="form.display_comments"
              name="display_comments"
              label="Display comments"
            >
              Check this if you want to display your comments publickly on your
              profile.
            </fields-checkbox>
            <fields-checkbox
              v-model="form.display_gender"
              name="display_gender"
              label="Display gender"
            >
              Check this if you want to display your gender publickly on your
              profile.
            </fields-checkbox>
          </fieldset>
        </div>
      </div>

      <div class="px-4 py-3 text-right sm:px-6">
        <app-button type="submit" color="primary">
          <transition name="fade">
            <span v-if="!isLoading">Update profile</span>
            <span v-else class="flex items-center space-x-1">
              <app-loading class="w-5 h-5" />
              <div>Processing</div>
            </span>
          </transition>
        </app-button>
      </div>
    </div>
  </form>
</template>

<script>
import { capitalize } from '~/utils/methods'
export default {
  name: 'FormsProfile',
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
        avatar: '',
        gender: '',
        use_gravatar: false,
        display_favorites: false,
        display_comments: false,
        display_gender: false,
        about: '',
      },
      isLoading: false,
      progress: 0,
      avatarPreview: null,
      genders: [],
    }
  },
  async created() {
    await this.getData()
    if (this.user) {
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.use_gravatar = this.user.use_gravatar
      this.form.display_favorites = this.user.displayFavorites
      this.form.display_comments = this.user.displayComments
      this.form.display_gender = this.user.displayGender
      this.form.about = this.user.about
      this.form.gender = this.user.gender
    }
  },
  methods: {
    capitalize,
    async getData() {
      const genders = await this.$axios.$get('/users/genders')
      for (const [key, value] of Object.entries(genders.data)) {
        this.genders.push({
          label: value,
          value: key,
        })
      }
    },
    async submit() {
      this.isLoading = true
      const data = new FormData()
      if (this.$refs.avatar && this.$refs.avatar.files[0]) {
        this.form.avatar = this.$refs.avatar.files[0]
        data.append('avatar', this.form.avatar)
      }

      data.append('name', this.form.name)
      data.append('email', this.form.email)
      data.append('gender', this.form.gender)
      data.append('use_gravatar', this.form.use_gravatar ? 1 : 0)
      data.append('display_favorites', this.form.display_favorites ? 1 : 0)
      data.append('display_comments', this.form.display_comments ? 1 : 0)
      data.append('display_gender', this.form.display_gender ? 1 : 0)
      data.append('about', this.form.about)

      const config = {
        onUploadProgress: (progressEvent) =>
          (this.progress =
            Math.round(progressEvent.loaded * 100) / progressEvent.total),
      }
      try {
        const user = await this.$axios.$post('/profile/update', data, config)
        this.$auth.setUser(user)
        this.isLoading = false
        this.$nuxt.$emit('toast', {
          title: 'Success!',
          text: 'Your profile has been updated.',
          type: 'success',
        })
      } catch (error) {
        console.error(error)
        this.$nuxt.$emit('toast', {
          title: 'Error',
          text: 'Something bad happened',
          type: 'error',
        })
        this.isLoading = false
      }
    },
    selectNeAvatar() {
      this.$refs.avatar.click()
    },
    updateAvatarreview() {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.avatarPreview = e.target.result
      }

      reader.readAsDataURL(this.$refs.avatar.files[0])
    },
    async deletAvatar() {
      try {
        const user = await this.$axios.$get('/profile/delete/avatar')
        this.avatarPreview = null
        this.form.avatar = null
        this.$auth.setUser(user)
      } catch (error) {}
    },
  },
}
</script>
