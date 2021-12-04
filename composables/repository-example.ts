import { AxiosInstance } from 'axios'

/**
 * Default implementation of the axios repository.
 * You may access this and use the basic axios without invoking $axios in your files.
 *
 * When using solely this, you don't access to intellisense feature because you need to
 * define the interfaces and bind to your responses. See the social.repository.ts example
 * for reference.
 *
 * @return
 */
export default ($axios: AxiosInstance) => (resource: string): any => ({
  index (): any {
    return $axios.get(`${resource}`)
  },

  show (id: string): any {
    return $axios.get(`${resource}/${id}`)
  },

  create (payload: any): any {
    return $axios.post(`${resource}`, payload)
  },

  update (id: string, payload: any): any {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete (id: string): any {
    return $axios.delete(`${resource}/${id}`)
  }
})
