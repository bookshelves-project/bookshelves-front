import build from './build'
import hooks from './hooks'
import meta from './meta'
import modules from './modules'
import {
  runtimeConfigPublic,
  runtimeConfigPrivate,
} from './runtime-config'

const config = {
  build,
  hooks,
  meta,
  modules,
  runtimeConfigPublic,
  runtimeConfigPrivate,
}

export default config
