<template>
  <dropdown align="right-0" :width="48">
    <template #trigger>
      <button
        id="language"
        title="Language"
        type="button"
        aria-label="Language"
        class="
          block
          text-gray-400
          hover:text-gray-500
          dark:hover:text-gray-300 dark:text-gray-400
        "
      >
        <svg-icon name="lang" class="w-6 h-6 mx-auto" />
        <div class="text-xs text-center mt-2">
          {{ $t('language') }}
        </div>
      </button>
    </template>
    <template #content>
      <div class="py-1">
        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          class="
            block
            w-full
            px-6
            py-2
            text-sm text-left text-gray-700
            hover:bg-gray-200 hover:text-gray-900
            dark:text-gray-100 dark:hover:bg-gray-800
          "
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.name }}
        </nuxt-link>
      </div>
    </template>
  </dropdown>
</template>

<script>
import dropdown from './dropdown.vue'
export default {
  name: 'LanguageSwitch',
  components: { dropdown },
  props: {
    size: {
      type: String,
      default: 'w-10 h-10',
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },
}
</script>
