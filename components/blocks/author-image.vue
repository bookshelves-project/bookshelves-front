<template>
  <div>
    <v-lazy-image
      :alt="`Picture of ${authorName}`"
      :src="picture"
      src-placeholder="/images/no-cover.webp"
      class="cover"
    />
  </div>
</template>

<script>
export default {
  name: 'AuthorImage',
  props: {
    authorName: {
      type: String,
      default: 'Author',
    },
  },
  data() {
    return {
      picture: '/images/no-cover.webp',
    }
  },
  async created() {
    await this.getPicture()
  },
  methods: {
    async getPicture() {
      const pictureDefault = `${process.env.BASE_URL}/images/no-cover.webp`
      let picture = ''
      let authorName = this.authorName
      const regex = /\s/g
      authorName = authorName.replace(regex, '%20')
      const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=${authorName}&prop=pageimages&format=json&pithumbsize=512`
      try {
        const result = await this.$http.$get(url)
        const source = result.query.pages[Object.keys(result.query.pages)[0]]

        try {
          picture = source.thumbnail.source
        } catch (error) {
          picture = pictureDefault
        }
      } catch (error) {
        picture = pictureDefault
      }
      this.picture = picture
    },
  },
}
</script>

<style lang="postcss" scoped>
.cover {
  @apply object-cover w-full h-52 rounded-sm;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  transition: transform 0.5s ease, filter 0.3s;
}

@variants group-hover, hover, focus {
  .img-hover-zoom img {
    /* transform: scale(1.2); */
    filter: blur(2px);
  }
}
</style>
