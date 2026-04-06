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
//  Rolagem horizontal
let cards = document.querySelector(".boxsabores")
let esq = document.querySelector(".setleft")
let dir = document.querySelector(".setright")

dir.addEventListener( "click" , () => {
  cards.scrollLeft += 300
} )
esq.addEventListener( "click" , () => {
  cards.scrollLeft -= 300
} )
// Imagens banner
let sli = document.querySelector(".imgbnn")
let tdsli = document.querySelectorAll(".imgsbox").length

let indexsli = 0

setInterval(function(){  

indexsli++

 if ( indexsli >= tdsli){
  indexsli = 0 
}
sli.style.transform = `translateX(-${indexsli * 100}%)`;
},2000)