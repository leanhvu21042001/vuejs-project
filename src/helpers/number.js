export const onlyNumberOnKeypress = (event) => {
  // Get the key code of the pressed key
  const keyCode = event.which ? event.which : event.keyCode

  // Allow digits and a dot (for decimal values)
  const isAllowedKey = keyCode >= 48 && keyCode <= 57

  // If the pressed key is not allowed, prevent the default action
  if (!isAllowedKey) {
    event.preventDefault()
  }
}
