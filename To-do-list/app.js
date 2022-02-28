const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById('grocery');
const sumbitBtn = document.querySelector('.submit-btn');
const conatiner = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


// variables

let editElement;
let editFlag = false;
let editID = "";

//sumbit form
form.addEventListener('submit', addItem)
// clear item
clearBtn.addEventListener('click',clearItems);

// load item
window.addEventListener('DOMContentLoaded',setupItem);
//


function addItem(e) {
    e.preventDefault()
    const value = grocery.value;
    const id = new Date().getTime().toString();
    // console.log(id);
    if (value && !editFlag) {
        //input not empty && not editing  adding new item
        // console.log('add item to list')
        creatList(id,value);
      
        //dsiplay alert
        displayAlert("item added to the list",'success');
        //show conatiner
        conatiner.classList.add('show-container')
        //add to local storage
        addToLoacalStorage(id,value);
        //set back to defalut
        SetBackToDefault();
    }
    else if (value && editFlag) {  // input is there && editing
        editElement.innerHTML=value;
        displayAlert('value changed','sucess');
        //edit local stoagr
        editLocalStorage(editID,value)
        SetBackToDefault();
    }
    else {
        displayAlert('please enter value','danger')
    }
}

//Display alert
function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);
    
    //remove alert
    setTimeout(function(){
        alert.textContent='';
        alert.classList.remove(`alert-${action}`);
    },1500)
}

//Clear list
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length>0){
        items.forEach(item=> {
            list.removeChild(item)
        });
    }
    conatiner.classList.remove("show-container");
    displayAlert("empty-list",'danger');
    SetBackToDefault();
    localStorage.removeItem('list')
}
//delete item
function deleteitem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        conatiner.classList.remove("show-container")
    }
    displayAlert("item removed",'danger');
    SetBackToDefault();
    //remove from local storage
    removeFromloacal(id)
}
//edit item
function edititem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //set edit itme
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set from value
    grocery.value = editElement.innerHTML;
    editFlag=true;
    editID = element.dataset.id;
    sumbitBtn.textContent = 'edit';
}

//set back to defalut
function SetBackToDefault(){
    grocery.value='';
    editFlag=false;
    editID=''
    sumbitBtn.textContent = 'sumbit';
}

//********* LOCAL STORAGE *******

function addToLoacalStorage(id,value){
    // console.log('added to local stage');
    const To_list = {id ,value}
    let item = getLocalStorage();
    item.push(To_list);
    console.log(item);
    localStorage.setItem('list',JSON.stringify(item));
}
function removeFromloacal(id){
    let items = getLocalStorage();
    items = items.filter((items)=>{
        if(items.id !==id){
            return items;
        }
    })
    localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id,value){
    let item = getLocalStorage();
    item = item.map((item)=>{
        if(item.id===id){
            item.value=value
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(item));
}
function getLocalStorage(){
    return localStorage.getItem('list')?
    JSON.parse(localStorage.getItem('list')):[];
}

/*********SETUP ITEMS ************/
function setupItem(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
            creatList(item.id,item.value)
        })
        conatiner.classList.add('show-container')
    }
}

function creatList(id,value){
    const element = document.createElement('article');
    //add class
    element.classList.add("grocery-item")
    //add id
    const attr = document.createAttribute('data-id');
    attr.value=id;
    element.setAttributeNode(attr)
    element.innerHTML=`<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;

    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener('click',deleteitem);
    editBtn.addEventListener('click',edititem);

    //append child
    list.appendChild(element);
}
// localStorage.setItem('orange',JSON.stringify(["item1","item2"]))
// const orange = JSON.parse(localStorage.getItem('orange'))
// console.log(orange);
// localStorage.removeItem('orange');