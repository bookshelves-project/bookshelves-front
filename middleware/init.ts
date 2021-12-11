import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useUserStore } from '~/archive/nuxt3/stores/user'
import { ApiResponse, Application } from '~/types'

export default defineNuxtMiddleware((ctx) => {
  // const user = useUserStore()
  // const storeEmpty =
  //   user.$state.application &&
  //   Object.keys(user.$state.application).length === 0 &&
  //   Object.getPrototypeOf(user.$state.application) === Object.prototype
  const cookie = ctx.$cookies.get('app')
  // ctx.$cookies.remove('app')

  if (cookie === undefined) {
    ctx.$axios.get('/cms/application').then((e) => {
      const response: ApiResponse = e.data
      const app: Application = response.data
      ctx.$cookies.set('app', app)
      // user.setApplication(app)
      console.log(e)
    })
  }
})

// import { Middleware } from '@nuxt/types'

// const init: Middleware = (context) => {
//   // Use context
//   console.log('init app')
// }

// export default init
