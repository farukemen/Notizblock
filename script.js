let addTodo = [];
let addTrashTodo = [];
let addArchivTodo = [];

function onPageLoad() {
    load();
    render();
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < addTodo.length; i++) {
        let add = addTodo[i];
        if (add.length > 0) {
            content.innerHTML += /*html*/`
        <ul>
            <li>${add}
            <button onclick="delArchiv(${i})"><i class="fa-solid fa-check"></i></button>
            <button onclick="delTrash(${i})"><i class="fa-solid fa-trash"></i></button>
            </li>
        </ul>
        `;
        }
    }
}

/* all functions for add and delete trash */
function delArchiv(i) {
    getTodoArchivInList(i);
    addTodo.splice(i,1);
    render();
    save();
}

function delTrash(i) {
    getTodotrashInList(i);
    addTodo.splice(i, 1);
    render();
    save();
}

function add() {
    let myInput = document.getElementById('myInput');
    addTodo.push(myInput.value);
    render();
    save();
}

/* all functions for archiv */
function showArchivList() {
    let dialogArchiv = document.getElementById('dialog-archiv');
    dialogArchiv.innerHTML = '';
    for(let i = 0; i < addArchivTodo.length; i++) {
        let archivList = addArchivTodo[i];
        dialogArchiv.innerHTML += /*html*/ `
            <ul>
                <li class="li-trashlist">
                    ${archivList}
                    <button onclick="setTodoArchivInList(${i})"><i class="fa-solid fa-check"></i></button>
                    <button onclick="setTodoInTrash(${i})"><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
        `;
    }
}

function getTodoArchivInList(i) {
    addArchivTodo.push(addTodo[i]);
    showArchivList();
    save();
}

function setTodoArchivInList(i) {
    addTodo.push(addArchivTodo[i]);
    setTodoInTrash(i);
    render();
    save();
}

function setTodoInTrash(i) {
    addArchivTodo.splice(i,1);
    showArchivList();
    save();
}

function openArchiv() {
    document.getElementById('dialog-archiv-bg').classList.remove('d-none');
    showArchivList();
}

function closeArchiv() {
    document.getElementById('dialog-archiv-bg').classList.add('d-none');
}

/* all functions for trash */
function showTrashList() {
    let dialogTrash = document.getElementById('dialog-trash');
    dialogTrash.innerHTML = '';
    for (let i = 0; i < addTrashTodo.length; i++) {
        let trashList = addTrashTodo[i];
        dialogTrash.innerHTML += /*html*/ `
        <ul>
            <li class="li-trashlist">
                ${trashList}
                <button onclick="setTodoTrashInList(${i})"><i class="fa-solid fa-check"></i></button>
                <button onclick="delTodoFromTrash(${i})"><i class="fa-solid fa-trash"></i></button>
            </li>
        </ul>
        `;
    }
}

function getTodotrashInList(i) {
    addTrashTodo.push(addTodo[i]);
    showTrashList();
    save();
}

function delTodoFromTrash(i) {
    addTrashTodo.splice(i,1);
    showTrashList();
    save();
}

function setTodoTrashInList(i) {
    addTodo.push(addTrashTodo[i]);
    delTodoFromTrash(i);
    render();
    save();
}

function openTrash() {
    document.getElementById('dialog-trash-bg').classList.remove('d-none');
    showTrashList();
}

function closeTrash() {
    document.getElementById('dialog-trash-bg').classList.add('d-none');
}


function save() {
    let todoAsText = JSON.stringify(addTodo);
    let trashAsText = JSON.stringify(addTrashTodo);
    let archivAsText = JSON.stringify(addArchivTodo);
    localStorage.setItem('todo', todoAsText);
    localStorage.setItem('trash', trashAsText);
    localStorage.setItem('archiv', archivAsText);
}

function load() {
    let todoAsText = localStorage.getItem('todo');
    let trashAsText = localStorage.getItem('trash');
    let archivAsText = localStorage.getItem('archiv');
    if(todoAsText && trashAsText && archivAsText) {
        addTodo = JSON.parse(todoAsText);
        addTrashTodo = JSON.parse(trashAsText);
        addArchivTodo = JSON.parse(trashAsText);
    }
}
