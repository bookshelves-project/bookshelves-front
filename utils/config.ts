import build from './config/build'
import hooks from './config/hooks'
import meta from './config/meta'
import modules from './config/modules'
import {
  runtimeConfigPublic,
  runtimeConfigPrivate,
} from './config/runtime-config'

const config = {
  build,
  hooks,
  meta,
  modules,
  runtimeConfigPublic,
  runtimeConfigPrivate,
}

export default config
