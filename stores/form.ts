import type { HTTPResponse } from '@nuxtjs/auth-next'
import { defineStore } from 'pinia'

export const useFormStore = defineStore({
  id: 'form',
  state: () => ({
    button: 'Submit',
    form: {},
    test: {},
    method: (payload?: any) => { },
    response: {} as HTTPResponse | void
  }),
  actions: {
    init(form: object, test: object) {
      this.$patch({
        form,
        test,
        response: {}
      })
    },
    fillForm() {
      this.$patch({
        form: { ...this.test }
      })
    },
    setButton(button: string) {
      this.$patch({
        button
      })
    },
    setMethod(method: any) {
      this.$patch({
        method
      })
    },
    resetForm() {
      const form = this.form as { [key: string]: any }

      for (const key in form) {
        if (typeof form[key] === 'boolean') {
          form[key] = false
        } else {
          form[key] = ''
        }
      }
      this.$patch({
        form
      })
    },
    setResponse(response: any) {
      this.$patch({
        response
      })
    },
    getResponse(): HTTPResponse {
      return this.response
    },
    request(form: any): HTTPResponse {
      return this.method(form)
    }
  },
})
