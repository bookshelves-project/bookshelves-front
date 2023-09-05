<script setup lang="ts">
// import useAuth from '~/composables/useAuth'
import { useFormStore } from '~~/stores/form'

const { login, logout, me, favorites } = useAuth()

const form = ref({
  email: '',
  password: '',
  remember: false,
  device_name: null,
})
const test = ref({
  email: 'superadmin@example.com',
  password: 'password',
  remember: true,
  device_name: 'web',
})
// const errors = ref({
//   email: '',
//   password: '',
// })

const store = useFormStore()
store.setForm({
  body: form.value,
  test: test.value,
})

const submit = async () => {
  await login({
    email: form.value.email,
    password: form.value.password,
  })
}

// const emailError = ref<string>()
</script>

<template>
  <div>
    <form-layout title="Sign-in" @submit="submit">
      <field-text
        v-model="form.email"
        name="email"
        label="Email"
        type="email"
        autocomplete="email"
        required
      />
      <field-text
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
        required
      />

      <div class="justify-between md:flex md:items-center">
        <field-checkbox
          v-model="form.remember"
          name="remember_me"
          label="Remember me"
        />
        <div class="mt-6 text-sm md:mt-0">
          <typed-link
            :to="{ name: 'sign-in-forgot-password' }"
            class="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-400 hover:underline"
          >
            Forgot your password?
          </typed-link>
        </div>
      </div>
    </form-layout>
  </div>
</template>
