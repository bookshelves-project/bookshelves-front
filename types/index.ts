import type { ApiResponse, ApiPaginateResponse, ApiFormated, ApiMeta, Pagination, Query } from './api'
import type { Book } from './book'
import type { Serie } from './serie'
import type { Entity } from './entity'
import type { Content } from './content'
import type { Application, HomePage } from './cms'
import type { Route } from './nuxt'
import { Toast, ToastAuto, ToastType } from './toast'
import type { SwiperElement } from './swiper'

export {
  // api
  ApiResponse,
  ApiPaginateResponse,
  ApiFormated,
  ApiMeta,
  Pagination,
  Query,
  // etnties
  Book,
  Serie,
  Entity,
  // content
  Content,
  // cms
  Application,
  HomePage,
  // nuxt
  Route,
  // toast
  Toast,
  ToastAuto,
  ToastType,
  // modules
  SwiperElement
}
