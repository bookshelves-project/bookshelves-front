import type { ApiRoute } from './api'

export interface UseHttpRequest extends ApiRoute {
  watch?: boolean
  auto?: boolean
}
