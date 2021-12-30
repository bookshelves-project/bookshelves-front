<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import {
  ApiEndpoint,
  ApiResponse,
  HTTPResponse,
  ToastAuto,
  ToastType,
} from '~/types'
import { randomString } from '~/utils/methods'

const { app, $repository, isDev } = useContext()
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: true,
})
const isLoading = ref(false)
const errors = ref({
  email: null,
  password: null,
})

const fillForm = () => {
  const name = randomString(6).toLowerCase()
  const email = `${name}@mail.com`
  const password = randomString(10)
  form.value = {
    name,
    email,
    password,
    password_confirmation: password,
    terms: true,
  }
}
const submit = async () => {
  const name = form.value.email.split('@')
  form.value.name = name[0]

  isLoading.value = true

  // const data = await $repository(ApiEndpoint.AuthRegister, false).create(
  //   form.value
  // )
  const { registerAndLogin, register, login } = useAuth(app)
  await register(form.value)
  await login(form.value)
  // await registerAndLogin(form.value)

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
      <!-- <template v-if="errors.email" #error>{{ errors.email[0] }}</template> -->
    </field-text-input>
    <field-text-input
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <!-- <template v-if="errors.password" #error>{{
        errors.password[0]
      }}</template> -->
    </field-text-input>
    <field-text-input
      v-model="form.password_confirmation"
      name="password_confirmation"
      label="Confirm password"
      type="password"
      required
    >
      <!-- <template v-if="errors.password_confirmation" #error>{{
        errors.password_confirmation[0]
      }}</template> -->
    </field-text-input>

    <div class="flex items-center space-x-2">
      <app-button type="submit" color="primary" align="center" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">Sign up</span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5 text-white" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
      <app-button
        v-if="isDev"
        type="button"
        aria-label="Fill form"
        @click="fillForm"
      >
        <svg-icon name="test" class="w-5 h-5" />
      </app-button>
    </div>
  </form>
</template>
