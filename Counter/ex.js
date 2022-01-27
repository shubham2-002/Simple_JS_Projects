let count = 0;
let bt1 = document.querySelector(".increase")
let bt2 = document.querySelector(".decrease")
let bt3 = document.querySelector(".reset")
const value = document.querySelector('#value');


bt1.addEventListener('click',function(){
    count++;
    if(count>0){
        value.style.color="green"
    }
    value.textContent=count;
})
bt2.addEventListener('click',function(){
    count--;
    if(count<0){
        value.style.color="red"
    }
    
    value.textContent=count;
})
bt3.addEventListener('click',function(){
    count=0;
    value.style.color="#222"
    value.textContent=count;
})