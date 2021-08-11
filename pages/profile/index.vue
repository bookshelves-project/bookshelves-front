<template>
  <div class="main-content pt-8">
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
          <profile-form :user="user" />
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
          <change-password-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePasswordForm from '~/components/forms/change-password-form.vue'
import ProfileForm from '~/components/forms/profile-form.vue'
export default {
  name: 'PageProfile',
  components: { ProfileForm, ChangePasswordForm },
  middleware: 'auth',
  async asyncData({ app }) {
    try {
      const user = await app.$axios.$get(`/user`)
      return { user }
    } catch (error) {
      console.error(error)
      const user = {}
      return { user }
    }
  },
}
</script>
