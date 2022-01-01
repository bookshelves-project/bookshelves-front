<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'guest',
  head() {
    return this.$metadata({
      title: 'Reset password',
    })
  },
})
export default class PageResetPassword extends Vue {}
</script>

<template>
  <div class="grid xl:grid-cols-3 gap-4 main-content">
    <div class="h-full flex col-span-3">
      <div class="m-auto w-full md:max-w-md">
        <h1
          class="text-3xl font-extrabold text-center dark:text-gray-100 text-gray-900 font-handlee"
        >
          Reset your password
        </h1>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-400"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <nuxt-link
              :to="localePath({ name: 'sign-in-forgot-password' })"
              class="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-800"
            >
              You have an error?
            </nuxt-link>
          </div>
        </div>
        <div class="mt-8">
          <form-reset-password />
        </div>
      </div>
    </div>
  </div>
</template>
