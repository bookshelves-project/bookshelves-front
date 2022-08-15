import { defineStore } from 'pinia'

export const useFormStore = defineStore('data', {
  state: () => ({
    loadingCanEnd: true,
    data: {},
    test: {},
    isLoading: false,
    response: {},
    requestData: {} as RequestData
  }),
  actions: {
    setForm(form: { data: object; test: object; loadingCanEnd?: boolean }) {
      this.$patch({
        data: form.data,
        test: form.test,
        loadingCanEnd:
          form.loadingCanEnd !== undefined ? form.loadingCanEnd : true
      })
    },
    setRequestData(params: RequestData) {
      this.$patch({
        requestData: params
      })
    },
    fillData() {
      this.$patch({
        data: { ...this.test }
      })
    },
    resetData(): any {
      const data = this.data as { [key: string]: any }

      for (const key in data) {
        if (typeof data[key] === 'boolean') {
          data[key] = false
        } else {
          data[key] = ''
        }
      }
      this.$patch({
        data
      })

      return data
    },
    enableLoading() {
      this.$patch({
        isLoading: !this.isLoading
      })
    },
    disableLoading() {
      this.$patch({
        isLoading: !this.isLoading
      })
    },
    toggleLoading() {
      this.$patch({
        isLoading: !this.isLoading
      })
    },
    async request(
      requestData: RequestData,
      options: {
        loadingInfinite?: boolean,
        withToast?: boolean,
        successMsg?: string,
        errorMsg?: string
      } = { loadingInfinite: true, withToast: false, successMsg: 'It\'s all works!', errorMsg: 'Oops, an error happened here!' }
    ) {
      const { pushToast } = useToast()
      const { request } = useHttp()

      this.setRequestData(requestData)
      const response = await request({
        endpoint: this.requestData.endpoint,
        params: this.requestData.params,
        query: this.requestData.query,
        lazy: this.requestData.lazy,
        method: this.requestData.method,
        body: this.requestData.body
      })

      if (options.withToast) {
        if (response.success) {
          pushToast({
            title: 'Success',
            text: options.successMsg,
            type: 'success'
          })
          this.resetData()
        } else {
          pushToast({
            title: 'Error',
            text: options.errorMsg,
            type: 'error'
          })
        }
      }

      if (!options.loadingInfinite) {
        this.disableLoading()
      }

      return response
    }
  }
})
