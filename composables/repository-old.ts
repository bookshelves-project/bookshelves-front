import { stringify } from 'qs'
import { Book } from '~/types'
// import axios from 'axios'
// import { useContext } from '@nuxtjs/composition-api'
// const ctx = useContext()

// export default ($axios) => ({
//   create(payload) {},

//   show(id) {},

//   async index() {
//     const result = await $axios.get(
//       `/books?${stringify({
//         'perPage': '32',
//       })}`
//     )
//     return result.data
//   },

//   update(payload, id) {},

//   delete(id) {},
// })
// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default (axios: any) => (resource: string) => ({
  index (params: object = {}): Promise<Book[]> {
    const queryParams: Array<string> = []
    if (typeof params === 'string') {
      console.log(params)
      queryParams.push(params)
    }
    const query = `?${stringify({ ...queryParams })}`
    return axios.$get(`${resource}${query}`).then((e: any) => e.data)
  }
  // show(id) {
  //   return $axios.$get(`${resource}/${id}`)
  // },
  // create(payload) {
  //   return $axios.$post(`${resource}`, payload)
  // },
  // update(id, payload) {
  //   return $axios.$post(`${resource}/${id}`, payload)
  // },
  // delete(id) {
  //   return $axios.$delete(`${resource}/${id}`)
  // },
})
