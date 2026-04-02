let btn = document.querySelector(".dbaction")
let menu = document.querySelector(".lishe")
  btn.addEventListener("click" , function(a) {
    a.preventDefault()
    btn.classList.toggle("active")
    menu.classList.toggle("active")
  } )
  menu.addEventListener("click" , function(a) {
    a.preventDefault()
    btn.classList.toggle("active")
    menu.classList.toggle("active")
  } )
