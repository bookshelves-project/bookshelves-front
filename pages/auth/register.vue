<template>
  <div class="mx-auto max-w-7xl">
    <div class="justify-between w-full pr-20 xl:flex">
      <div class="relative hidden xl:block">
        <img class="object-cover" src="/images/bookmark.svg" alt="Bookmark" />
        <alert-register
          class="absolute transform -translate-x-1/2 -translate-y-1/2 shadow top-1/2 left-1/2"
        />
      </div>
      <div class="mx-auto my-auto w-96">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900 font-handlee">
            Create your account
          </h2>
        </div>

        <div class="mt-8">
          <div>
            <div class="relative mt-6">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <nuxt-link
                  :to="{ name: 'login' }"
                  class="px-2 text-gray-500 bg-white dark:bg-gray-900 hover:text-gray-800"
                >
                  Do you have an account?
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <register-form />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertRegister from '~/components/blocks/alert-register.vue'
import registerForm from '~/components/forms/register-form.vue'
export default {
  name: 'PageRegister',
  components: { registerForm, AlertRegister },
  auth: 'guest',
  head() {
    const title = 'Sign up'
    const description = 'Create an account on Bookshelves.'
    const image = `${process.env.BASE_URL}/open-graph.png`
    const url = `${process.env.BASE_URL}/sign-up`
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
