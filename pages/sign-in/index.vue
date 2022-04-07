<script setup lang="ts">
import FormLogin from '@/components/form/login.vue'
import AppImg from '@/components/app/img.vue'

// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Sign in',
//     })
//   },
// })
</script>

<template>
  <div class="main-content grid gap-4 xl:grid-cols-3">
    <div class="col-span-1 flex h-full">
      <div class="m-auto w-full md:max-w-md">
        <h1
          class="text-center font-handlee text-3xl font-extrabold text-gray-900 dark:text-gray-100"
        >
          Sign in to your account
        </h1>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-400"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <router-link
              :to="$localePath({ name: 'sign-up' })"
              class="bg-white px-2 text-gray-500 hover:text-gray-800 dark:bg-gray-900 dark:text-gray-400"
            >
              Do you want to register?
            </router-link>
          </div>
        </div>
        <div class="mt-8">
          <form-login />
        </div>
      </div>
    </div>
    <div class="col-span-2 hidden xl:block">
      <app-img
        src="/images/pages/login.svg"
        class="h-full"
        override="m-auto !object-contain"
        alt="bibliophile"
      />
    </div>
  </div>
</template>
