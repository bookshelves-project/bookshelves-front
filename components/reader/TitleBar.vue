<template>
  <transition name="slide-down">
    <div v-show="isTitleAndMenuShow" class="title-wrapper">
      <div class="left">
        <span class="icon-back icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    isTitleAndMenuShow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
