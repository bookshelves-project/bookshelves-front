import { defineStore } from 'pinia'

export const useFormStore = defineStore('data', {
  state: () => ({
    loadingCanEnd: true,
    data: {},
    test: {},
    isLoading: false,
    response: {},
    fetchParams: {} as FetchParams,
  }),
  actions: {
    setForm(form: { data: object; test: object; loadingCanEnd?: boolean }) {
      this.$patch({
        data: form.data,
        test: form.test,
        loadingCanEnd: form.loadingCanEnd,
      })
    },
    async setRequest(params: FetchParams) {
      this.$patch({
        fetchParams: params,
      })

      return await this.request()
    },
    fillData() {
      this.$patch({
        data: { ...this.test },
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
        data,
      })

      return data
    },
    toggleLoading() {
      this.$patch({
        isLoading: !this.isLoading,
      })
    },
    async request() {
      // const { $toast } = useNuxtApp()
      // const { fetch } = useFetchable()
      // const response = await fetch({
      //   endpoint: this.fetchParams.endpoint,
      //   params: this.fetchParams.params,
      //   query: this.fetchParams.query,
      //   lazy: this.fetchParams.lazy,
      //   method: this.fetchParams.method,
      //   body: this.fetchParams.body,
      // })
      // if (response.response?.status !== 200) {
      //   $toast('Error', 'Oops, an error happened here!', 'error')
      // } else {
      //   $toast('Success', response.body.message, 'success')
      //   this.resetData()
      // }
      // if (this.loadingCanEnd) {
      //   this.toggleLoading()
      // }
      // return response
    },
  },
})
