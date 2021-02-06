<template>
  <div class="pb-6 mb-10 border-b border-gray-200">
    <div class="sm:flex sm:justify-between sm:items-baseline">
      <div class="sm:w-0 sm:flex-1">
        <h1
          id="message-heading"
          class="text-2xl font-extrabold font-handlee text-primary-600"
          v-html="title"
        ></h1>
        <h2
          class="mt-1 overflow-hidden text-sm text-gray-500 overflow-ellipsis"
          v-html="subtitle"
        ></h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeading',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped></style>
