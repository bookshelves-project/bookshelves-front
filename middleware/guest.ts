import { Middleware } from '@nuxt/types'

const guest: Middleware = (context) => {
  if (context.$auth.loggedIn) {
    // context.redirect(context.localePath({
    //   name: 'dashboard',
    // }))
  }
}

export default guest
