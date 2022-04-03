<script setup lang="ts">
// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Sign up',
//     })
//   },
// })
</script>

<template>
  <div class="grid xl:grid-cols-3 gap-4 main-content">
    <div class="hidden xl:block col-span-2">
      <app-img
        src="/images/pages/register.svg"
        class="h-full"
        override="m-auto !object-contain"
        alt="bibliophile"
      />
    </div>
    <div class="h-full flex col-span-1">
      <div class="m-auto w-full md:max-w-md">
        <h1
          class="text-3xl font-extrabold text-center dark:text-gray-100 text-gray-900 font-handlee"
        >
          Create your account
        </h1>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-400"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <router-link
              :to="$localePath({ name: 'sign-in' })"
              class="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-800"
            >
              Do you have an account?
            </router-link>
          </div>
        </div>
        <div class="mt-8">
          <form-register />
        </div>
      </div>
    </div>
  </div>
</template>
