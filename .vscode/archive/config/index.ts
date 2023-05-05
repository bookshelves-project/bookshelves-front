import app from './app'
import build from './build'
import head from './head'
import modules from './modules'
import {
  runtimeConfigPrivate,
  runtimeConfigPublic,
} from './runtime-config'

const config = {
  app,
  build,
  head,
  modules,
  runtimeConfigPublic,
  runtimeConfigPrivate,
}

export default config
