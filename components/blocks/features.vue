<template>
  <div class="relative py-16 bg-white sm:py-24 lg:py-32">
    <div
      class="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl"
    >
      <h2
        class="text-base font-semibold tracking-wider text-indigo-600 uppercase"
      >
        How to use Bookshelves
      </h2>
      <p class="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
        Let Bookshelves guide you through hundreds of eBooks and let yourself be
        tempted by vast universes directly accessible by your eReader.
      </p>
      <div class="mt-12">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.id" class="pt-6">
            <div class="flow-root px-6 pb-8 rounded-lg bg-gray-50">
              <div class="-mt-6">
                <div>
                  <span
                    class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </span>
                </div>
                <h3
                  class="mt-8 text-lg font-medium tracking-tight text-gray-900"
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
          icon: '',
          label: 'EPUB files',
          text:
            'EPUB files, a free DRM format that can be exchanged and edited at will',
        },
        {
          icon: '',
          label: 'Regardless of eReader',
          text:
            'Kobo, Bookeen, Vivlio or even Kindle (with Calibre), you can use eBooks in EPUB format on many eReaders',
        },
        {
          icon: '',
          label: 'Easy',
          text:
            'Download an eBook and/or a serie of eBook, ajoutez les eBooks à votre liseuse et lisez !',
        },
        {
          icon: '',
          label: 'Metadata',
          text:
            'All this information that allows you to sort and find your books by author or series is integrated into each eBook',
        },
      ],
    }
  },
}
</script>
