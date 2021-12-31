import { NuxtAppOptions } from '@nuxt/types'
import { AxiosResponse } from 'axios'
import { ApiEndpoint, ApiMessage, ToastType } from '~/types'

const useAuth = (app: NuxtAppOptions) => {
  const login = async (form: object): Promise<AxiosResponse> => {
    const data = await app.$auth
      .loginWith(app.$auth.options.defaultStrategy, {
        data: form,
      }) as AxiosResponse

    if (data.status !== 200) {
      app.$toast(
        'Error',
        app.$apiMessage(data.data),
        ToastType.error
      )
    }

    return data
  }

  const register = async (form: object): Promise<AxiosResponse> => {
    const data = await app.$repository(ApiEndpoint.AuthRegister, false).create<ApiMessage>(form)

    if (data.status !== 200) {
      app.$toast(
        'Error',
        app.$apiMessage(data.data),
        ToastType.error
      )
    }

    return data
  }

  const registerAndLogin = async (form: object) => {
    const data = await register(form)
    if (data.status === 200) {
      await login(form)
    }
  }

  const logout = async () => {
    // const data = await app.$axios.post(ApiEndpoint.AuthLogout)
    await app.$auth.logout()

    // if (data.status !== 200) {
    //   app.$toast(
    //     'Error',
    //     app.$apiMessage(data.data),
    //     ToastType.error
    //   )
    // }

    // return data
  }

  const passwordForgot = async (form: object) => {
    const api = await app.$repository(ApiEndpoint.AuthPasswordForgot, false).create(
      form
    )
    if (api.status === 200) {
      app.$toast(
        'Success',
        'Check your mailbox to create a new password',
        ToastType.success
      )
    } else {
      // emailError.value = api.data.errors.email[0]
      app.$toast(
        'Error',
        // `${api.data.message} ${$apiMessage(api.data)}`,
        '',
        ToastType.error
      )
    }
  }

  const passwordReset = async (form: object) => {
    const api = await app.$repository(ApiEndpoint.AuthPasswordReset, false).create(
      form
    )
    if (api.status === 200) {
      app.$toast(
        'Success',
        'Check your mailbox to create a new password',
        ToastType.success
      )
    } else {
      // emailError.value = api.data.errors.email[0]
      app.$toast(
        'Error',
        // `${api.data.message} ${$apiMessage(api.data)}`,
        '',
        ToastType.error
      )
    }
  }

  return {
    // isFavorite: readonly(isFavorite),
    login,
    register,
    registerAndLogin,
    logout,
    passwordForgot,
    passwordReset,
  }
}

export default useAuth
