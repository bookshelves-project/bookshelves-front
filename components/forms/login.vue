<script setup lang="ts">
import { HTTPResponse, ToastType } from '~/types'

const { isDev, $auth, $toast, $apiMessage } = useContext()
const router = useRouter()

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

  await $auth
    .loginWith($auth.options.defaultStrategy, {
      data: form.value,
    })
    .then((e) => {
      // console.log(e)
    })
    .catch((e) => {
      const response: HTTPResponse = e.response
      $toast(
        'Error',
        // `${response.data.message} ${$apiMessage(response.data)}`,
        `${response.data.message}`,
        ToastType.error
      )
      isLoading.value = false
    })
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submit">
    <fields-input-text
      v-model="form.email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      required
    >
      <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
    </fields-input-text>
    <fields-input-text
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <template v-if="errors.password" #error>{{
        errors.password[0]
      }}</template>
    </fields-input-text>

    <div class="justify-between md:flex md:items-center">
      <fields-checkbox
        v-model="form.remember"
        name="remember_me"
        label="Remember me"
      />
      <div class="mt-6 text-sm md:mt-0">
        <nuxt-link
          :to="localePath({ name: 'auth-forgot-password' })"
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
