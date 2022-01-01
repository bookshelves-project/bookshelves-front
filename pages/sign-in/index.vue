<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'guest',
  head() {
    return this.$metadata({
      title: 'Sign in',
    })
  },
})
export default class PageLogin extends Vue {}
</script>

<template>
  <div class="grid xl:grid-cols-3 gap-4 main-content">
    <div class="h-full flex col-span-1">
      <div class="m-auto w-full md:max-w-md">
        <h1
          class="text-3xl font-extrabold text-center dark:text-gray-100 text-gray-900 font-handlee"
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
            <nuxt-link
              :to="localePath({ name: 'sign-up' })"
              class="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-800"
            >
              Do you want to register?
            </nuxt-link>
          </div>
        </div>
        <div class="mt-8">
          <form-login />
        </div>
      </div>
    </div>
    <div class="hidden xl:block col-span-2">
      <app-img
        src="/images/bibliophile.svg"
        class="h-full"
        override="m-auto !object-contain"
        alt="bibliophile"
      />
    </div>
  </div>
</template>
