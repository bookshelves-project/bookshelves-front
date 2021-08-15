<template>
  <div
    class="
      flex
      items-center
      justify-between
      pb-6
      mb-3
      border-b
      dark:border-gray-600
      md:mb-10
    "
    :class="border ? 'border-gray-200' : 'border-transparent'"
  >
    <div class="sm:items-center sm:flex sm:justify-between">
      <div :class="{ 'flex items-center': image }">
        <img
          v-if="image"
          :src="image"
          alt="user picture"
          class="object-cover w-16 h-16 rounded-full"
          loading="lazy"
        />
        <div :class="{ 'ml-5': image }">
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
    <slot />
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
    image: {
      type: String,
      default: null,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="postcss" scoped></style>
