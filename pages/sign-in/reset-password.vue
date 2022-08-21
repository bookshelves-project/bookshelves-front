<script setup lang="ts">
const title = 'Reset your password'

useMetadata({
  title
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
