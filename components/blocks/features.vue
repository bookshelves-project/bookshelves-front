<template>
  <div class="relative py-16 sm:py-24 lg:py-32">
    <div
      class="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
    >
      <h2
        class="text-base font-semibold tracking-wider uppercase text-primary-600"
      >
        How to use Bookshelves
      </h2>
      <p class="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
        Let Bookshelves guide you through hundreds of eBooks and let yourself be
        tempted by vast universes directly accessible by your eReader.
      </p>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.id" class="pt-6">
            <div
              class="flow-root px-6 pb-8 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div class="-mt-6">
                <div
                  class="inline-flex items-center justify-center p-3 rounded-md shadow bg-primary-600"
                >
                  <svg-icon :name="feature.icon" class="w-8 h-8 text-white" />
                </div>
                <h3
                  class="mt-5 text-lg font-medium tracking-tight text-gray-900"
                >
                  {{ feature.label }}
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  {{ feature.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {
      features: [
        {
          icon: 'epub',
          label: 'EPUB files',
          text:
            'EPUB files format to be lightest as possible, a free DRM format that can be shared and edited at will, you can edit any eBook with Calibre',
        },
        {
          icon: 'ereader',
          label: 'Regardless of eReader',
          text:
            'Kobo, Bookeen, Vivlio or even Kindle (with Calibre), you can use eBooks in EPUB format on many eReaders',
        },
        {
          icon: 'download',
          label: 'Download & read',
          text:
            'Download an eBook and/or a serie of eBook, add them to your Ereader and start reading!',
        },
        {
          icon: 'code',
          label: 'Metadata',
          text:
            'All these informations that allows you to sort and find your books by author or series are integrated into each eBook',
        },
        {
          icon: 'languages',
          label: 'Multi languages',
          text:
            'eBooks in several languages according to your preferences in order to reach a maximum number of readers.',
        },
        {
          icon: 'user-group',
          label: 'Account or guest',
          text:
            "You can use Bookshelves with an free account or as guest, it's up to you.",
        },
      ],
    }
  },
}
</script>
