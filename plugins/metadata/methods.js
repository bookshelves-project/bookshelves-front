export const getChunks = (array, size = 2) => {
  const chunks = array.reduce(
    (rows, key, index) =>
      (index % size === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  )

  return chunks
}
