import build from './config/build'
import buildModules from './config/build-modules'
import hooks from './config/hooks'
import meta from './config/meta'
import modules from './config/modules'
import {
  runtimeConfigPublic,
  runtimeConfigPrivate,
} from './config/runtime-config'

const config = {
  build,
  buildModules,
  hooks,
  meta,
  modules,
  runtimeConfigPublic,
  runtimeConfigPrivate,
}

export default config
