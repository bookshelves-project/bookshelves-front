<template>
  <app-button :href="href" color="primary" download>
    <div class="flex items-center">
      <svg-icon name="download" class="w-5 h-5" />
      <div class="flex items-center ml-1">
        <div class="flex mx-1">
          <span class="lg:mr-1">Download</span>
          <span class="hidden md:block">
            <slot />
          </span>
        </div>
        <div>({{ type }} {{ size }})</div>
      </div>
    </div>
  </app-button>
</template>

<script>
export default {
  name: 'ButtonDownload',
  props: {
    href: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'EPUB',
    },
  },
}
</script>
