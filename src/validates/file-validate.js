export const isFileSizeValid = (files, maxSize) => {
  let valid = true
  if (files) {
    files.map((file) => {
      const fileSize = file.size
      if (fileSize > maxSize) {
        valid = false
      }
    })
  }
  return valid
}

export const isFileTypesValid = (files, authorizedExtensions) => {
  let valid = true
  if (files) {
    files.map((file) => {
      if (!authorizedExtensions.includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}
