<template>
  <div
    class="mb-3 border-b"
    :class="
      border
        ? 'border-gray-200 dark:border-gray-600 md:mb-10 pb-6'
        : 'border-transparent md:mb-4 pb-2'
    "
  >
    <layout-breadcrumb class="mb-6" />

    <div class="lg:flex lg:items-center lg:justify-between">
      <!-- Main  -->
      <div class="sm:items-center sm:flex sm:justify-between">
        <div
          :class="{ 'lg:flex lg:items-center': image }"
          class="mx-auto lg:mx-0"
        >
          <div class="flex">
            <component
              :is="imageOriginal ? 'a' : 'span'"
              :href="imageOriginal"
              target="_blank"
              rel="noopener noreferrer"
              :class="
                imageOriginal
                  ? 'hover:shadow transition-shadow duration-100'
                  : ''
              "
              class="mx-auto"
            >
              <app-img
                v-if="image"
                :src="image"
                :color="color"
                :alt="title"
                :title="title"
                class="w-20 h-20"
                override="rounded-md object-cover"
              />
            </component>
          </div>
          <div :class="{ 'sm:ml-5 mt-3 lg:mt-0': image }">
            <div class="md:flex">
              <h1
                id="message-heading"
                class="text-2xl font-extrabold font-handlee text-primary-600 dark:text-primary-500 text-center lg:text-left w-full"
              >
                {{ title }}
              </h1>
              <!-- Favoritable  -->
              <div v-if="favorite && $auth.$state.loggedIn" class="flex">
                <button
                  class="md:ml-3 p-1 mx-auto"
                  type="button"
                  aria-label="Favorite"
                  @click="toggleFavorite"
                >
                  <svg-icon
                    v-if="isFavorite"
                    name="heart-full"
                    class="w-5 h-5 text-red-600 hover:text-gray-600 transition-colors duration-100"
                  />
                  <svg-icon
                    v-else
                    class="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors duration-100"
                    name="heart"
                  />
                </button>
              </div>
            </div>
            <!-- Authors  -->
            <div v-if="authors.length" class="mt-1 text-sm">
              <blocks-authors-links
                :authors="authors"
                class="text-center lg:text-left"
              />
              <h2
                class="text-gray-500 overflow-hidden text-ellipsis mt-1 text-center lg:text-left"
              >
                {{ subtitle }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Default  -->
      <div v-if="$slots.default" class="mt-6 mb-3 lg:mt-0 lg:mb-0">
        <slot />
      </div>
    </div>
    <!-- Content  -->
    <div v-if="$slots.content" class="mt-6">
      <slot name="content" />
    </div>
    <!-- About  -->
    <div
      v-if="text"
      class="max-w-full prose word-wraping dark:text-gray-100 text-gray-500 mt-3 italic line-clamp-3"
    >
      <div v-html="text" />
    </div>
    <!-- External link  -->
    <div v-if="cta" class="dark:text-gray-400 text-gray-500">
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
    <!-- Filters  -->
    <div class="mt-4">
      <slot name="filters" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useFavorite from '~/composables/useFavorite'
import { Author, Entity } from '~/types'
import { getHostname } from '~/utils/methods'

interface Props {
  title: string
  subtitle: string
  image: string
  imageOriginal: string
  border: boolean
  cta: string
  text: string
  authors: Author[]
  favorite: boolean
  entity: Entity
  color: string
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  subtitle: undefined,
  image: undefined,
  imageOriginal: undefined,
  border: false,
  cta: undefined,
  text: undefined,
  authors: () => [],
  favorite: false,
  entity: undefined,
  color: '#ffffff',
})

const { isFavorite, toggleFavorite } = useFavorite(props.entity)
</script>
