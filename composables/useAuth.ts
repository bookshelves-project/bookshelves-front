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
      }).catch(e => console.log(e))

    if (data && data.status !== 200) {
      // $toast(
      //   'Error',
      //   $apiMessage(data.data),
      //   ToastType.error
      // )
    }

    return data as HTTPResponse
  }

  const register = async (form: RegisterForm): Promise<AxiosResponse> => {
    const data = await $repository(ApiEndpoint.AuthRegister, false)
      .create<ApiMessage>(form)

    if (data.status !== 200) {
      $toast(
        'Error',
        $apiMessage(data.data),
        ToastType.error
      )
    }

    return data
  }

  const registerAndLogin = async (form: RegisterForm) => {
    const data = await register(form)
    if (data.status === 200) {
      await login(form)
    }
  }

  const logout = async () => {
    await $auth.logout().catch((e) => {
      console.error(e)
      $toast(
        'Error',
        // $apiMessage(data.data),
        ToastType.error
      )
    })
  }

  const passwordForgot = async (form: PasswordForgotForm) => {
    await $axios.post(ApiEndpoint.AuthPasswordForgot, form)
      .then((e) => {
        console.log(e)
        $toast(
          'Success',
          'Check your mailbox to create a new password',
          ToastType.success
        )
      }).catch((e) => {
        console.error(e)
        $toast(
          'Error',
          e.response.data.message,
          ToastType.error
        )
      })
  }

  const passwordReset = async (form: PasswordResetForm) => {
    await $axios.post(ApiEndpoint.AuthPasswordReset, form)
      .then((e) => {
        console.log(e)
        $toast(
          'Success',
          'Check your mailbox to create a new password',
          ToastType.success
        )
      }).catch((e) => {
        console.error(e)
        // emailError.value = api.data.errors.email[0]
        $toast(
          'Error',
          // `${api.data.message} ${$apiMessage(api.data)}`,
          '',
          ToastType.error
        )
      })
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
