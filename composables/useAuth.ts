import { NuxtAppOptions } from '@nuxt/types'
import { ApiEndpoint, ApiMessage, AxiosResponse, Entity, ToastAuto, ToastType } from '~/types'

const useAuth = (app: NuxtAppOptions) => {
  const login = async (form: object): Promise<AxiosResponse> => {
    const data = await app.$auth
      .loginWith(app.$auth.options.defaultStrategy, {
        data: form,
      })
    return data as AxiosResponse
  }

  const register = async (form: object): Promise<AxiosResponse> => {
    const data = await app.$repository(ApiEndpoint.AuthRegister, false).create<ApiMessage>(form)

    if (data.status !== 201) {
      app.$toast(
        'Error',
        // app.$apiMessage(data.data),
        ToastType.error
      )
    }

    return data
  }

  const registerAndLogin = async (form: object) => {
    await register(form)
    await login(form)
  }

  return {
    // isFavorite: readonly(isFavorite),
    login,
    register,
    registerAndLogin,
  }
}

export default useAuth
