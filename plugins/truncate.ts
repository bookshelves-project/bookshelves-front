import { defineNuxtPlugin } from '@nuxtjs/composition-api'

type Truncater = (text: string) => string

declare module 'vue/types/vue' {
  interface Vue {
    $truncate: Truncater
  }
}

const truncater: Truncater = (text: string) => text.length > 15 ? text.substring(0, 15) : text

export default defineNuxtPlugin((context, inject) => {
  inject('truncate', truncater)
})
