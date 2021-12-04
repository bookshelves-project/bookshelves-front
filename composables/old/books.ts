// import { ref, useFetch } from '@nuxtjs/composition-api'
// import { defineComponent } from '@nuxtjs/composition-api'

// function usePost (id: number) {
//   const post = ref({})

//   const { fetch: fetchPost } = useFetch(async () => fetch('https:jsonplaceholder.typicode.com/posts/' id)
//     .then(response => response.json())
//     .then(json => post.value = json)
//   )

//   return {
//     post,
//     fetchPost
//   }
// }

import { stringify } from 'qs'
import { ref, useFetch, useAsync, useContext } from '@nuxtjs/composition-api'
import { Book } from '~/types'

export const getBooks = (perPage = 32) => {
  const books = ref<Book[]>([])
  const ctx = useContext()
  const toExecute: any = []
  useAsync(async () => {
    books.value = await ctx.$axios
      .$get(`/books?${stringify({ perPage })}`)
      .then((e) => {
        return e.data
      })
  })

  return {
    books
  }
}

export const getBookRoute = (author: string, slug: string) => {
  const ctx = useContext()
  return ctx.localePath({
    name: 'books-author-slug',
    params: {
      author,
      slug
    }
  })
}

export const getBook = (slug: string) => {
  const book = ref<Book>()
  const ctx = useContext()
  const toExecute: any = []
  useFetch(async () => {
    book.value = await ctx.$axios.$get(`/books/${slug}`).then((e) => {
      return e.data
    })
  })

  return {
    book
  }
}
