<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import { useFormStore } from '~/stores/form'

const { $auth } = useContext()
const { login } = useAuth()
const store = useFormStore()

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const test = ref({
  email: 'admin@mail.com',
  password: 'password',
  remember: true,
})
const errors = ref({
  email: '',
  password: '',
})

store.init(form, test)
store.setButton('Sign in')
store.setMethod(login)

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
  </form-layout>
</template>
