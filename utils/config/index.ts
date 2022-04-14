import build from './build'
import buildModules from './build-modules'
import hooks from './hooks'
import links from './links'
import modules from './modules'
import { privateRuntimeConfig, publicRuntimeConfig } from './runtime-config'
import vite from './vite'

const config = {
  build,
  buildModules,
  hooks,
  links,
  modules,
  publicRuntimeConfig,
  privateRuntimeConfig,
  vite,
}

export default config
