<script setup lang="ts">
import FormLayout from '@/components/form/layout/index.vue'
import FieldText from '@/components/field/text.vue'
import FieldSelect from '@/components/field/select.vue'
import FieldCheckbox from '@/components/field/checkbox.vue'
import { useFormStore } from '~~/store/form'
import { useApplicationStore } from '~~/store/application'

const { enums } = useApplicationStore()

const config = useRuntimeConfig()
const data = ref({
  name: '',
  email: '',
  reason: '',
  message: '',
  honeypot: false,
})
const test = ref({
  name: 'Name',
  email: 'user@mail.com',
  reason: 'other',
  message: 'Message with some data.',
  honeypot: false,
})
const conditions = `Accept conditions about data privacy about ${config.appName} to send your message to ${config.appName} Team.`

const store = useFormStore()

store.setForm({
  data: data.value,
  test: test.value,
})

const submit = async () => {
  const { sanctum } = useFetchable()
  await sanctum()

  await store.setRequest({
    endpoint: '/submission/send',
    method: 'POST',
    body: data.value,
  })
}
</script>

<template>
  <form-layout @submit="submit" title="Let's talk">
    <field-text v-model="data.name" name="name" label="Name" required />
    <field-text
      v-model="data.email"
      name="email"
      label="Email"
      type="email"
      required
    />
    <field-select
      v-model="data.reason"
      name="reason"
      label="Reason"
      placeholder="Select a reason"
      :options="enums.submissionsReasons"
      required
    />
    <field-text
      v-model="data.message"
      name="message"
      label="Message"
      multiline
      required
    />
    <field-checkbox
      v-model="data.honeypot"
      name="honeypot"
      label="Conditions"
      class="hidden"
    >
      {{ conditions }}
    </field-checkbox>
  </form-layout>
</template>
