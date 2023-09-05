<script setup lang="ts">
import type { IconType } from '#build/svg-transformer'

const config = useRuntimeConfig()

const items: {
  title: string
  slug: string
  text: string
  icon: IconType
  media: string
  ctaText: string
  ctaLink: string
  externalLink?: boolean
  quoteText?: string
  quoteAuthor?: string
}[] = [
  {
    title: 'Find the book that fits you!',
    slug: 'books',
    text: 'A selection of more than a hundred works, find the one that will strike a chord with your soul. And come back for ten more. Search by title, author or series then download all the books of an author or series if you wish!',
    icon: 'highlight-books',
    media: '/images/highlight/books.svg',
    ctaText: 'Discover all books',
    ctaLink: 'books',
    quoteText: 'Maybe it\'s not quite legal but it\'s cool!',
    quoteAuthor: 'An enthusiastic reader',
  },
  {
    title: 'Want to use OPDS?',
    slug: 'guides',
    text: 'You can download directly books from your eReader with OPDS (Open Publication Distribution System) feed to get all books on your favorite application',
    icon: 'highlight-guides',
    media: '/images/highlight/guides.svg',
    ctaText: 'Discover OPDS',
    ctaLink: `${config.public.apiUrl}/opds`,
    externalLink: true,
    quoteText: 'The world of eReaders is so vast!',
    quoteAuthor: 'A novice user',
  },
  {
    title: 'Catalog or Webreader',
    slug: 'features',
    text: 'If your eReader can\'t use OPDS, you can use Catalog, a very basic UI to works on any device, search your book and download it. But you can read your eBook directly in your browser with Webreader, available on each book page.',
    icon: 'highlight-features',
    media: '/images/highlight/features.svg',
    ctaText: 'Discover Catalog',
    ctaLink: `${config.public.apiUrl}/catalog`,
    externalLink: true,
    quoteText: 'I am only interested in OPDS feeds adapted to my eReader with Koreader OS.',
    quoteAuthor: 'A very experimented reader',
  },
]
</script>

<template>
  <div class="relative overflow-hidden px-4 pt-10 lg:pt-16 pb-16">
    <div
      v-for="(highlight, id) in items"
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
                <SvgIcon :name="highlight.icon" class="h-12 w-12" />
                <h2
                  class="ml-3 font-handlee text-3xl font-extrabold tracking-tight"
                >
                  {{ highlight.title }}
                </h2>
              </div>
              <div
                class="mt-4 text-lg text-gray-500"
                v-html="highlight.text"
              />
            </div>
            <div class="mt-6">
              <AppButton
                color="white"
                :to="!highlight.externalLink ? highlight.ctaLink : undefined"
                :href="highlight.externalLink ? highlight.ctaLink : undefined"
              >
                {{ highlight.ctaText }}
              </AppButton>
            </div>
          </div>
          <div
            v-if="highlight.quoteText"
            class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700"
          >
            <blockquote>
              <div>
                <div class="text-base text-gray">
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
              :src="highlight.media"
              :alt="highlight.title"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
