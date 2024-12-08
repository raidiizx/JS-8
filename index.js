let lists = [];
const todoPerPages = 20;
const todoEl = document.getElementById('showTodos');
const numberEl = document.getElementById('showPages');

function getPageNumber() {
    return parseInt(numberEl.innerHTML);
}

function maxPagesNumber() {
    return Math.ceil(lists.length / todoPerPages)
}

async function fetchData() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => { lists = data })
        .catch(error => console.log(error))
}

function renderPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > maxPagesNumber()) {
        return;
    }
    numberEl.innerHTML = pageNumber;
    const startIndex = (pageNumber - 1) * todoPerPages;
    const endIndex = (pageNumber * todoPerPages) - 1;
    renderTodos(startIndex, endIndex);
}

function renderTodos(startIndex, endIndex) {
    todoEl.innerHTML = '';
    for (let i = startIndex; i <= endIndex; i++) {
        const html = `<div>
        <div>UserID: ${lists[i].userId} </div>
        <div>ID: ${lists[i].id} </div>
        <div>Title: ${lists[i].title} </div>
        <div>Complete: ${lists[i].completed ? '✅' : '❌'} </div>
        </div>
        <hr>`;
        todoEl.innerHTML += html;
    }
}

function nextPages() {
    const currentNumber = getPageNumber();
    renderPage(currentNumber + 1);
}

function prevPages() {
    const currentNumber = getPageNumber();
    renderPage(currentNumber - 1);
}

function callfunction() {
    fetchData()
        .then(() => { renderPage(1); })
        .catch(error => console.log(error));
}


callfunction();