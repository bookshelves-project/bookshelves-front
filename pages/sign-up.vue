<template>
  <div>
    <div class="min-h-screen">
      <div
        class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
      >
        <div class="w-full max-w-sm mx-auto lg:w-96">
          <div>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900 font-handlee">
              Register to Bookshelves
            </h2>
          </div>
          <div>
            <div class="mt-6">
              <form-sign-up></form-sign-up>
              <div class="relative mt-6 mb-6">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 text-gray-500 bg-white dark:bg-gray-900">
                    You've already an account ?
                  </span>
                </div>
              </div>
              <div>
                <nuxt-link
                  :to="{ name: 'sign-in' }"
                  class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign in
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formSignUp from '~/components/forms/form-sign-up.vue'
export default {
  name: 'PageSignUp',
  components: { formSignUp },
  auth: 'guest',
}
</script>
