import { pushIfNotExist, groupBy } from './methods/array'
import { calExactTimeDiff, date } from './methods/date'
import {
  formatAuthors,
  formatLanguage,
  formatTags,
  formatType,
  colorsList,
  instanceBook,
  instanceSerie,
  instanceAuthor,
} from './methods/entities'
import { containsObject, objectIsEmpty, getValue } from './methods/object'
import {
  capitalize,
  capitalizeEach,
  overflow,
  getHostname,
  randomString,
  slugify,
} from './methods/string'

export {
  pushIfNotExist,
  groupBy,
  calExactTimeDiff,
  date,
  formatAuthors,
  formatLanguage,
  formatTags,
  formatType,
  colorsList,
  instanceBook,
  instanceSerie,
  instanceAuthor,
  containsObject,
  objectIsEmpty,
  capitalize,
  capitalizeEach,
  overflow,
  getHostname,
  randomString,
  slugify,
  getValue,
}
