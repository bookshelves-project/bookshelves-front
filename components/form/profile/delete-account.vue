<template>
  <form @submit.prevent="submit">
    <div class="space-y-6">
      <div class="px-4 py-5 md:rounded-lg md:p-6">
        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
          <div class="lg:col-span-1">
            <h3
              class="text-lg font-medium leading-6 text-red-600 dark:text-red-400"
            >
              Delete account
            </h3>
            <p class="mt-1 text-sm text-red-700 dark:text-red-700">
              If you delete your account, all your data will be deleted.
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
                <field-checkbox
                  v-model="form.confirm"
                  name="confirm"
                  label="Confirmation"
                  class="col-span-6 lg:col-span-4"
                  required
                >
                  Confirm you want to delete your account, check this to click
                  on below button.
                </field-checkbox>
                <div class="col-span-6 lg:col-span-4">
                  <app-button
                    type="submit"
                    color="danger"
                    :disabled="!form.confirm"
                  >
                    <transition name="fade">
                      <span v-if="!isLoading">Delete your account</span>
                      <span v-else class="flex items-center space-x-1">
                        <app-loading class="w-5 h-5" />
                        <div>Processing</div>
                      </span>
                    </transition>
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import useAuth from '~/composables/useAuth'
import useForm from '~/composables/useForm'
import { ApiEndpoint, ApiMessage, Profile, ToastType } from '~/types'

const { $axios, $toast, $auth } = useContext()
const { reset } = useForm()
const { logout } = useAuth($auth)

const isLoading = ref(false)

const form = ref({
  current_password: '',
  confirm: false,
})

const submit = async () => {
  isLoading.value = true

  // const api = await $repository(ApiEndpoint.AuthPasswordUpdate, false).update(
  //   form.value
  // )
  try {
    const api = await $axios.post(ApiEndpoint.ProfileDelete, form.value)
    $toast('Success!', api.data.message, ToastType.success)
    form.value = reset(form.value)
    await logout()
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
</script>
