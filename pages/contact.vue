<template>
  <div>
    <contact />
  </div>
</template>

<script>
import contact from '~/components/blocks/contact.vue'
export default {
  name: 'Contact',
  components: { contact },
  head() {
    const title = 'Contact us'
    const description = 'Leave us a short note'
    const image = `${process.env.BASE_URL}/open-graph.png`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/contact`,
        },
      ],
    }
  },
}
</script>
