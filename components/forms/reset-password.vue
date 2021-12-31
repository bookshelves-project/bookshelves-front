<script setup lang="ts">
import { ApiEndpoint, ToastType } from '~/types'

const { isDev, $repository, $toast, $apiMessage, query } = useContext()
const form = ref({
  token: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const formTesting = ref({
  token: '',
  email: 'admin@mail.com',
  password: 'password2',
  password_confirmation: 'password2',
})
const isLoading = ref(false)
const emailError = ref<string>()
const fillForm = () => {
  form.value = formTesting.value
}
const submit = async () => {
  isLoading.value = true
  emailError.value = ''
  form.value.token = query.value.token as string

  const api = await $repository(ApiEndpoint.AuthResetPassword, false).create(
    form.value
  )
  if (api.status === 200) {
    $toast(
      'Success',
      'Check your mailbox to create a new password',
      ToastType.success
    )
  } else {
    // emailError.value = api.data.errors.email ? api.data.errors.email[0] : ''
    $toast(
      'Error',
      // `${api.data.message} ${$apiMessage(api.data)}`,
      ToastType.error
    )
  }

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
      <template v-if="emailError" #error>{{ emailError }}</template>
    </field-text-input>

    <field-text-input
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      required
    />
    <field-text-input
      v-model="form.password_confirmation"
      name="password_confirmation"
      label="Confirm password"
      type="password"
      required
    />

    <div class="flex items-center justify-center space-x-2">
      <app-button type="submit" align="center" color="primary" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">Change my password</span>
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
