// export default function ({ $auth }) {
//   const remember = $auth.$storage.getCookie(
//     `_remember.${$auth.options.defaultStrategy}`
//   )

//   if (typeof remember !== 'undefined') {
//     if ($auth.strategy.token.get() !== remember) {
//       $auth.setUserToken(remember)
//     }
//   }
// }

// import { Middleware } from '@nuxt/types'

// const guest: Middleware = (context) => {
//   if (context.$auth.loggedIn) {
//     // context.redirect(context.localePath({
//     //   name: 'dashboard',
//     // }))
//   }
// }

// export default guest
