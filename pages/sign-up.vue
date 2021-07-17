<template>
  <div class="gap-10 px-8 mx-auto xl:grid xl:grid-cols-3 max-w-7xl">
    <div class="relative hidden col-span-2 xl:flex">
      <img
        src="/images/bookmark.svg"
        class="m-auto"
        alt="bookmark"
        loading="lazy"
      />
    </div>
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
          Create your account
        </h2>
        <p
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
        </p>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <nuxt-link
              :to="{ name: 'login' }"
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
          <register-form />
        </div>
      </div>
    </div>
    <div class="relative flex col-span-2 mt-10 xl:hidden">
      <img
        src="/images/bookmark.svg"
        class="m-auto"
        alt="bookmark"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
import registerForm from '~/components/forms/register-form.vue'
export default {
  name: 'PageRegister',
  components: { registerForm },
  auth: 'guest',
  head() {
    const title = 'Sign up'
    const description = 'Create an account.'
    const image = `${this.$config.baseURL}/open-graph.jpg`
    const url = `${this.$config.baseURL}/sign-up`
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
