<template>
  <form @submit.prevent="submit">
    <div class="space-y-6">
      <div class="px-4 py-5 md:rounded-lg md:p-6">
        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
          <div class="lg:col-span-1">
            <h3
              class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Password
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You can update your password here.
            </p>
          </div>
          <div class="mt-5 lg:mt-0 lg:col-span-2">
            <div class="space-y-6">
              <div class="grid grid-cols-6 gap-6">
                <field-text-input
                  v-model="form.current_password"
                  name="current_password"
                  label="Current password"
                  type="password"
                  class="col-span-6 lg:col-span-4"
                  required
                />
                <field-text-input
                  v-model="form.password"
                  name="password"
                  label="New password"
                  type="password"
                  class="col-span-6 lg:col-span-4"
                  required
                />
                <field-text-input
                  v-model="form.password_confirmation"
                  name="password_confirmation"
                  label="New password confirm"
                  type="password"
                  class="col-span-6 lg:col-span-4"
                  required
                >
                  <div v-if="passwordUpdate">
                    <span v-if="passwordsMatch" class="text-green-600"
                      >Yours passwords match.</span
                    >
                    <span v-else class="text-red-600"
                      >Yours passwords not match.</span
                    >
                  </div>
                  <br v-else />
                </field-text-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <app-button
        type="submit"
        color="primary"
        :disabled="passwordUpdate && !passwordsMatch"
      >
        <transition name="fade">
          <span v-if="!isLoading">Change password</span>
          <span v-else class="flex items-center space-x-1">
            <app-loading class="w-5 h-5" />
            <div>Processing</div>
          </span>
        </transition>
      </app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import useForm from '~/composables/useForm'
import { ApiEndpoint, ApiMessage, Profile, ToastType } from '~/types'

const { $axios, $toast } = useContext()
const { reset } = useForm()

const isLoading = ref(false)
const passwordUpdate = ref(false)
const passwordsMatch = ref(false)

const form = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})

watch(
  () => form.value.password,
  (newVal) => {
    checkPasswords()
  }
)
watch(
  () => form.value.password_confirmation,
  (newVal) => {
    passwordUpdate.value = true
    checkPasswords()
  }
)

const submit = async () => {
  isLoading.value = true

  // const api = await $repository(ApiEndpoint.AuthPasswordUpdate, false).update(
  //   form.value
  // )
  try {
    const api = await $axios.post(ApiEndpoint.AuthPasswordUpdate, form.value)
    $toast('Success!', api.data.message, ToastType.success)
    form.value = reset(form.value)
  } catch (error) {
    $toast('Error', error.response.data.message, ToastType.error)
  }
  // if (api.status === 200) {
  //   $toast('Success!', api.data.message, ToastType.success)
  // } else {
  //   $toast('Error', api.data.message, ToastType.error)
  // }

  isLoading.value = false
}

const checkPasswords = () => {
  if (form.value.password === form.value.password_confirmation) {
    passwordsMatch.value = true
  } else {
    passwordsMatch.value = false
  }
}
</script>
