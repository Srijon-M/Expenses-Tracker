const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const select = document.getElementById('select-tran');
// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 200},
//     {id: 3, text: 'Book', amount: -20},
//     {id: 4, text: 'Camera', amount: 150}
// ];

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add new transaction from input form
function addTransaction(e){
    e.preventDefault();
    if(text.value === '' || amount.value === ''){
        alert("Please enter a text and amount");
    }else{
        const transaction = {
            id: generateID(),
            type: select.value,
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
    
}

//Generate random id for transaction
function generateID(){
    return Math.floor(Math.random() * 100000000);
}

//Add transactions to DOM
function addTransactionDOM(transaction){
    //Get sign
    // const sign = transaction.type === 'expense' ? '-' : '+';
    
    const item = document.createElement('li');
    item.classList.add(transaction.type === 'expense' ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span><span>&#8377;</span>${Math.abs(transaction.amount)}</span>
        <button class='delete-btn' onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

//Update balance income and expenses
function updateValues(){
    // const amount = transactions.map(transaction => transaction.amount);
    // const total = amount
    //     .reduce((accumulator, item)=> (accumulator += item), 0)
    //     .toFixed(2);
    // const income = amount
    //     .filter(item => item > 0)
    //     .reduce((accumulator, item)=> (accumulator += item), 0)
    //     .toFixed(2);
    // const expense = (amount
    //     .filter(item => item < 0)
    //     .reduce((accumulator, item)=> (accumulator += item), 0) * -1)
    //     .toFixed(2);
    const income_type = transactions.filter(transaction => transaction.type ==='income');
    // console.log(income);
    const income_amount = income_type.map(transaction => transaction.amount);
    const income = income_amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // console.log(income);
    const expense_type = transactions.filter(transaction => transaction.type === 'expense');
    const expense_amount = expense_type.map(transaction => transaction.amount);
    const expense = expense_amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // const expense_amount = expense.reduce((accumulator, item) => (accumulator += item), 0)
    //                               .toFixed(2);
    const total = (income - expense).toFixed(2);
    balance.innerHTML = `
        <span>&#8377;</span>
        ${total}
    `;
    money_plus.innerHTML = `
        <span>&#8377;</span>
        ${income}
    `;
    money_minus.innerHTML = `
        <span>&#8377;</span>
        ${expense}
    `;
}

//Remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//Update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Form event listener
form.addEventListener('submit', addTransaction);

//Init function
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();