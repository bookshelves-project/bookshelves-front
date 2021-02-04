<template>
  <div class="bg-gray-100">
    <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p
        class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
      >
        These companies do not support us (and do not know us) but without their
        work, ours would not be possible.
      </p>
      <div class="grid grid-cols-2 gap-8 mt-6 md:grid-cols-6 lg:grid-cols-5">
        <a
          v-for="logo in logos"
          :key="logo.id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
        >
          <icon :name="logo.icon" :size="100" class="text-gray-400" />
        </a>
      </div>
      <div>
        <p
          class="mt-8 text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
        >
          Special thanks to
        </p>
        <div class="mt-6">
          <a
            href="https://calibre-ebook.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
          >
            <icon name="calibre" :size="80" class="text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloudLogos',
  data() {
    return {
      logos: [
        {
          label: 'Kobo',
          link: 'https://www.kobo.com',
          icon: 'kobo',
        },
        {
          label: 'Bookeen',
          link: 'https://bookeen.com',
          icon: 'bookeen',
        },
        {
          label: 'Vivlio',
          link: 'https://www.vivlio.com/en/home',
          icon: 'vivlio',
        },
        {
          label: 'ePagine',
          link: 'https://www.epagine.fr',
          icon: 'epagine',
        },
        {
          label: 'Chapitre.com',
          link: 'https://www.chapitre.com',
          icon: 'chapitre-com',
        },
      ],
    }
  },
}
</script>

<style lang="postcss" scoped></style>
