import { NuxtAppOptions } from '@nuxt/types'
import type { Auth, HTTPResponse } from '@nuxtjs/auth-next'
import { AxiosResponse } from 'axios'
import useSanctum from './useSanctum'
import { ApiEndpoint, ApiMessage, ToastType } from '~/types'

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}
interface RegisterForm extends LoginForm {
  name: string,
  password_confirmation: string,
}
interface PasswordForgotForm {
  email: string;
}
interface PasswordResetForm {
  token: string,
  email: string,
  password: string,
  password_confirmation: string,
}

const useAuth = () => {
  const { $repository, $axios, $toast, $cookies, $auth, $config } = useContext()
  const { sanctum } = useSanctum()

  const login = async (form: LoginForm): Promise<void> => {
    // try {
    //   const axios = $axios
    //   await axios.get(`${$config.apiURL}/sanctum/csrf-cookie`)
    //     .then(async (e) => {
    //       console.log(axios)
    //       console.log($cookies.getAll())

    //       await axios.post(ApiEndpoint.AuthLogin, form)
    //     })
    //     .then(async (e) => {
    //       const axiosToken = axios
    //       console.log($cookies.getAll())

    //       // axiosToken.setToken =
    //       await axiosToken.get(ApiEndpoint.AuthUser)
    //     })
    // } catch (error: any) {
    //   console.log(error.response)
    // }

    const data: HTTPResponse = await $auth
      .loginWith($auth.options.defaultStrategy, {
        data: form,
      }).catch(e => {
        console.error(e)
        if (e.response.status === 401) {
          console.log('clean cookies')
          $cookies.removeAll()
        }
        $toast(
          'Error',
          e.response.data.message,
          ToastType.error
        )
        return e
      })

    // if (data && data.status === 200) {
    // if (form.remember) {
    //   const token = $cookies.get('XSRF-TOKEN')
    //   const today = new Date()
    //   const expires = new Date()
    //   expires.setDate(today.getDate() + 30)
    //   $cookies.set('XSRF-TOKEN', token, {
    //     expires
    //   })
    // }
    // }

    // return data
  }

  const register = async (form: RegisterForm): Promise<HTTPResponse> => {
    // const data = await $repository(ApiEndpoint.AuthRegister, false)
    //   .create<ApiMessage>(form)
    await sanctum()
    const data = await $axios.post(ApiEndpoint.AuthRegister, form).catch((e) => {
      console.error(e)
      $toast(
        'Error',
        // $apiMessage(e.data),
        e.response.data.message,
        ToastType.error
      )
      return e
    })

    return data as HTTPResponse
  }

  const registerAndLogin = async (form: RegisterForm): Promise<HTTPResponse> => {
    const data = await register(form)
    await login(form)
    return data
  }

  const logout = async () => {
    // await $auth.logout().catch((e) => {
    //   console.error(e)
    //   $toast(
    //     'Error',
    //     e.response.data.message,
    //     ToastType.error
    //   )
    // }).then(e => {
    //   $cookies.removeAll()
    //   localStorage.clear()
    // })

    const data: HTTPResponse = await $auth
      .logout($auth.options.defaultStrategy).catch(e => {
        console.error(e)
        $toast(
          'Error',
          e.response.data.message,
          ToastType.error
        )
        return e
      })
  }

  const passwordForgot = async (form: PasswordForgotForm): Promise<HTTPResponse> => {
    // await $axios.get(ApiEndpoint.AuthPasswordForgot).catch((e) => console.error(e))
    await sanctum()
    const data = await $axios.post(ApiEndpoint.AuthPasswordForgot, form)
      .then((e) => {
        $toast(
          'Success',
          // 'Check your mailbox to create a new password',
          e.data.message,
          ToastType.success
        )
        return e
      }).catch((e) => {
        console.error(e)
        $toast(
          'Error',
          e.response.data.message,
          ToastType.error
        )
        return e
      })

    return data as HTTPResponse
  }

  const passwordReset = async (form: PasswordResetForm): Promise<HTTPResponse> => {
    await sanctum()
    const data = await $axios.post(ApiEndpoint.AuthPasswordReset, form)
      .then((e) => {
        console.log(e)
        $toast(
          'Success',
          // 'Check your mailbox to create a new password',
          e.data.message,
          ToastType.success
        )
        return e
      }).catch((e) => {
        console.error(e)
        // emailError.value = api.data.errors.email[0]
        $toast(
          'Error',
          // `${api.data.message} ${$apiMessage(api.data)}`,
          e.response.data.message,
          ToastType.error
        )
      })

    return data as HTTPResponse
  }

  return {
    login,
    register,
    registerAndLogin,
    logout,
    passwordForgot,
    passwordReset,
  }
}

export default useAuth
