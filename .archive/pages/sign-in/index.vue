<script setup lang="ts">
import FormLayoutSide from '@/components/form/layout/side.vue'
import FormLogin from '@/components/form/login.vue'

const title = 'Sign in to your account'

useMetadata({
  title
})

// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Sign in',
//     })
//   },
// })
</script>

<template>
  <form-layout-side
    :title="title"
    cta="Do you want to register?"
    :cta-route="{ name: 'sign-up' }"
    image="/images/pages/login.svg"
  >
    <template #form>
      <form-login />
    </template>
  </form-layout-side>
</template>
