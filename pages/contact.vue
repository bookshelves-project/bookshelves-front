<script setup lang="ts">
import LayoutBreadcrumb from '@/components/layout/breadcrumb.vue'
import AppImg from '@/components/app/img.vue'
import FormContact from '@/components/form/contact.vue'
</script>

<template>
  <div class="main-content">
    <layout-breadcrumb class="mb-6" />
    <div class="grid gap-4 xl:grid-cols-2">
      <div class="flex h-full">
        <div class="m-auto w-full md:max-w-md">
          <h1
            class="text-center font-handlee text-3xl font-extrabold text-gray-900 dark:text-gray-100"
          >
            Leave us a short note
          </h1>
          <div class="relative mt-6">
            <div>
              Do you like what we offer or do you hate our work? Do not hesitate
              to let us know with this nice form!
            </div>
            <div class="mt-2">
              <small>
                Just kidding, if you hate what we do, you can leave, that would
                be cool!
              </small>
            </div>
          </div>
          <div class="mt-8">
            <form-contact />
          </div>
        </div>
      </div>
      <div class="hidden xl:block">
        <app-img
          src="/images/pages/contact.webp"
          class="h-full"
          override="m-auto !object-contain"
          alt="bibliophile"
        />
      </div>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head() {
    return this.$metadata({
      title: 'Contact us',
      description:
        "If you want to contact us, don't hesitate to send us a small message!",
    })
  },
})
export default class PageContact extends Vue {}
</script>

<template>
  <div class="grid xl:grid-cols-2 gap-4 main-content">
    <div class="h-full flex">
      <div class="m-auto w-full md:max-w-md">
        <h1
          class="text-3xl font-extrabold text-center dark:text-gray-100 text-gray-900 font-handlee"
        >
          Leave us a short note
        </h1>
        <div class="relative mt-6">
          <div>
            Do you like what we offer or do you hate our work? Do not hesitate
            to let us know with this nice form!
          </div>
          <div class="mt-2">
            <small>
              Just kidding, if you hate what we do, you can leave, that would be
              cool!
            </small>
          </div>
        </div>
        <div class="mt-8">
          <form-contact />
        </div>
      </div>
    </div>
    <div class="hidden xl:block">
      <app-img
        src="/images/pages/contact.webp"
        class="h-full"
        override="m-auto !object-contain"
        alt="bibliophile"
      />
    </div>
  </div>
</template> -->
