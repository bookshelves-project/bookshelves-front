import { NuxtAppOptions } from '@nuxt/types'
import type { Auth, HTTPResponse } from '@nuxtjs/auth-next'
import { AxiosResponse } from 'axios'
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

const useAuth = ($auth: Auth) => {
  const { $repository, $axios, $toast, $apiMessage } = useContext()

  const login = async (form: LoginForm): Promise<HTTPResponse> => {
    if (form.remember) {
      $auth.options.cookie = {
        prefix: 'auth.',
        options: {
          path: '/',
          expires: 30,
          maxAge: 2628288,
          secure: true,
        },
      }
    }

    const data = await $auth
      .loginWith($auth.options.defaultStrategy, {
        data: form,
      }).catch(e => {
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

  const register = async (form: RegisterForm): Promise<HTTPResponse> => {
    // const data = await $repository(ApiEndpoint.AuthRegister, false)
    //   .create<ApiMessage>(form)
    const data = await $axios.post(ApiEndpoint.AuthRegister, form).catch((e) => console.error(e))

    if (data && data.status !== 200) {
      $toast(
        'Error',
        $apiMessage(data.data),
        ToastType.error
      )
    }

    return data as HTTPResponse
  }

  const registerAndLogin = async (form: RegisterForm): Promise<HTTPResponse> => {
    let data = await register(form)
    if (data.status === 200) {
      data = await login(form)
    }
    return data
  }

  const logout = async () => {
    await $auth.logout().catch((e) => {
      console.error(e)
      $toast(
        'Error',
        e.response.data.message,
        ToastType.error
      )
    })
  }

  const passwordForgot = async (form: PasswordForgotForm): Promise<HTTPResponse> => {
    // await $axios.get(ApiEndpoint.AuthPasswordForgot).catch((e) => console.error(e))
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
