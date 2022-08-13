export function useTools() {
  const stringSlugify = (text: string) => {
    if (text !== null && text !== undefined) {
      return text
        .toString()
        .toLowerCase()
        .replace(/["']/i, '-')
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
    }
  }

  const stringRandom = (L: number) => {
    let s = ''
    const randomchar = function () {
      const n = Math.floor(Math.random() * 62)
      if (n < 10) {
        return n
      } // 1-10
      if (n < 36) {
        return String.fromCharCode(n + 55)
      } // A-Z
      return String.fromCharCode(n + 61) // a-z
    }
    while (s.length < L) {
      s += randomchar()
    }
    return s
  }

  const objectIsEmpty = (object: object): boolean => {
    const isEmpty =
      object && Object.keys(object).length === 0 && object.constructor === Object
    return isEmpty || object === undefined
  }

  const arrayPushIfNotExist = (array: any[], value: any) => {
    const index = array.findIndex(x => x === value)
    if (index === -1) {
      array.push(value)
    }
  }

  const objectContainsObject = (object: object, list: []): boolean => {
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === object) {
        return true
      }
    }

    return false
  }

  const objectGetValue = (obj: Keyable, path: string): any => {
    if (!path) { return obj }
    const properties = path.split('.')
    const key = properties.shift() as string
    return objectGetValue(obj[key], properties.join('.')) ?? path
  }

  const arrayGroupBy = <T, K extends keyof T>(
    array: T[],
    groupOn: K | ((i: T) => string)
  ): Record<string, T[]> => {
    const groupFn = typeof groupOn === 'function' ? groupOn : (o: T) => o[groupOn]

    return Object.fromEntries(
      array.reduce((acc, obj) => {
        const groupKey = groupFn(obj)
        return acc.set(groupKey, [...(acc.get(groupKey) || []), obj])
      }, new Map())
    ) as Record<string, T[]>
  }

  return {
    stringSlugify,
    stringRandom,
    objectIsEmpty,
    objectContainsObject,
    objectGetValue,
    arrayPushIfNotExist,
    arrayGroupBy
  }
}
