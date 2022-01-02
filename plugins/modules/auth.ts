// export default function ({ $auth }) {
//   if (!$auth.loggedIn) {
//     return
//   }

//   const username = $auth
//   console.log($auth)
// }

import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ $auth, $cookies }) => {
  if (!$auth.loggedIn) {
    // console.log(context.$auth.loggedIn)
    return
  }
  console.log('auth')
  // const token = $cookies.get('XSRF-TOKEN')
  // const today = new Date()
  // const expires = new Date()
  // expires.setDate(today.getDate() + 30)
  // $cookies.set('XSRF-TOKEN', token, {
  //   expires
  // })
}

export default auth
