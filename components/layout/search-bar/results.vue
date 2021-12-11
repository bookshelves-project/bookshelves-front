<template>
  <div
    v-if="results[category] && results[category][type].length"
    class="border-b border-gray-200 dark:border-gray-600 pt-3"
  >
    <h3 class="text-lg italic text-gray-400 dark:text-gray-500 mb-3">{{ title }}</h3>
    <transition-group name="list" tag="div">
      <nuxt-link
        v-for="(item, id) in results[category][type]"
        :key="id + 1"
        :to="
          localePath({
            name:
              item.meta.entity === 'author'
                ? `authors-slug`
                : `${item.meta.entity}s-author-slug`,
            params: {
              author: item.meta.author,
              slug: item.meta.slug,
            },
          })
        "
        class="flex items-center mb-6 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-75 rounded-md p-2 text-left"
        :title="item.title"
        @click.native="closeModal"
      >
        <app-img :src="item.cover.thumbnail" class="object-cover rounded-full h-14 w-14" />
        <div class="overflow-hidden dark:text-gray-400 ml-4">
          <div class="wiki-title">
            <div class="font-semibold">{{ item.title }}</div>
            <div class="italic">{{ capitalize(item.meta.entity) }}</div>
          </div>
          <div class="text-sm italic">
            <div v-if="item.serie" class="ml-1">
              {{ item.serie }}, vol.
              {{ item.volume }}
            </div>
          </div>
          <div class="wiki-snippet" v-html="item.snippet" />
        </div>
      </nuxt-link>
    </transition-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { capitalize } from '~/utils/methods'

export default {
  name: 'Results',
  props: {
    results: {
      type: [
        Object,
        Array
      ],
      default: () => { }
    },
    title: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: 'relevant',
      validator: val => [
        'relevant',
        'other'
      ].includes(val)
    },
    type: {
      type: String,
      default: 'authors',
      validator: val => [
        'authors',
        'series',
        'books'
      ].includes(val)
    }
  },
  methods: {
    capitalize,
    ...mapMutations({
      setModalOpened: 'search/setModalOpened'
    }),
    closeModal() {
      setTimeout(() => {
        this.setModalOpened(false)
      }, 500)
    }
  }
}
</script>
