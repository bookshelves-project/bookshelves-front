import { defineNuxtPlugin } from '#app'
import en from './locales/en.json'
import { getValue } from '@/utils/methods'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      localePath: (route: string | Route | any) => route,
      t: (path: string) => getValue(en, path)
    }
  }
})
