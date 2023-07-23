<script setup lang="ts">
const items = [
  {
    title: 'Open formats',
    slug: 'epub',
    text: 'The available files are in open format, you can share and modify them.',
    media: 'feature-epub',
  },
  {
    title: 'Regardless of eReader',
    slug: 'ereader',
    text: 'Kobo, Bookeen, Vivlio or even Kindle (with Calibre), you can use books in EPUB format on many eReaders (for eBooks).',
    media: 'feature-ereader',
  },
  {
    title: 'Download & read',
    slug: 'download',
    text: 'Download a book and/or a serie of books add them to your eReader and start reading!',
    media: 'feature-download',
  },
  {
    title: 'Metadata',
    slug: 'metadata',
    text: 'All these informations that allows you to sort and find your books by author or series are integrated into each book.',
    media: 'feature-metadata',
  },
  {
    title: 'Multi languages',
    slug: 'languages',
    text: 'Books in several languages according to your preferences in order to reach a maximum number of readers.',
    media: 'feature-languages',
  },
  {
    title: 'OPDS, Catalog & Webreader',
    slug: 'feed',
    text: 'Use OPDS feed or Catalog to download your books directly on any device or read an eBook in your browser with Webreader.',
    media: 'feature-feed',
  },
]
</script>

<template>
  <div class="relative py-16 pb-16 sm:pt-24 lg:py-32">
    <div
      class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2
        class="text-base font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-500"
      >
        How to use Bookshelves
      </h2>
      <div class="mx-auto mt-5 max-w-prose text-xl text-gray">
        Let Bookshelves guide you through hundreds of books and let yourself be tempted by vast universes directly accessible by your eReader.
      </div>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div v-for="(feature, id) in items" :key="id" class="pt-6">
            <div
              class="flow-root rounded-lg bg-gray-50 px-6 pb-8 dark:bg-gray-800"
            >
              <div class="-mt-6">
                <div class="flex">
                  <div
                    class="mx-auto w-max rounded-md bg-primary-600 p-3 shadow"
                  >
                    <SvgIcon
                      :name="feature.media"
                      :title="feature.title"
                      class="h-8 w-8 text-white"
                    />
                  </div>
                </div>
                <h3
                  class="mt-5 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100"
                >
                  {{ feature.title }}
                </h3>
                <div class="mt-5 text-base text-gray">
                  {{ feature.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
