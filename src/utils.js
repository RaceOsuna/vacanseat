function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  })
}

function formatDate(date) {
  const splitDate = date.split('-')
  return new Date(`${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`).toDateString().split('202')[0]
}

export { scrollToTop, formatDate }