<template>
  <div class="relative my-3 md:my-20">
    <div
      class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
    >
      <div
        :class="
          rightPosition
            ? 'lg:max-w-xl lg:px-4 lg:py-16'
            : 'lg:py-32 lg:col-start-2'
        "
        class="mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0"
      >
        <div class="py-20">
          <div>
            <div
              class="flex items-center text-primary-600 dark:text-primary-500"
            >
              <img :src="highlight.icon" alt="" class="w-12 h-12" />
              <h2
                class="ml-3 text-3xl font-extrabold tracking-tight font-handlee"
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
            :to="localePath(highlight.ctaLink || '/')"
            class="mt-6"
          >
            {{ highlight.ctaText }}
          </app-button>
        </div>
        <div
          v-if="highlight.quoteText"
          class="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700"
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
        :class="rightPosition ? '' : 'lg:col-start-1'"
        class="mt-12 sm:mt-16 lg:mt-0 hidden lg:block"
      >
        <div
          class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
        >
          <img
            :class="rightPosition ? 'lg:left-0' : 'lg:right-0'"
            class="lg:absolute w-full rounded-xl lg:h-full lg:w-auto lg:max-w-none"
            :src="highlight.picture"
            :alt="highlight.title"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Highlight } from '~/types/cms/home-page'

const props = defineProps<{
  highlight: Highlight
  rightPosition: boolean
}>()
</script>
