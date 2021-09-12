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
            <div class="flex">
              <h1
                id="message-heading"
                class="text-2xl font-extrabold font-handlee text-primary-600"
              >
                {{ title }}
              </h1>
              <button
                v-if="favorite && $auth.$state.loggedIn"
                class="ml-3 p-1"
                type="button"
                aria-label="Favorite"
                @click="toggleFavorite"
              >
                <svg-icon
                  v-if="isFavorite"
                  name="heart-full"
                  class="
                    w-5
                    h-5
                    text-red-600
                    hover:text-gray-600
                    transition-colors
                    duration-100
                  "
                />
                <svg-icon
                  v-else
                  class="
                    w-5
                    h-5
                    text-gray-600
                    hover:text-red-600
                    transition-colors
                    duration-100
                  "
                  name="heart"
                />
              </button>
            </div>
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
        line-clamp-3
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
import favorites from '~/mixins/favorites'

export default {
  name: 'AppHeading',
  mixins: [favorites],
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
    favorite: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isFavorite: false,
      favoritesList: [],
    }
  },
  mounted() {
    this.isFavoriteCheck()
    this.favoritesList = this.favorites
  },
  methods: {
    getHostname,
    isFavoriteCheck() {
      this.isFavorite = this.entity ? this.entity.isFavorite : null
    },
    async toggleFavorite() {
      const entity = this.$route.name.split('-')[0].slice(0, -1)
      this.isFavorite = !this.isFavorite
      const slug = this.$route.params.slug
      try {
        await this.$axios.$post(`/favorites/toggle/${entity}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteFavorite(model, slug) {
      try {
        await this.$axios.$post(`/favorites/toggle/${model}/${slug}`)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
