<template>
  <div
    class="mb-3 border-b dark:border-gray-600"
    :class="
      border
        ? 'border-gray-200 md:mb-10 pb-6'
        : 'border-transparent md:mb-4 pb-2'
    "
  >
    <layout-breadcrumb class="mb-6" />
    <div class="flex items-center justify-between">
      <div class="sm:items-center sm:flex sm:justify-between">
        <div :class="{ 'flex items-center': image }">
          <component
            :is="imageOriginal ? 'a' : 'span'"
            :href="imageOriginal"
            target="_blank"
            rel="noopener noreferrer"
            :class="
              imageOriginal ? 'hover:shadow transition-shadow duration-100' : ''
            "
          >
            <app-image
              v-if="image"
              :src="image"
              :alt="title"
              :title="title"
              class="object-cover w-20 h-20 rounded-md"
              class-img="rounded-md"
            />
          </component>
          <div :class="{ 'ml-5': image }">
            <h1
              id="message-heading"
              class="text-2xl font-extrabold font-handlee text-primary-600"
            >
              {{ title }}
            </h1>
            <div class="mt-1 text-sm">
              <blocks-authors-links v-if="authors" :authors="authors" />
              <h2 class="text-gray-500 overflow-hidden overflow-ellipsis mt-1">
                {{ subtitle }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
    <div v-if="$slots.content" class="mt-6">
      <slot name="content" />
    </div>
    <div
      v-if="text"
      class="
        max-w-full
        prose
        word-wraping
        dark:text-gray-100
        text-gray-500
        mt-3
        italic
        line-clamp-6
      "
    >
      <div v-html="text"></div>
    </div>
    <div v-if="cta" class="dark:text-gray-100 text-gray-500">
      <div class="pt-1 text-right">
        To have more informations:
        <a
          :href="cta"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-gray-700 border-b border-gray-500"
          >{{ getHostname(cta) }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getHostname } from '@/plugins/utils/methods'

export default {
  name: 'SectionHeading',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    imageOriginal: {
      type: String,
      default: null,
    },
    border: {
      type: Boolean,
      default: true,
    },
    cta: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    authors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getHostname,
  },
}
</script>

<style lang="postcss" scoped></style>
