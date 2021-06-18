<template>
  <div class="relative pt-16 pb-32 overflow-hidden">
    <feature-highlighted
      :position-image="`right`"
      :blockquote="{
        text: `Maybe it's not quite legal but it's cool!`,
        author: `An enthusiastic reader`,
      }"
      :image="`/images/home/book_reading_alt.svg`"
      :title="`Find the book that fits you!`"
    >
      <template #text>
        A selection of more than a hundred works, find the one that will strike
        a chord with your soul. And come back for ten more. Search by title,
        author or series then download all the books of an author or series if
        you wish!
      </template>
      <template #cta>
        <app-button :color="`white`" :to="{ name: 'books' }" class="mt-6">
          Discover all books
        </app-button>
      </template>
    </feature-highlighted>
    <feature-highlighted
      :position-image="`left`"
      :image="`/images/home/ereaders.svg`"
      :title="`Want to know your eReader?`"
      :icon="`ereader`"
    >
      <template #text>
        Detailed guides are there to explain how to best manage your eReader but
        also to get to know the eBooks better in order to modify them if you
        wish.
      </template>
      <template #cta>
        <app-button class="mt-6" :to="{ name: 'guides' }" :color="`white`">
          Discover guides
        </app-button>
      </template>
    </feature-highlighted>
    <feature-highlighted
      :position-image="`right`"
      :icon="`open-book`"
      :image="`/images/home/book_reading.svg`"
      :title="`${$config.appName} can follow you everywhere`"
    >
      <template #text>
        You can download directly eBooks from your eReader with
        <b>Catalog</b> or you can use <b>OPDS</b> (Open Publication Distribution
        System) feed to get all {{ $config.appName }} eBooks on your favorite
        application.
      </template>
      <template #cta>
        <app-button
          class="mt-6"
          :to="{
            name: 'content',
            params: { type: 'pages', slug: 'opds-catalog' },
          }"
          :color="`white`"
        >
          Discover OPDS & Catalog
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
}
</script>
