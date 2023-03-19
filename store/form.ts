import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    body: {} as object,
    test: {} as object,
    isLoading: false,
    requestData: {} as RequestData,
  }),
  actions: {
    setForm(form: { body?: object; test?: object }) {
      this.$patch({
        body: form.body,
        test: form.test,
      })
    },
    setRequestData(params: RequestData) {
      this.$patch({
        requestData: params,
      })
    },
    fillData() {
      this.$patch({
        body: { ...this.test },
      })
    },
    resetData(): any {
      const body = this.body as { [key: string]: any }

      for (const key in body) {
        if (typeof body[key] === 'boolean')
          body[key] = false
        else
          body[key] = ''
      }
      this.$patch({
        body,
      })

      return body
    },
    enableLoading() {
      this.$patch({
        isLoading: !this.isLoading,
      })
    },
    disableLoading() {
      this.$patch({
        isLoading: !this.isLoading,
      })
    },
    toggleLoading() {
      this.$patch({
        isLoading: !this.isLoading,
      })
    },
    async request(
      requestData: RequestData,
      options: {
        loadingInfinite?: boolean
        withToast?: boolean
        successMsg?: string
        errorMsg?: string
      } = { loadingInfinite: true, withToast: false, successMsg: 'It\'s all works!', errorMsg: 'Oops, an error happened here!' },
    ) {
      const { pushToast } = useToast()
      const { request } = useAuth()

      this.setRequestData(requestData)
      const res = await request<unknown>({
        endpoint: this.requestData.endpoint,
        params: this.requestData.params,
        query: this.requestData.query,
        lazy: this.requestData.lazy,
        method: this.requestData.method,
        body: this.requestData.body,
      })

      if (options.withToast) {
        if (res.success) {
          pushToast({
            title: 'Success',
            text: options.successMsg,
            type: 'success',
          })
          this.resetData()
        }
        else {
          pushToast({
            title: 'Error',
            text: options.errorMsg,
            type: 'error',
          })
        }
      }

      if (!options.loadingInfinite)
        this.disableLoading()

      return res
    },
  },
})
