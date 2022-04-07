<script setup lang="ts">
// import useAuth from '~/composables/useAuth'
import FormLayout from '@/components/form/layout.vue'
import FieldText from '@/components/field/text.vue'
import FieldCheckbox from '@/components/field/checkbox.vue'
import { useFormStore } from '~~/store/form'

// const { login } = useAuth()

const data = ref({
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
  data: data.value,
  test: test.value,
  loadingCanEnd: false,
})

const submit = async () => {
  await store.setRequest({
    endpoint: '/login',
    method: 'POST',
    body: data.value,
  })
}

// const emailError = ref<string>()
</script>

<template>
  <form-layout @submit="submit" title="Sign-in">
    <field-text
      v-model="data.email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      required
    >
      <!-- <template v-if="errors.email" #error>{{ errors.email[0] }}</template> -->
    </field-text>
    <field-text
      v-model="data.password"
      name="password"
      label="Password"
      type="password"
      required
    >
      <!-- <template v-if="errors.password" #error>{{
        errors.password[0]
      }}</template> -->
    </field-text>

    <div class="justify-between md:flex md:items-center">
      <field-checkbox
        v-model="data.remember"
        name="remember_me"
        label="Remember me"
      />
      <div class="mt-6 text-sm md:mt-0">
        <router-link
          :to="$localePath({ name: 'sign-in-forgot-password' })"
          class="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-400 hover:underline"
        >
          Forgot your password?
        </router-link>
      </div>
    </div>
  </form-layout>
</template>
