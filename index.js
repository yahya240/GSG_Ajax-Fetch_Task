
const todoContainer = document.querySelector('.todo-items-container')

// Main Todo List
let myTodoList = []


// Using Ajax to implement (read) request on jsonplaceholder fake API.
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
 if (xhr.readyState === 4 && xhr.status === 200) {
   const todos = JSON.parse(xhr.responseText);

    let todoList = todos.filter((item)=> item.id <= 5)
    myTodoList = todoList;

    insertIntoHtml(myTodoList)
 }
};
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
xhr.send();



// Using fetch to implement (create) request on jsonplaceholder fake API.

const addBtn = document.querySelector('.add-btn')
const removeBtn = document.querySelector('.remove-btn')
const sendBtn = document.querySelector('.send-btn')

const formSection = document.querySelector('.form-section')
const todoInput = document.querySelector('.todo-item-input')
const todoTextInput = document.querySelector('.todo-item-inputText')


// add button
addBtn.addEventListener('click',()=>{
    toggleForm('show')
})

// remove button
removeBtn.addEventListener('click',()=>{
    toggleForm('hidde')
})

// sending form request button
sendBtn.addEventListener('click', async ()=>{
    toggleForm('hidde')

    // fixing adding null input bug
    if(todoInput.value && todoTextInput.value){
        const myResponse = await getFetch(todoInput.value,todoTextInput.value);
        myTodoList.push(myResponse)
    
        insertIntoHtml(myTodoList)
    }

})



// reusable functions

//positng data with title and body input 
const getFetch = async (title,body)=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body: JSON.stringify({
            "userId": 1,
            "title": title,
            body: body,
            "completed": true
        }),
        headers:{
            "Content-type":'application/json; charset=UTF-8'
        }
    })
    const data = await res.json();
    return data; 
}

//inserting html elements from an array 
const insertIntoHtml = (arr)=>{
    let newTodolist = []
    arr.map((todo)=>{
        const {title,body} = todo;
        newTodolist.push(
            `<div class="todo-item">
                <h3>${title}</h3>
                <p>${body}</p>
                <div class="todo-item-icons">
                    <p class="red-icon">P1</p>
                    <p class="green-icon">Health</p>
                </div>
            </div>`)
    })

    return todoContainer.innerHTML = newTodolist.join('')
}


//toggling Form section 
const toggleForm = (x)=>{
    if(x === 'show'){
        removeBtn.style.display = 'block'
        sendBtn.style.display = 'block'
        addBtn.style.display = 'none'

        todoInput.value = ''
        todoTextInput.value = ''
        formSection.style.display = 'block'
    }else if(x === 'hidde'){
        removeBtn.style.display = 'none'
        sendBtn.style.display = 'none'
        addBtn.style.display = 'block'
    
        formSection.style.display = 'none'
    }
}

