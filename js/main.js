const API = "http://localhost:3000/api/expenses";
let allExpenses = [];
let currentFilter = "All";

// Load all expenses on page load
async function loadExpenses() {
  try {
    const res = await fetch(API);
    allExpenses = await res.json();
    renderExpenses(allExpenses);
    updateTotal(allExpenses);
  } catch (err) {
    console.error("Failed to load:", err);
    document.getElementById("expenses").innerHTML = `
      <div class="col-12 text-center text-danger mt-5">
        <p>Could not connect to server. Make sure it is running.</p>
      </div>`;
  }
}

// Add new expense
async function addExpense() {
  const title = document.getElementById("title").value.trim();
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!title || !amount || !category) {
    alert("Please fill in title, amount and category");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category, date }),
    });
    const newExpense = await res.json();
    allExpenses.unshift(newExpense);
    renderExpenses(
      currentFilter === "All"
        ? allExpenses
        : allExpenses.filter((e) => e.category === currentFilter)
    );
    updateTotal(allExpenses);
    clearForm();
  } catch (err) {
    console.error("Failed to add:", err);
  }
}

// Delete expense
async function deleteExpense(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    allExpenses = allExpenses.filter((e) => e._id !== id);
    renderExpenses(
      currentFilter === "All"
        ? allExpenses
        : allExpenses.filter((e) => e.category === currentFilter)
    );
    updateTotal(allExpenses);
  } catch (err) {
    console.error("Failed to delete:", err);
  }
}

// Filter by category
function filterBy(category) {
  currentFilter = category;
  const filtered =
    category === "All"
      ? allExpenses
      : allExpenses.filter((e) => e.category === category);
  renderExpenses(filtered);
}

// Render expense cards
function renderExpenses(expenses) {
  const container = document.getElementById("expenses");

  if (expenses.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted mt-5">
        <p style="font-size:1.2rem;">No expenses found. Add one above! </p>
      </div>`;
    return;
  }

  container.innerHTML = expenses
    .map(
      (e) => `
    <div class="col-12 col-md-6 col-lg-4 mb-3">
      <div class="expense-card p-3">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1 fw-bold"> ${e.title}</h6>
            <span class="badge bg-secondary">${e.category}</span>
            <div class="text-muted small mt-1">📅 ${e.date || "No date"}</div>
          </div>
          <div class="text-end">
            <div class="amount-badge">$${parseFloat(e.amount).toFixed(2)}</div>
            <button class="delete-btn mt-1" onclick="deleteExpense('${e._id}')">🗑️</button>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("\n");
}

// Update total display
function updateTotal(expenses) {
  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  document.getElementById("total-display").textContent =
    `Total: $${total.toFixed(2)}`;
}

// Clear form fields
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

// Make functions available globally for onclick handlers
window.addExpense = addExpense;
window.deleteExpense = deleteExpense;
window.filterBy = filterBy;

// Start the app
loadExpenses();
