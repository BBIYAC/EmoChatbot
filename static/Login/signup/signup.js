window.scrollTo(0,0)
var container = document.getElementById('big-container')
container.style.height = window.innerHeight + "px";

window.addEventListener('resize',(event)=>{
    var container = document.getElementById('big-container')
    container.style.height = window.innerHeight + "px";
})