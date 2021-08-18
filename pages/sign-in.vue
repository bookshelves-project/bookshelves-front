<template>
  <div class="gap-10 px-8 mx-auto xl:grid xl:grid-cols-3 max-w-7xl">
    <div class="flex col-span-1">
      <div class="w-full m-auto space-y-6 sm:w-96">
        <h2
          class="
            mt-6
            text-3xl
            font-extrabold
            text-center text-gray-900
            font-handlee
          "
        >
          Sign in to your account
        </h2>
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
          <login-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from '~/components/forms/login-form.vue'
import dynamicMetadata from '~/plugins/metadata/metadata-dynamic'

export default {
  name: 'PageLogin',
  components: { loginForm },
  auth: 'guest',
  head() {
    const title = 'Sign in'
    const dynamicMeta = dynamicMetadata({
      title,
      description:
        'Sign in to get access to account features with favorite list, comments on eBooks...',
      url: `${this.$config.baseURL}/${this.$nuxt.$route.path}`,
    })
    return {
      title,
      meta: [...dynamicMeta],
    }
  },
}
</script>
