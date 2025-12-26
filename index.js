const yearElements = document.getElementsByTagName("year")
for (let ele of yearElements) {
  ele.innerHTML = new Date().getFullYear()
}


root = document.querySelector("html")
root.dataset.theme = "light"
const dayNight = document.querySelector("day-night")

dayNight.onclick = () => {
  if (root.dataset.theme === "light") {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
}

