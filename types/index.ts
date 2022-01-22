import type { MetaInfo, MetaPropertyCharset, MetaPropertyEquiv, MetaPropertyName, MetaPropertyMicrodata, MetaPropertyProperty } from 'vue-meta'
import type { Location } from 'vue-router'
import type { HTTPResponse } from '@nuxtjs/auth-next'
import type { AxiosResponse } from 'axios'
import type { ApiResponse, ApiPaginateResponse, ApiFormated, ApiMeta, Pagination, Query, ApiMessage } from './api'
import type { Book } from './entities/book'
import type { Serie } from './entities/serie'
import type { Author } from './entities/author'
import type { Entity, Tag } from './entities/index'
import type { Profile } from './entities/profile'
import type { Content } from './nuxt/content'
import type { Application, HomePage, CmsInitialization } from './cms'
import type { Route, ObjectLiteral, Keyable } from './nuxt'
import type { HeadMeta, HeadElement } from './nuxt/head'
import type { SelectedEntities } from './nuxt/components'
import { Toast, ToastAuto, ToastType } from './nuxt/toast'
import type { SwiperElement } from './nuxt/swiper'
import { ApiEndpoint } from './api/endpoints'
import { FormatLanguageType } from './nuxt/methods'

export {
  // api
  ApiResponse,
  ApiPaginateResponse,
  ApiFormated,
  ApiMeta,
  Pagination,
  Query,
  ApiMessage,
  // entities
  Book,
  Author,
  Serie,
  Entity,
  Tag,
  Profile,
  // content
  Content,
  // cms
  Application,
  HomePage,
  CmsInitialization,
  // nuxt
  Route,
  MetaInfo,
  MetaPropertyCharset,
  MetaPropertyEquiv,
  MetaPropertyName,
  MetaPropertyMicrodata,
  MetaPropertyProperty,
  ObjectLiteral,
  Keyable,
  HeadMeta,
  HeadElement,
  SelectedEntities,
  Location,
  // toast
  Toast,
  ToastAuto,
  ToastType,
  // modules
  SwiperElement,
  // endpoints
  ApiEndpoint,
  FormatLanguageType,
  HTTPResponse,
  AxiosResponse,
}
