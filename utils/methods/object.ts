// Check if an object in contain in an array
export const containsObject = (obj: object, list: []) => {
  let i
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true
    }
  }

  return false
}

// Check if object is empty
export const objectIsEmpty = (obj: object) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}
