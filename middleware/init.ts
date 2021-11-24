import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { ApiResponse } from '~/types/ApiResponse'
import { Application } from '~/types/application'
import { useUserStore } from '~/stores/user'

export default defineNuxtMiddleware((ctx) => {
  // const user = useUserStore()
  // const storeEmpty =
  //   user.$state.application &&
  //   Object.keys(user.$state.application).length === 0 &&
  //   Object.getPrototypeOf(user.$state.application) === Object.prototype
  const cookieEmpty = ctx.$cookies.get('app')
  // ctx.$cookies.remove('app')
  // console.log(cookieEmpty)

  if (!cookieEmpty) {
    const app = ctx.$axios.get(`/application`).then((e) => {
      const response: ApiResponse = e.data
      const app: Application = response.data
      ctx.$cookies.set('app', app)
      // user.setApplication(app)
    })
  }
})

// import { Middleware } from '@nuxt/types'

// const init: Middleware = (context) => {
//   // Use context
//   console.log('init app')
// }

// export default init
