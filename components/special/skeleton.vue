<template>
  <div class="space-y-6 display-grid sm:space-y-0">
    <div v-for="i in 4" :key="i.id" class="pt-10 pb-10 animate-pulse">
      <div class="flex space-x-3">
        <div class="bg-gray-300 h-52 w-36 rounded-md"></div>
        <div class="mt-3 space-y-4">
          <div
            v-for="j in 2"
            :key="j.id"
            class="h-6 w-28 rounded-md bg-gray-300"
          ></div>
        </div>
      </div>
    </div>
    <!-- <entity-card
            v-for="book in books.data"
            :key="book.id"
            :cover="book.picture.base"
            :color="book.picture.color"
            :title="book.title"
            :route="{
              name: 'books-slug',
              params: { author: book.meta.author, slug: book.meta.slug },
            }"
          >
            <template #primary>
              {{ $overflow(book.title, 50) }}
            </template>
            <template #secondary>
              <div v-for="(author, authorId) in book.authors" :key="authorId">
                {{ author.name }}
                <span
                  v-if="
                    book.authors.length > 1 &&
                    authorId !== book.authors.length - 1
                  "
                >
                  &
                </span>
              </div>
            </template>
            <template #tertiary>
              <div v-if="book.serie" class="italic">
                {{ book.serie.title }},<br />
                vol. {{ book.volume }}
              </div>
              <div class="mt-1">
                {{ formatLanguage(book.language) }}
              </div>
            </template>
          </entity-card> -->
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
}
</script>
