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
    <div class="flex col-span-2 mt-10 xl:mt-0">
      <img
        src="/images/bibliophile.svg"
        class="m-auto"
        alt="bibliophile"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
import loginForm from '~/components/forms/login-form.vue'
export default {
  name: 'PageLogin',
  components: { loginForm },
  auth: 'guest',
  head() {
    const title = 'Sign in'
    const description =
      'Sign in to get access to account features with favorite list, comments on eBooks...'
    const image = `${this.$config.baseURL}/open-graph.jpg`
    const url = `${this.$config.baseURL}/sign-in`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: image,
        },
      ],
    }
  },
}
</script>
