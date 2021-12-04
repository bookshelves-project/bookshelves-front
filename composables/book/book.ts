import { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const API_URL = '/books'

export default ($axios: AxiosInstance) => ({
  /**
   * Get all comments
   *
   * @return {Promise}
   */
  allBooks (): Promise<any[]> {
    return $axios
      .get(`${API_URL}`)
      .then((response: AxiosResponse) => {
        const { data } = response
        console.log(data)

        return data
      })
      .catch((error: AxiosError) => {
        console.error(error)
        throw error
      })
  }
})
