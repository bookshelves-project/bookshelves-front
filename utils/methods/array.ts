export const pushIfNotExist = (array: any[], value: any) => {
  const index = array.findIndex((x) => x === value)
  if (index === -1) {
    array.push(value)
  }
}

export const groupBy = <T, K extends keyof T>(
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
