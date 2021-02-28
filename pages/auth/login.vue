<template>
  <div class="flex min-h-screen mx-auto bg-white dark:bg-gray-900 max-w-7xl">
    <div
      class="flex flex-col justify-center flex-1 px-4 py-12 sm:pr-6 lg:flex-none lg:pr-20 xl:pr-24"
    >
      <div class="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 font-handlee">
            Sign in to your account
          </h2>
        </div>
        <div>
          <div class="relative mt-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <nuxt-link
                :to="{ name: 'register' }"
                class="px-2 text-gray-500 bg-white dark:bg-gray-900 hover:text-gray-800"
              >
                Do you want to register?
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <login-form />
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex-1 hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover object-left w-full h-full"
        src="/images/bibliophile.svg"
        alt=""
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
    const image = `${process.env.BASE_URL}/open-graph.png`
    const url = `${process.env.BASE_URL}/sign-in`
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
      link: [
        {
          rel: 'canonical',
          href: url,
        },
      ],
    }
  },
}
</script>
