<template>
  <div class="space-y-6 xl:col-start-1 xl:col-span-2">
    <!-- Description list-->
    <section aria-labelledby="applicant-information-title">
      <div class="bg-white shadow sm:rounded-lg">
        <div v-if="book.serie" class="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            Serie: {{ book.serie.title }}
          </h2>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            Volume: {{ book.serie.number }}
          </p>
        </div>
        <div
          :class="{ 'border-t border-gray-200': book.serie }"
          class="px-4 py-5 sm:px-6"
        >
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Author</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ book.author.lastname }}, {{ book.author.firstname }}
              </dd>
            </div>
            <div v-if="book.publisher" class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Publisher</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ book.publisher.name }} ({{ $getDate(book.publishDate) }})
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Language</dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900">
                <img :src="book.language.flag" :alt="book.language.slug" />
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">ISBN</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <transition name="fade">
                  <span v-if="book.isbn">
                    {{ book.isbn }}
                  </span>
                  <span v-else class="italic text-gray-400">Undefined</span>
                </transition>
              </dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd
                v-if="book.description"
                class="mt-1 text-sm text-gray-900 word-wraping"
                v-html="book.description"
              ></dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <slot name="serie" />
    <slot name="isbn" />
  </div>
</template>

<script>
export default {
  name: 'BookInformation',
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
