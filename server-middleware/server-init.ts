import { ServerMiddleware } from '@nuxt/types'

const serverInit: ServerMiddleware = function (req, res, next) {
  console.log(req)
}

export default serverInit
