<template>
  <div class="relative my-3 md:my-20">
    <div
      class="
        lg:mx-auto
        lg:max-w-7xl
        lg:px-8
        lg:grid
        lg:grid-cols-2
        lg:grid-flow-col-dense
        lg:gap-24
      "
    >
      <div
        :class="[
          {
            'max-w-xl px-4 lg:py-16': positionImage === 'right',
          },
          {
            'lg:py-32 lg:col-start-2': positionImage === 'left',
          },
        ]"
        class="mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0"
      >
        <div class="py-20">
          <div>
            <div class="flex items-center">
              <svg-icon :name="icon" class="w-12 h-12 text-primary-600" />
              <h2
                class="
                  ml-3
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-primary-600
                  font-handlee
                "
              >
                {{ title }}
              </h2>
            </div>
            <p class="mt-4 text-lg text-gray-500" v-html="text">
              <slot name="text" />
            </p>
          </div>
          <slot name="cta" />
        </div>
        <div v-if="blockquote" class="pt-6 mt-8 border-t border-gray-200">
          <blockquote>
            <div>
              <p class="text-base text-gray-500">
                &ldquo;{{ blockquote.text }}&rdquo;
              </p>
            </div>
            <footer class="mt-3">
              <div class="flex items-center space-x-3">
                <div class="text-base font-medium text-gray-700">
                  {{ blockquote.author }}
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
      <div
        :class="{
          'lg:col-start-1': positionImage === 'left',
        }"
        class="mt-12 sm:mt-16 lg:mt-0 hidden md:block"
      >
        <div
          class="
            pl-4
            -mr-48
            sm:pl-6
            md:-mr-16
            lg:px-0 lg:m-0 lg:relative lg:h-full
          "
        >
          <img
            v-if="image"
            :class="[
              { 'lg:left-0': positionImage === 'right' },
              { 'lg:right-0': positionImage === 'left' },
            ]"
            class="
              lg:absolute
              w-full
              rounded-xl
              lg:h-full lg:w-auto lg:max-w-none
            "
            :src="image"
            :alt="title"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureHighlighted',
  props: {
    positionImage: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right'].includes(val),
    },
    blockquote: {
      type: Object,
      default: () => {},
    },
    icon: {
      type: String,
      default: 'book',
    },
    image: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    text() {
      return this.$slots.text[0].text
    },
  },
}
</script>
