<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import { useFormStore } from '~/stores/form'
import { randomString } from '~/utils/methods'

const { $auth } = useContext()
const { registerAndLogin } = useAuth()
const store = useFormStore()

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  // terms: true,
})
const email = `${randomString(6).toLowerCase()}@mail.com`
const password = 'password'
const test = ref({
  email,
  password,
  password_confirmation: password,
  // terms: true,
})
const errors = ref({
  email: '',
  password: '',
})

store.init(form, test)
store.setButton('Sign up')
store.setMethod(registerAndLogin)

const response = store.getResponse()

const emailError = ref<string>()
</script>

<template>
  <form-layout :loaded="false">
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
  </form-layout>
</template>
