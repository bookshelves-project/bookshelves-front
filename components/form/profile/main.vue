<template>
  <form @submit.prevent="submit">
    <div class="space-y-6">
      <div class="px-4 py-5 md:rounded-lg md:p-6">
        <div v-if="profile" class="mb-10 text-gray-500 dark:text-gray-400">
          Your current user permalink is {{ profile.slug }}, you can access to
          your
          <nuxt-link
            :to="
              localePath({
                name: 'users-slug',
                params: { slug: profile.slug },
              })
            "
            class="border-b border-gray-500 hover:text-gray-600 hover:border-gray-600"
          >
            public profile.
          </nuxt-link>
        </div>
        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
          <div class="lg:col-span-1">
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
          <div class="mt-5 lg:mt-0 lg:col-span-2">
            <div class="space-y-6">
              <div class="grid grid-cols-6 gap-6">
                <field-text-input
                  v-model="form.name"
                  label="Name"
                  name="name"
                  required
                  class="col-span-6 md:col-span-3"
                />

                <field-text-input
                  v-model="form.email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                  class="col-span-6 md:col-span-3"
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
              <field-banner
                v-model="form.banner"
                name="banner"
                label="Banner"
              />
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

      <div class="px-4 py-5 md:rounded-lg md:p-6">
        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
          <div class="lg:col-span-1">
            <h3
              class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Privacy
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You can protect your data if you want to keep it for you.
            </p>
          </div>
          <div class="mt-5 lg:mt-0 lg:col-span-2">
            <div class="space-y-6">
              <fieldset>
                <legend
                  class="text-base font-medium text-gray-900 dark:text-gray-100 sr-only"
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
import { ApiEndpoint, ApiResponse, Keyable, Profile, ToastType } from '~/types'

const props = defineProps<{
  user: Profile
}>()

const { $repository, $auth, $toast } = useContext()
const store = useApplicationStore()

const profile = ref<Profile>()

const isLoading = ref(false)
const genders = ref<string[]>()

const form = ref({
  name: '',
  email: '',
  about: '',
  gender: '',
  avatar: '',
  banner: '',
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
  const { avatar, banner, ...values } = { ...form.value }
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
  if (typeof form.value.banner === 'object') {
    formData.append('banner', form.value.banner)
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
    const api = await $auth.fetchUser()
    if (api) {
      profile.value = api.data.data
    }

    $toast('Success!', 'Your profile has been updated.', ToastType.success)
  } catch (error) {
    $toast('Error', 'Something bad happened', ToastType.error)
  }

  isLoading.value = false
}

onMounted(() => {
  form.value = props.user
  profile.value = props.user
})
</script>
