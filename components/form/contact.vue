<script setup lang="ts">
import { useFormStore } from '~~/store/form'
import { useApplicationStore } from '~~/store/application'

const { enums } = useApplicationStore()
const { stringRandom } = useTools()

const config = useRuntimeConfig()
const data = ref({
  name: '',
  email: '',
  reason: '',
  message: '',
  honeypot: false
})
const test = ref({
  name: 'Name',
  email: 'user@gmail.com',
  reason: 'other',
  message: 'Message with some data.',
  honeypot: false
})
const conditions = `Accept conditions about data privacy about ${config.appName} to send your message to ${config.appName} Team.`

const store = useFormStore()

store.setForm({
  data: data.value,
  test: test.value
})

const submit = async () => {
  // const { sanctum } = useHttp()
  // await sanctum()

  const res = await store.request({
    endpoint: '/submission/send',
    method: 'POST',
    body: data.value
  }, {
    withToast: true,
    successMsg: 'Your message has been sent.'
  })
}
</script>

<template>
  <form-layout title="Let's talk" @submit="submit">
    <field-text v-model="data.name" name="name" label="Name" required />
    <field-text v-model="data.email" name="email" label="Email" type="email" required />
    <field-select
      v-model="data.reason"
      name="reason"
      label="Reason"
      placeholder="Select a reason"
      :options="enums.submissionsReasons"
      required
    />
    <field-text v-model="data.message" name="message" label="Message" multiline required />
    <field-checkbox v-model="data.honeypot" name="honeypot" label="Conditions" class="hidden">
      {{ conditions }}
    </field-checkbox>
  </form-layout>
</template>
