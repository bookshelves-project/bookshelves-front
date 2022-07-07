<script setup lang="ts">
import FormLayoutSide from '@/components/form/layout/side.vue'
// import FormResetPassword from '@/components/form/reset-password.vue'

const title = 'Reset your password'

useMetadata({
  title,
})

// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Reset password',
//     })
//   },
// })
</script>

<template>
  <form-layout-side
    :title="title"
    cta="You have an error?"
    :cta-route="{ name: 'sign-in-forgot-password' }"
    image="/images/pages/password.svg"
  >
    <template #form>
      <form-reset-password />
    </template>
  </form-layout-side>
</template>
