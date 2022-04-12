<script setup lang="ts">
import AppButton from '@/components/app/button.vue'
defineProps<{
  highlights?: CmsHighlight[]
}>()
</script>

<template>
  <div
    v-if="highlights"
    class="relative overflow-hidden px-4 pt-10 lg:pt-16 pb-16"
  >
    <div
      v-for="(highlight, id) in highlights"
      :key="id"
      class="relative my-3 md:my-16 lg:my-20"
    >
      <div
        class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8"
      >
        <div
          :class="
            id % 2 === 0
              ? 'lg:max-w-xl lg:px-4 lg:py-16'
              : 'lg:col-start-2 lg:py-32'
          "
          class="mx-auto sm:px-6 lg:mx-0 lg:max-w-none lg:px-0"
        >
          <div class="py-20">
            <div>
              <div
                class="flex items-center text-primary-600 dark:text-primary-500"
              >
                <img :src="highlight.icon" alt="" class="h-12 w-12" />
                <h2
                  class="ml-3 font-handlee text-3xl font-extrabold tracking-tight"
                >
                  {{ highlight.title }}
                </h2>
              </div>
              <div
                class="mt-4 text-lg text-gray-500"
                v-html="highlight.text"
              ></div>
            </div>
            <app-button
              :color="`white`"
              :to="$localePath(highlight.ctaLink || '/')"
              class="mt-6"
            >
              {{ highlight.ctaText }}
            </app-button>
          </div>
          <div
            v-if="highlight.quoteText"
            class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700"
          >
            <blockquote>
              <div>
                <div class="text-base text-gray-500 dark:text-gray-400">
                  &ldquo;{{ highlight.quoteText }}&rdquo;
                </div>
              </div>
              <footer class="mt-3">
                <div class="flex items-center space-x-3">
                  <div
                    class="text-base font-medium text-gray-700 dark:text-gray-200"
                  >
                    {{ highlight.quoteAuthor }}
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div
          :class="id % 2 === 0 ? '' : 'lg:col-start-1'"
          class="mt-12 hidden sm:mt-16 lg:mt-0 lg:block"
        >
          <div
            class="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0"
          >
            <img
              :class="id % 2 === 0 ? 'lg:left-0' : 'lg:right-0'"
              class="w-full rounded-xl lg:absolute lg:h-full lg:w-auto lg:max-w-none"
              :src="highlight.picture"
              :alt="highlight.title"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
