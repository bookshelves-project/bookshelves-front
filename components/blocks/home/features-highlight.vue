<template>
  <div class="relative pt-16 pb-32 overflow-hidden">
    <feature-highlighted
      :position-image="`right`"
      :blockquote="{
        text: `Maybe it's not quite legal but it's cool!`,
        author: `An enthusiastic reader`,
      }"
      :image="`/images/book_reading_alt.svg`"
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
      :image="`/images/ereaders.svg`"
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
      :image="`/images/book_reading.svg`"
      :title="`Want to download from your eReader?`"
    >
      <template #text>
        If you want to download and read an eBook directly from your eReader you
        can do it, without any computer. With OPDS (Open Publication
        Distribution System) from Bookshelves you can access to very basic
        interface with your eReader browser to search and download any eBook
        from your eReader.
      </template>
      <template #cta>
        <app-button
          class="mt-6"
          :to="{ name: 'content', params: { type: 'pages', slug: 'opds' } }"
          :color="`white`"
        >
          Discover OPDS
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
