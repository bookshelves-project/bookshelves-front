<script lang="ts" setup>
const route = useRoute()
const { formatAuthors } = useEntityMethods()

const { requestPage, response } = useHttpPage<Book>({
  endpoint: '/books',
  params: [
    route.params.author,
    route.params.slug
  ]
})
await requestPage()

const book = ref<Book>()
const title = ref<string>('')
const crumbs = ref<string[]>([])

if (response.value) {
  book.value = response.value.data
  const serie = book.value.serie
    ? ` · ${book.value.serie.title}, vol. ${book.value.volume} `
    : ''
  const authors = formatAuthors(book.value.authors)
  title.value = `${book.value.title} (${book.value.type}) ${serie}by ${authors}`

  crumbs.value = [
    'Books',
    `${book.value.authors[0].name}`,
    `${book.value.title}`
  ]
}

// const authors = this.formatAuthors(this.book.authors)
// const isbn: string = this.book.identifier
//   ? ((this.book.identifier.isbn13 || this.book.identifier.isbn) as string)
//   : ''

// return this.$metadata({
//   title: this.title,
//   description: this.book.summary,
//   image: this.book.cover?.og,
//   bookISBN: isbn,
//   bookAuthor: authors,
//   bookReleaseDate: this.book.publishDate?.toString(),
//   bookTag: formatTags(this.book.tags),
// })

useMetadata({
  title: title.value,
  description: book.value?.description,
  image: book.value?.media_social
})
</script>

<template>
  <main v-if="book" class="main-content">
    <app-header
      :title="book.title"
      :image="book.media?.url"
      :color="book.media?.color"
      :authors="book.authors"
      :crumbs="crumbs"
      favorite
    >
      <div class="mx-auto grid w-max space-y-3">
        <entity-download-button :download="book.download" :files="book.files" />
        <entity-reader-button :download="book.download" :files="book.files" />
      </div>
      <template #extra>
        <div class="text-sm flex items-center">
          in
          <entity-serie-link
            :serie="book.serie"
            :volume="book.volume"
            class="ml-1"
          />
        </div>
      </template>
    </app-header>
    <entity-book-overview :book="book" class="mb-6" />
  </main>
</template>
