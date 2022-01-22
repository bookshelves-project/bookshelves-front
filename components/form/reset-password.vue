<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import { useFormStore } from '~/stores/form'

const { $auth, query } = useContext()
const { passwordReset } = useAuth()
const store = useFormStore()

const form = ref({
  token: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const test = ref({
  token: query.value.token,
  email: 'admin@mail.com',
  password: 'password2',
  password_confirmation: 'password2',
})

store.init(form, test)
store.setButton('Reset password')
store.setMethod(passwordReset)

const response = computed(() => store.response)

const emailError = ref<string>()
</script>

<template>
  <form-layout>
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
    <template #extra>
      <div class="mt-3 text-center">
        If you have reset your password, you can
        <nuxt-link :to="localePath({ name: 'sign-in' })" class="internal-link"
          >sign in</nuxt-link
        >
        with your new password.
      </div>
    </template>
  </form-layout>
</template>
