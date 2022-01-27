burger=document.querySelector('.burger');
navbar=document.querySelector('.navbar');
Navlist=document.querySelector('.nav-list');
rigthNav=document.querySelector('.rigth-nav');

burger.addEventListener('click',()=>{
    rigthNav.classList.toggle('v-class-resp');
    Navlist.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');

})