import { NuxtAppOptions } from '@nuxt/types'
import type { Auth, HTTPResponse } from '@nuxtjs/auth-next'
import { AxiosResponse } from 'axios'
import { ApiEndpoint, ApiMessage, ToastType } from '~/types'

const useSanctum = () => {
  const { $axios } = useContext()

  const sanctum = async (): Promise<HTTPResponse> => {
    const data = await $axios.get(ApiEndpoint.Sanctum).catch((e) => {
      console.error(e)
    })

    return data as HTTPResponse
  }

  return {
    sanctum
  }
}

export default useSanctum
