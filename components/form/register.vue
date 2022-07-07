<script setup lang="ts">
// import useAuth from '~/composables/useAuth'
import FormLayout from '@/components/form/layout/index.vue'
import FieldText from '@/components/field/text.vue'
import FieldCheckbox from '@/components/field/checkbox.vue'
import { randomString } from '~/utils/methods'
import { useFormStore } from '~~/store/form'

// const { $auth } = useContext()
// const { registerAndLogin } = useAuth()

const data = ref({
  email: '',
  password: '',
  password_confirmation: '',
})
const test = ref({
  email: `${randomString(6).toLowerCase()}@mail.com`,
  password: 'password',
  password_confirmation: 'password',
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
    endpoint: '/register',
    method: 'POST',
    body: data.value,
  })
}

// const emailError = ref<string>()
</script>

<template>
  <form-layout title="Sign up" @submit="submit">
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
    <field-text
      v-model="data.password_confirmation"
      name="password_confirmation"
      label="Confirm password"
      type="password"
      required
    >
      <!-- <template v-if="errors.password_confirmation" #error>{{
        errors.password_confirmation[0]
      }}</template> -->
    </field-text>
  </form-layout>
</template>
