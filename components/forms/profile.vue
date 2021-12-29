<template>
  <form @submit.prevent="submit">
    <div class="space-y-6">
      <div class="shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <h3
              class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Profile
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="space-y-6">
              <!-- <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="company-website"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Website
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:text-gray-400 text-sm"
                    >
                      http://
                    </span>
                    <input
                      id="company-website"
                      type="text"
                      name="company-website"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div> -->
              <div class="grid grid-cols-6 gap-6">
                <field-text-input
                  v-model="form.name"
                  label="Name"
                  name="name"
                  required
                  class="col-span-6 sm:col-span-3"
                >
                  Your current user permalink is {{ user.slug }}, you can access
                  to your
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'users-slug',
                        params: { slug: user.slug },
                      })
                    "
                    class="border-b border-gray-500 hover:text-gray-600 hover:border-gray-600"
                  >
                    public profile
                  </nuxt-link>
                </field-text-input>

                <field-text-input
                  v-model="form.email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                  class="col-span-6 sm:col-span-3"
                />
              </div>

              <field-text-input
                v-model="form.about"
                label="About"
                name="about"
                helper="Brief description for your profile. URLs are hyperlinked."
                multiline
              />
              <field-avatar
                v-model="form.avatar"
                name="avatar"
                label="Avatar"
              />
              <field-banner />

              <!-- <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Cover photo
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <h3
              class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Privacy
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You can protect your data if you want to keep it for you.
            </p>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="space-y-6">
              <fieldset>
                <legend
                  class="text-base font-medium text-gray-900 dark:text-gray-100"
                >
                  Do you want to display on your profile?
                </legend>
                <div class="mt-4 space-y-4">
                  <field-checkbox
                    v-model="form.use_gravatar"
                    name="use_gravatar"
                    label="Gravatar"
                  >
                    To use gravatar for your avatar.
                  </field-checkbox>
                  <field-checkbox
                    v-model="form.display_comments"
                    name="display_comments"
                    label="Comments"
                  >
                    To display your favorites on your profile.
                  </field-checkbox>
                  <field-checkbox
                    v-model="form.display_favorites"
                    name="display_favorites"
                    label="Favorites"
                  >
                    To display your comments on your profile.
                  </field-checkbox>
                  <field-checkbox
                    v-model="form.display_gender"
                    name="display_gender"
                    label="Gender"
                  >
                    To display your gender on your profile.
                  </field-checkbox>
                </div>
              </fieldset>
              <field-radios
                v-model="form.gender"
                name="notifications"
                label="Gender"
                helper="Choose your gender between these."
                :options="store.enums.genders"
                flex
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
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

<script setup lang="ts">
import { useApplicationStore } from '~/stores/application'
import { ApiEndpoint, Keyable, Profile, ToastType } from '~/types'

const props = defineProps<{
  user: Profile
}>()

const { $repository, $auth, $toast } = useContext()
const store = useApplicationStore()

const isLoading = ref(false)
const genders = ref<string[]>()

const form = ref({
  name: '',
  email: '',
  about: '',
  gender: '',
  avatar: '',
  use_gravatar: false,
  is_admin: false,

  comments_count: 0,
  favorites_count: 0,

  display_comments: false,
  display_favorites: false,
  display_gender: false,
})

const notifications = computed(() => {
  const options = {
    'push-everything': 'Push everything',
    'push-email': 'Push email',
    'push-nothing': 'Push nothing',
  }
  return options
})

const submit = async () => {
  isLoading.value = true
  if (typeof form.value.avatar !== 'object') {
    form.value.avatar = ''
  }
  const formData = new FormData()
  const { avatar, ...values } = { ...form.value }
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'boolean') {
      formData.set(key, value ? '1' : '0')
    } else {
      formData.set(key, value)
    }
  }
  if (typeof form.value.avatar === 'object') {
    formData.append('avatar', form.value.avatar)
  }
  // const config = {
  //   onUploadProgress: (progressEvent) =>
  //     (this.progress =
  //       Math.round(progressEvent.loaded * 100) / progressEvent.total),
  // }
  // formData.forEach((element) => {
  //   console.log(element)
  // })

  try {
    await $repository(ApiEndpoint.ProfileUpdate).update<Profile>(formData)
    $auth.fetchUser()
    $toast('Success!', 'Your profile has been updated.', ToastType.success)
  } catch (error) {
    $toast('Error', 'Something bad happened', ToastType.error)
  }

  isLoading.value = false
}
const parseBoolean = (object: Keyable) => {
  for (const key in object) {
    const element = object[key]
    console.log(typeof element)
  }
}

onMounted(() => {
  form.value = props.user
  // genders.value = cloneDeep(store.enums.genders)
})
</script>
