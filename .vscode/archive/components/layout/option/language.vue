<script setup lang="ts">
// import { useCounter } from '~/stores/counter'
// import { useI18n } from 'vue-i18n'

// const { t, locale, availableLocales } = useI18n()
// const counterStore = useCounter()

// const { data } = await useAsyncData('/api/hello', () => {
//   return $fetch('/api/hello', {
//     params: {
//       name: 'world',
//     },
//   })
// })

// const toggleLocales = () => {
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }
</script>

<template>
  <div>
    <!-- <div>
      <div>
        <button
          class="text-primary px-2 py-1 focus:outline-transparent rounded-sm"
          @click="counterStore.increment"
        >
          Counter {{ counterStore.n }}
        </button>
      </div>
      <div>
        <a
          class="text-primary hover:underline"
          href="api/hello?name=World"
          target="_blank"
          >server/api.ts</a
        >
        <code>{{ data }}</code>
      </div>
      <div>
        <ul class="list-inside list-disc pt-1 pl-2">
          <li>
            {{ t('hello', { name: 'A Better Nuxt 3 Starter' }) }}
          </li>
          <li>
            {{ t('menu.home') }}
          </li>
        </ul>
      </div>
      <div>
        <button
          class="text-primary px-2 py-1 focus:outline-transparent rounded-sm"
          @click="toggleLocales"
        >
          locale
        </button>

      </div>
    </div> -->
  </div>
</template>
