export const pushIfNotExist = (array: any[], value: any) => {
  const index = array.findIndex(x => x === value)
  if (index === -1) {
    array.push(value)
  }
}
