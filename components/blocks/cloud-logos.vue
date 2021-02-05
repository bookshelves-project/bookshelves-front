<template>
  <div class="bg-gray-100">
    <div class="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p
        class="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase"
      >
        These companies do not support us (and do not know us) but without their
        work, ours would not be possible.
      </p>
      <div
        class="grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5"
      >
        <a
          v-for="logo in logos"
          :key="logo.id"
          :href="logo.link"
          target="_blank"
          rel="noopener noreferrer"
          :title="logo.label"
          class="flex justify-center col-span-1 transition-all duration-300 md:col-span-2 lg:col-span-1 hover:zoom"
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
        <div class="justify-center mt-6 space-x-16 sm:flex">
          <a
            v-for="logo in specialThanksLogos"
            :key="logo.id"
            :href="logo.link"
            target="_blank"
            rel="noopener noreferrer"
            :title="logo.label"
            class="flex justify-center mx-auto mt-5 transition-all duration-300 sm:mx-0 hover:zoom w-max"
          >
            <icon
              :name="logo.icon"
              :size="80"
              class="text-gray-400"
              :stroke="logo.iconConfig ? logo.iconConfig.stroke : false"
            />
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
      specialThanksLogos: [
        {
          label: 'Calibre',
          link: 'https://calibre-ebook.com',
          icon: 'calibre',
        },
        {
          label: 'Pandoc',
          link: 'https://pandoc.org',
          icon: 'pandoc',
        },
        {
          label: 'Team AlexandriZ',
          link: 'https://twitter.com/teamalexandriz?lang=en',
          icon: 'team-alexandriz',
          iconConfig: {
            stroke: true,
          },
        },
      ],
    }
  },
}
</script>
