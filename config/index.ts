import head from './head'
import modules from './modules'
import {
  runtimeConfigPrivate,
  runtimeConfigPublic,
} from './runtime-config'

const config = {
  private: runtimeConfigPrivate,
  public: runtimeConfigPublic,
}

export {
  head,
  modules,
  config,
}
