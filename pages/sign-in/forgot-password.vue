<script setup lang="ts">
import FormLayoutSide from '@/components/form/layout/side.vue'
import FormForgotPassword from '@/components/form/forgot-password.vue'

const title = 'Forgot your password?'

useMetadata({
  title: title,
})

// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Forgot password',
//     })
//   },
// })
</script>

<template>
  <form-layout-side
    :title="title"
    cta="Do you want to sign-in?"
    :cta-route="{ name: 'sign-in' }"
    image="/images/pages/forgot-password.svg"
    reverse
  >
    <template #form>
      <form-forgot-password />
    </template>
  </form-layout-side>
</template>
