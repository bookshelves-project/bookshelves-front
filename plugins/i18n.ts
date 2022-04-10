import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      localePath: (route: string | Route | any) => route,
      t: (path: string) => path,
      // toast: {
      //   push: (title?: string, text?: string, type?: ToastType) => {
      //   },
      // },
    },
  }
})
