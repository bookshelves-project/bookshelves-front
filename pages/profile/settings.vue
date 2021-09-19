<template>
  <div class="main-content">
    <app-header :title="`${title}`" :subtitle="description" />
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <forms-profile :user="user" />
        </div>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200 dark:border-gray-600"></div>
      </div>
    </div>

    <div class="mt-10 sm:mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Update password
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              You need to have current password to change it.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <forms-change-password />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSettings',
  middleware: 'auth',
  async asyncData({ app }) {
    const user = await app.$axios.$get(`/profile`)

    return {
      user: user.data,
    }
  },
  data() {
    return {
      title: 'Settings',
      description: 'Update your settings',
    }
  },
  head() {
    const dynamicMetadata = require('~/plugins/metadata/metadata-dynamic')
    const title = this.title
    return {
      title,
      description: this.description,
      meta: [
        ...dynamicMetadata({
          title,
          url: this.$nuxt.$route.path,
        }),
      ],
    }
  },
}
</script>
