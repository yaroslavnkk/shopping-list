const itemInput = document.querySelector("#item-input");
const list = document.querySelector("#item-list");
const addButton = document.querySelector('.btn');
const form = document.querySelector('#item-form');
const clearButton = document.querySelector('#clear');
const filter = document.querySelector('#filter');

function displayItems(){
    const itemsToDisplay = getItemsFromLocalStorage();
    itemsToDisplay.forEach(item => addItemToDOM(item));
    checkUI();
}
function addItem(e){
    e.preventDefault();
    const input = itemInput.value;
    if(input === ''){
        alert('Please, input text');
        return;
    }
    if(checkIfItemExists(input)){
        alert('Item already exists');
        return;
    }
    addItemToDOM(input);
    addItemToLocalStorage(input);
    itemInput.value = '';
    checkUI();
}

function addItemToDOM(item){
    const newItem = document.createElement('li');
    newItem.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    newItem.appendChild(button);
    list.appendChild(newItem);
}
function addItemToLocalStorage(item){
    let itemsForLocalStorage = getItemsFromLocalStorage();
    itemsForLocalStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsForLocalStorage));
}

function getItemsFromLocalStorage(){
    let itemsForLocalStorage;
    if(localStorage.getItem('items') === null){
        itemsForLocalStorage = [];
    }else{
        itemsForLocalStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsForLocalStorage;
}
function createButton(classes){
    const btn = document.createElement('button')
    btn.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    btn.appendChild(icon);
    return btn;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    checkUI();
}

function removeItem(item){
    item.remove();
    removeItemFromLocalStorage(item.textContent);
}
function removeItemFromLocalStorage(text){
    const itemsForLocalStorage = getItemsFromLocalStorage();
    const updatedItemsForLocalStorage = itemsForLocalStorage.filter(item => item !== text);
    localStorage.setItem('items', JSON.stringify(updatedItemsForLocalStorage));
}
function clearItems(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
        localStorage.removeItem('items');
    }
    checkUI();
}
function checkUI(){
    const items = document.querySelectorAll('li');
    if(items.length === 0){
        clearButton.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearButton.style.display = 'block';
        filter.style.display = 'block';
    }
}
function filterItems(e){
    let filterValue = e.target.value.toLowerCase();
    const items = document.querySelectorAll('li');
    items.forEach(item => {
        if(!item.firstChild.textContent.toLowerCase().includes(filterValue)){
            item.style.display = 'none'
        }else{
            item.style.display = 'flex'
        }
    })
}
function checkIfItemExists(item){
    const itemsInLocalStorage = getItemsFromLocalStorage();
    return itemsInLocalStorage.includes(item);
}
function init(){
    form.addEventListener('submit', addItem);
list.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}
init();