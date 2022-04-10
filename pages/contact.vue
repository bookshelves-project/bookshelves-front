<script setup lang="ts">
import FormLayoutSide from '@/components/form/layout/side.vue'
import FormContact from '@/components/form/contact.vue'

const { updateSocialTags } = useSocialTags()

updateSocialTags({ title: 'Contact', img: '/images/pages/contact.svg' })
useHead({
  title: 'Contact',
  meta: [
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
})
</script>

<template>
  <form-layout-side
    title="Leave us a short note "
    image="/images/pages/contact.svg"
  >
    <template #text>
      <div>
        Do you like what we offer or do you hate our work? Do not hesitate to
        let us know with this nice form!
      </div>
      <div class="mt-2">
        <small>
          Just kidding, if you hate what we do, you can leave, that would be
          cool!
        </small>
      </div>
    </template>
    <template #form>
      <form-contact />
    </template>
  </form-layout-side>
</template>
