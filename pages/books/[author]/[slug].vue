<script lang="ts" setup>
const route = useRoute()
const { formatAuthors } = useEntityMethods()

const { asyncRequest, response } = useHttpPage<Book>({
  endpoint: '/books',
  params: [
    route.params.author,
    route.params.slug
  ]
})
await asyncRequest()

const book = ref<Book>()
const title = ref<string>('')
const breadcrumb = ref<string>()

if (response.value) {
  book.value = response.value.data
  const serie = book.value.serie
    ? ` · ${book.value.serie.title}, vol. ${book.value.volume} `
    : ''
  const authors = formatAuthors(book.value.authors)
  title.value = `${book.value.title} (${book.value.type}) ${serie}by ${authors}`

  const serieBreadcrumb = book.value.serie
    ? `, ${book.value.serie.title} (vol. ${book.value.volume})`
    : ''
  breadcrumb.value = `${book.value.title} (${book.value.type})${serieBreadcrumb}`
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
  image: book.value?.cover?.simple
})
</script>

<template>
  <main v-if="book" class="main-content">
    <app-header
      :title="book.title"
      :image="book.cover?.thumbnail"
      :image-original="book.cover?.original"
      :color="book.cover?.color"
      :authors="book.authors"
      :breadcrumb="breadcrumb"
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
