<template>
  <div>
    <div
      class="
        space-y-2
        text-base text-gray-400
        md:space-y-0 md:items-center md:flex
        xl:text-center
      "
    >
      <div class="flex">
        <a
          href="https://creativecommons.org"
          target="_blank"
          rel="noopener noreferrer"
          title="Creative commons"
          aria-label="Creative commons"
          class="
            flex
            items-center
            space-x-2
            transition-colors
            duration-100
            hover:text-gray-500
            dark:hover:text-gray-300
            mx-auto
          "
        >
          <span class="flex space-x-1">
            <svg-icon
              v-for="license in licenses"
              :key="license.id"
              :alt="license.label"
              :name="license.name"
              class="w-5 h-5"
            ></svg-icon>
          </span>
          <span>{{ date(2020) }}</span>
        </a>
      </div>
      <span class="flex">
        <div class="mx-auto md:flex">
          <span class="hidden mx-1 md:block">·</span>
          <nuxt-link
            v-if="team"
            :to="`/pages/about`"
            class="
              transition-colors
              duration-100
              hover:text-gray-500
              dark:hover:text-gray-300
            "
            >{{ team }}</nuxt-link
          >
          <span class="hidden mx-1 md:block">·</span
          ><span v-if="packageJson" class="block md:flex"
            >{{ packageJson.license }} license</span
          ><span class="hidden md:block">.</span>
        </div>
      </span>
    </div>
    <div class="flex mt-6 lg:mt-0">
      <layout-back-to-top class="mx-auto" />
    </div>
  </div>
</template>

<script>
import metadata from '@/plugins/metadata/metadata'
import packageJson from '@/package.json'

export default {
  name: 'LayoutFooterBottom',
  data() {
    return {
      team: process.env.AUTHOR || metadata.website.author,
      packageJson,
      licenses: [
        {
          label: 'Creative Commons',
          name: `creative-commons/cc`,
        },
        {
          label: 'Creative Commons By',
          name: `creative-commons/by`,
        },
        {
          label: 'Creative Commons Nc',
          name: `creative-commons/nc`,
        },
      ],
    }
  },
  methods: {
    date(begin) {
      begin = parseInt(begin)
      const current = new Date().getFullYear()
      const year = `${begin} - ${current}`
      if (begin === current) {
        return begin
      }
      return year
    },
  },
}
</script>
