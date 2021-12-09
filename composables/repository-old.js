import { stringify } from 'qs'

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
export default $axios => resource => ({
  index(params) {
    const query = `?${stringify({ ...params })}`
    return $axios.$get(`${resource}${query}`).then(e => e.data)
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
