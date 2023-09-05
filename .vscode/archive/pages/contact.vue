<script setup lang="ts">
const title = 'Leave us a short note'
const image = '/images/pages/contact.svg'

useMetadata({
  title,
  image,
})
</script>

<template>
  <form-layout-side :title="title" :image="image">
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
