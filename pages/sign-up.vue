<template>
  <div class="gap-10 px-8 mx-auto xl:grid xl:grid-cols-3 max-w-7xl relative">
    <div class="relative hidden col-span-2 xl:flex">
      <app-image
        src="/images/bookmark.svg"
        class="m-auto"
        alt="bookmark"
        loading="lazy"
      />
    </div>
    <div
      class="
        xl:flex xl:col-span-1 xl:relative
        md:absolute
        md:transform
        md:top-1/2
        md:left-1/2
        md:-translate-x-1/2
        md:-translate-y-1/2
        md:mt-0
        mt-16
      "
    >
      <div class="w-full m-auto space-y-6 sm:w-96">
        <div
          class="
            p-5
            mt-5
            text-yellow-600
            bg-yellow-200
            border-2 border-yellow-300
            rounded-md
            word-wraping
          "
        >
          {{ $config.appName }} is in development, if you create an account it
          will probably be deleted in a few days. Features once logged in are
          quite limited and are only useful for testing purposes. Come back
          later for the final version.
        </div>
        <h1
          class="text-3xl font-extrabold text-center text-gray-900 font-handlee"
        >
          Create your account
        </h1>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <nuxt-link
              :to="{ name: 'sign-in' }"
              class="
                px-2
                text-gray-500
                bg-white
                dark:bg-gray-900
                hover:text-gray-800
              "
            >
              Do you have an account?
            </nuxt-link>
          </div>
        </div>
        <div class="mt-8">
          <forms-register />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageRegister',
  auth: 'guest',
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = 'Sign up'
    return {
      title,
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
