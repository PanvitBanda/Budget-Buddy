const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalAmountElem = document.getElementById("totalAmount");
const filterCategory = document.getElementById("filterCategory");
const themeToggle = document.getElementById("themeToggle");

let expenses = JSON.parse(localStorage.getItem("budget-expenses")) || [];

function saveExpenses() {
  localStorage.setItem("budget-expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let filteredExpenses = filterCategory.value === "all"
    ? expenses
    : expenses.filter(e => e.category === filterCategory.value);

  let total = 0;

  filteredExpenses.forEach((expense, index) => {
    const li = document.createElement("li");
    const infoDiv = document.createElement("div");
    infoDiv.className = "expense-info";
    infoDiv.innerHTML = `
      <strong>${expense.title}</strong>
      <small>${expense.category} | ${expense.date}</small>
    `;

    const amountDiv = document.createElement("div");
    amountDiv.className = "expense-actions";
    amountDiv.innerHTML = `
      <span>₹${expense.amount}</span>
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    li.appendChild(infoDiv);
    li.appendChild(amountDiv);
    expenseList.appendChild(li);

    total += Number(expense.amount);
  });

  totalAmountElem.textContent = `₹${total}`;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newExpense = {
    title: titleInput.value.trim(),
    amount: amountInput.value,
    date: dateInput.value,
    category: categoryInput.value
  };

  if (newExpense.title && newExpense.amount && newExpense.date && newExpense.category) {
    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    expenseForm.reset();
  }
});

filterCategory.addEventListener("change", renderExpenses);

document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
  if (localStorage.getItem("budget-theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("budget-theme", document.body.classList.contains("dark") ? "dark" : "light");
});
