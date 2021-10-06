<template>
  <div class="gap-10 px-8 mx-auto xl:grid xl:grid-cols-3 max-w-7xl relative">
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
        <h1
          class="
            mt-6
            text-3xl
            font-extrabold
            text-center text-gray-900
            font-handlee
          "
        >
          Sign in to your account
        </h1>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <nuxt-link
              :to="{ name: 'sign-up' }"
              class="
                px-2
                text-gray-500
                bg-white
                dark:bg-gray-900
                hover:text-gray-800
              "
            >
              Do you want to register?
            </nuxt-link>
          </div>
        </div>
        <div class="mt-8">
          <forms-login />
        </div>
      </div>
    </div>
    <div class="col-span-2 mt-10 xl:mt- hidden xl:flex">
      <app-image
        src="/images/bibliophile.svg"
        class="m-auto"
        alt="bibliophile"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  auth: 'guest',
  head() {
    const dynamicMetadata = require('~/plugins/config/metadata-dynamic')
    const title = 'Sign in'
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
