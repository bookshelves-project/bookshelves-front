<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import useFavorite from '~/composables/useFavorite'
import { Entity, HTTPResponse, ToastType } from '~/types'

const context = useContext()
const router = useRouter()

const isDev = context.isDev

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const formTesting = ref({
  email: 'admin@mail.com',
  password: 'password',
  remember: true,
})
const isLoading = ref(false)
const errors = ref({
  email: '',
  password: '',
})

const fillForm = () => {
  form.value = formTesting.value
}
const submit = async () => {
  isLoading.value = true

  // if (form.value.remember) {
  //   $auth.options.cookie = {
  //     prefix: 'auth.',
  //     options: {
  //       path: '/',
  //       expires: 30,
  //       maxAge: 2628288,
  //       secure: true,
  //     },
  //   }
  // }

  // try {
  //   const sanctumData = await $axios.get(
  //     'http://localhost:8000/api/sanctum/csrf-cookie'
  //   )
  //   console.log(sanctumData)

  //   const loginData = await $axios.post(
  //     'http://localhost:8000/api/login',
  //     form.value
  //   )
  //   console.log(loginData)

  //   // router.push('/profile')
  // } catch (error) {
  //   console.error(error)
  //   isLoading.value = false
  // }

  const { login } = useAuth(context.app)
  await login(form.value)

  // await $auth
  //   .loginWith($auth.options.defaultStrategy, {
  //     data: form.value,
  //   })
  //   .catch((e) => {
  //     const response: HTTPResponse = e.response
  //     $toast(
  //       'Error',
  //       // `${response.data.message} ${$apiMessage(response.data)}`,
  //       `${response.data.message}`,
  //       ToastType.error
  //     )
  //     isLoading.value = false
  //   })
  isLoading.value = false
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submit">
    <field-text-input
      v-model="form.email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      required
    >
      <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
    </field-text-input>
    <field-text-input
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <template v-if="errors.password" #error>{{
        errors.password[0]
      }}</template>
    </field-text-input>

    <div class="justify-between md:flex md:items-center">
      <field-checkbox
        v-model="form.remember"
        name="remember_me"
        label="Remember me"
      />
      <div class="mt-6 text-sm md:mt-0">
        <nuxt-link
          :to="localePath({ name: 'sign-in-forgot-password' })"
          class="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-400 hover:underline"
        >
          Forgot your password?
        </nuxt-link>
      </div>
    </div>

    <div class="flex items-center justify-center space-x-2">
      <app-button type="submit" align="center" color="primary" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">Sign in</span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
      <app-button v-if="isDev" type="button" @click="fillForm">
        <svg-icon name="test" class="w-5 h-5" />
      </app-button>
    </div>
  </form>
</template>
