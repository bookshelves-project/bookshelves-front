import { pushIfNotExist } from './methods/array'
import { calExactTimeDiff } from './methods/date'
import { formatAuthors, formatLanguage, formatTags } from './methods/entities'
import { containsObject, objectIsEmpty } from './methods/object'
import { capitalize, capitalizeEach, overflow, getHostname, randomString, slugify } from './methods/string'

export {
  pushIfNotExist,
  calExactTimeDiff,
  formatAuthors, formatLanguage, formatTags,
  containsObject, objectIsEmpty,
  capitalize, capitalizeEach, overflow, getHostname, randomString, slugify
}
