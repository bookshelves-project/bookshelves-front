<script setup lang="ts">
import FormLayoutSide from '@/components/form/layout/side.vue'
import FormRegister from '@/components/form/register.vue'
import AppImg from '@/components/app/img.vue'

const title = 'Create your account'

useMetadata({
  title,
})

// @Component({
//   middleware: 'guest',
//   head() {
//     return this.$metadata({
//       title: 'Sign up',
//     })
//   },
// })
</script>

<template>
  <form-layout-side
    :title="title"
    cta="Do you have an account?"
    :cta-route="{ name: 'sign-in' }"
    image="/images/pages/register.svg"
    reverse
  >
    <template #form>
      <form-register />
    </template>
  </form-layout-side>
</template>
