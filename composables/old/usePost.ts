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

import { ref, useFetch, useContext } from '@nuxtjs/composition-api'

export const getPosts = () => {
  const posts = ref({})
  const ctx = useContext()
  const toExecute: any = []
  const { fetch: fetchPost } = useFetch(async () => {
    posts.value = await ctx.$axios.$get(
      'https://jsonplaceholder.typicode.com/posts'
    )
  })
  console.log(posts)

  return {
    posts
  }
}

export const usePost = (id: number) => {
  const post = ref({})
  const ctx = useContext()
  const toExecute: any = []
  const { fetch: fetchPost } = useFetch(async () => {
    post.value = await ctx.$axios.$get(
      'https://jsonplaceholder.typicode.com/posts/' + id
    )
    await Promise.all(toExecute.map((cb: () => any) => cb()))
  })

  return {
    post,
    fetchPost,
    onFetchPost: (fn: any) => toExecute.push(fn)
  }
}
