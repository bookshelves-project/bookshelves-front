<template>
  <div>
    <page-title />
    <div class="px-4 py-2">
      <nuxt-link
        v-for="guide in guides"
        :key="guide.id"
        :to="guide.path"
        class="block my-2 text-lg font-semibold"
      >
        {{ guide.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import pageTitle from '~/components/blocks/page-title.vue'
export default {
  name: 'GuidesIndex',
  components: { pageTitle },
  async asyncData({ $content }) {
    const guides = await $content('guides', { deep: true })
      .only(['title', 'path'])
      .fetch()
    console.log(guides)
    // const content = await $content('documentation', { deep: true })
    // .only(['title', 'path'])
    // .fetch()

    // let pages = []
    // content.forEach((markdownFile) => {
    //   const path = markdownFile.path.replace('/documentation/', '').split('/')
    //   const Page = {
    //     label: path[0],
    //     guides: [],
    //     number: 0,
    //     route: 'type-slug',
    //   }
    //   pages.push(Page)
    // })

    // const pagesAll = pages

    // // delete duplicates
    // pages = pages.filter(
    //   (v, i, a) => a.findIndex((t) => t.label === v.label) === i
    // )
    // // alphabetic sorting
    // pages.sort((a, b) => (a.label > b.label ? 1 : -1))

    // pagesAll.forEach((pageA) => {
    //   pages.forEach((page) => {
    //     if (pageA.label === page.label) {
    //       page.number += 1
    //     }
    //   })
    // })

    // pages.unshift({ label: 'Home', iconStroke: false, route: 'home' })

    return {
      guides,
      // welcome,
      // pages,
    }
  },
}
</script>
