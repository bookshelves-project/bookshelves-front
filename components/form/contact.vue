<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import useForm from '~/composables/useForm'
import { useFormStore } from '~/stores/form'
import { ToastAuto } from '~/types'
import { randomString } from '~/utils/methods'

const { $axios, $toastAuto } = useContext()
const { reset } = useForm()
const store = useFormStore()

const form = ref({
  name: '',
  email: '',
  honeypot: false,
  message: '',
})
const test = ref({
  name: 'Name',
  email: 'user@mail.com',
  message: 'Message with some data.',
})
const errors = ref({
  name: '',
  email: '',
  message: '',
})

store.init(form, test)
store.setButton("Let's talk")
const submit = async () => {
  try {
    await $axios.post('/submission', form.value)
    reset(form.value)
    $toastAuto(ToastAuto.success)
  } catch (error) {
    console.log(error)
    $toastAuto(ToastAuto.error)
  }
}
store.setMethod(submit)

const response = store.getResponse()

const emailError = ref<string>()
</script>

<template>
  <div class="mt-6">
    <form-layout>
      <field-text-input
        v-model="form.name"
        name="name"
        label="Name"
        autocomplete="name"
        required
      />
      <field-text-input
        v-model="form.email"
        name="email"
        label="Email"
        autocomplete="email"
        required
      />
      <field-text-input
        v-model="form.message"
        name="message"
        label="Message"
        minlength="15"
        maxlength="1500"
        multiline
        required
      />
      <field-checkbox
        v-model="form.honeypot"
        name="conditions"
        label="Accept conditions"
        class="hidden"
      >
        Accept conditions about data privacy about
        {{ $config.appName }} to send your message to
        {{ $config.appName }} Team.
      </field-checkbox>
      <!-- <div class="sm:col-span-2">
        <div class="flex items-center space-x-2">
          <app-button
            type="submit"
            color="primary"
            align="center"
            class="w-full"
          >
            <transition name="fade">
              <div v-if="!loading" class="flex items-center space-x-2">
                <svg-icon name="airplane" class="w-5 h-5" />
                <div>Let's talk</div>
              </div>
              <div v-else class="flex items-center space-x-1">
                <app-loading class="w-5 h-5 text-white" />
                <div>Processing</div>
              </div>
            </transition>
          </app-button>
          <app-button v-if="isDev" type="button" @click="fillForm">
            <svg-icon name="test" class="w-5 h-5" />
          </app-button>
        </div>
      </div> -->
    </form-layout>
  </div>
</template>
