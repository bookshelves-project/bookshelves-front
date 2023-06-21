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
      if (n < 10)
        return n
      // 1-10
      if (n < 36)
        return String.fromCharCode(n + 55)
      // A-Z
      return String.fromCharCode(n + 61) // a-z
    }
    while (s.length < L)
      s += randomchar()

    return s
  }

  const objectIsEmpty = (object: object): boolean => {
    const isEmpty
      = object && Object.keys(object).length === 0 && object.constructor === Object
    return isEmpty || object === undefined
  }

  const arrayPushIfNotExist = (array: any[], value: any) => {
    const index = array.findIndex(x => x === value)
    if (index === -1)
      array.push(value)
  }

  const objectContainsObject = (object: object, list: []): boolean => {
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === object)
        return true
    }

    return false
  }

  const objectGetValue = (obj: Keyable, path: string | number): any => {
    if (!path)
      return obj

    if (typeof path === 'number')
      path = path.toString()

    const properties = path.split('.')
    const key = properties.shift() as string
    return objectGetValue(obj[key], properties.join('.')) ?? path
  }

  function arrayGroupBy<T extends { [key: string]: any }>(
    arr: T[],
    firstCharKey: string,
  ): Record<string, T[]> {
    const sortedArray: Record<string, T[]> = {}

    arr.forEach((item) => {
      const firstChar = item[firstCharKey]
      if (!sortedArray[firstChar])
        sortedArray[firstChar] = []

      sortedArray[firstChar].push(item)
    })

    const sortedKeys = Object.keys(sortedArray).sort()
    const sortedObject: Record<string, T[]> = {}

    sortedKeys.forEach((key) => {
      sortedObject[key] = sortedArray[key]
    })

    return sortedObject
  }

  return {
    stringSlugify,
    stringRandom,
    objectIsEmpty,
    objectContainsObject,
    objectGetValue,
    arrayPushIfNotExist,
    arrayGroupBy,
  }
}
