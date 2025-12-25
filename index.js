const yearElements = document.getElementsByTagName('year')
for (let ele of yearElements) {
  ele.innerHTML = new Date().getFullYear()
}
