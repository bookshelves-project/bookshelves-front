<script setup lang="ts">
const title = 'Forgot your password?'

useMetadata({
  title,
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
