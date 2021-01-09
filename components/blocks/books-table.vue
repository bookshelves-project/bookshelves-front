<template>
  <div class="inline-block min-w-full align-middle border-b border-gray-200">
    <table class="min-w-full">
      <thead>
        <tr class="border-t border-gray-200">
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          ></th>
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          >
            Title
          </th>
          <th
            class="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 sm:table-cell bg-gray-50"
          >
            Author
          </th>
          <th
            class="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 lg:table-cell bg-gray-50"
          >
            Serie
          </th>
          <th
            class="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 lg:table-cell bg-gray-50"
          >
            Serie number
          </th>
          <th
            class="py-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
          ></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <project-row
          v-for="(book, bookId) in $store.state.books"
          :id="bookId"
          :key="bookId"
          :book="book"
        />

        <!-- More project rows... -->
      </tbody>
    </table>
  </div>
</template>

<script>
import projectRow from './project-row.vue'
export default {
  name: 'BooksTable',
  components: { projectRow },
}
</script>

<style lang="postcss" scoped></style>
