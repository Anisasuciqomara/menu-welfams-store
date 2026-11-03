const toggle=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("show"));
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
document.querySelectorAll(".year").forEach(el=>el.textContent=new Date().getFullYear());
