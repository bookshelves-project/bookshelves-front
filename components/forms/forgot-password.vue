<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import useForm from '~/composables/useForm'
import { ApiEndpoint, ToastType } from '~/types'

const { isDev, $auth } = useContext()
const { passwordForgot } = useAuth($auth)
const { reset } = useForm()

const form = ref({
  email: '',
})
const formTesting = ref({
  email: 'admin@mail.com',
})
const isLoading = ref(false)
const emailError = ref<string>()
const fillForm = () => {
  form.value = formTesting.value
}
const submit = async () => {
  isLoading.value = true
  emailError.value = ''

  await passwordForgot(form.value)
  reset(form.value)

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

    <div class="flex items-center justify-center space-x-2">
      <app-button type="submit" align="center" color="primary" class="w-full">
        <transition name="fade">
          <span v-if="!isLoading">Get a new password</span>
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
