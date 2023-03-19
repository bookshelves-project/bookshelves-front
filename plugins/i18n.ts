import en from './locales/en.json'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const getValue = (obj: Keyable, path: string): any => {
    if (!path)
      return obj
    const properties = path.split('.')
    const key = properties.shift() as string
    return getValue(obj[key], properties.join('.')) ?? path
  }

  return {
    provide: {
      localePath: (route: string | Route | any) => route,
      t: (path: string) => getValue(en, path),
    },
  }
})
