<template>
  <div class="relative pt-16 pb-32 overflow-hidden">
    <feature-highlighted
      v-for="feature in features"
      :key="feature.id"
      :position-image="feature.position"
      :blockquote="{
        text: feature.blockquote.text,
        author: feature.blockquote.author,
      }"
      :image="`/images/home/${feature.image}`"
      :title="feature.title"
      :icon="feature.icon"
    >
      <template #text>
        {{ feature.text }}
      </template>
      <template #cta>
        <app-button :color="`white`" :to="feature.cta.route" class="mt-6">
          {{ feature.cta.text }}
        </app-button>
      </template>
    </feature-highlighted>
  </div>
</template>

<script>
import featureHighlighted from './feature-highlighted.vue'
export default {
  name: 'FeaturesHighlight',
  components: { featureHighlighted },
  data() {
    return {
      features: [
        {
          title: 'Find the book that fits you!',
          icon: 'book',
          position: 'right',
          blockquote: {
            text: "Maybe it's not quite legal but it's cool!",
            author: 'An enthusiastic reader',
          },
          image: 'book_reading_alt.svg',
          text: 'A selection of more than a hundred works, find the one that will strike a chord with your soul. And come back for ten more. Search by title, author or series then download all the books of an author or series if you wish!',
          cta: {
            route: { name: 'books' },
            text: 'Discover all books',
          },
        },
        {
          title: 'Want to know your eReader?',
          icon: 'ereader',
          position: 'left',
          blockquote: {
            text: 'The world of eReaders is so vast!',
            author: 'A novice user',
          },
          image: 'ereaders.svg',
          text: 'Detailed guides are there to explain how to best manage your eReader but also to get to know the eBooks better in order to modify them if you wish.',
          cta: {
            route: { name: 'guides' },
            text: 'Discover guides',
          },
        },
        {
          title: 'Find the book that fits you!',
          icon: 'open-book',
          position: 'right',
          blockquote: {
            text: 'I am only interested in OPDS feeds adapted to my eReader with Koreader OS.',
            author: 'A very experimented reader',
          },
          image: 'book_reading.svg',
          text: 'You can download directly eBooks from your eReader with <b>Catalog</b> or you can use <b>OPDS</b> (Open Publication Distribution System) feed to get all eBooks on your favorite application. And if you want to read eBook directly in your browser with <b>Webreader</b>.',
          cta: {
            route: {
              name: 'content',
              params: { type: 'pages', slug: 'opds-catalog-more' },
            },
            text: 'Discover OPDS, Catalog & more',
          },
        },
      ],
    }
  },
}
</script>
