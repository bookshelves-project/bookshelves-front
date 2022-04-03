import build from './build'
import buildModules from './build-modules'
import hooks from './hooks'
import links from './links'
import metadata from '../metadata'
import modules from './modules'
import { privateRuntimeConfig, publicRuntimeConfig } from './runtime-config'
import vite from './vite'

const config = {
  build,
  buildModules,
  hooks,
  links,
  metadata,
  modules,
  publicRuntimeConfig,
  privateRuntimeConfig,
  vite,
}

export default config
