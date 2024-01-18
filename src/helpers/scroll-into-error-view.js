export const scrollIntoErrorView = (firstError) => {
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({
    behavior: 'smooth'
  })
  el.focus()
}
