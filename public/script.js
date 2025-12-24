const purchaseForm = document.getElementById("purchase-form");
const purchasesList = document.getElementById("purchases-list");

// Load purchases
async function loadPurchases() {
  const res = await fetch("/api/purchases");
  const purchases = await res.json();

  purchasesList.innerHTML = "";
  purchases.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="purchase-text">${p.ticker} - ${p.shares} shares @ $${p.price} (${p.date})</span>
      <button class="delete-btn" data-id="${p.id}">Delete</button>
    `;
    purchasesList.appendChild(li);
  });
}

// Add purchase
purchaseForm.addEventListener("submit", async e => {
  e.preventDefault();
  const ticker = document.getElementById("ticker").value;
  const shares = Number(document.getElementById("shares").value);
  const price = Number(document.getElementById("price").value);
  const date = document.getElementById("date").value;

  await fetch("/api/purchases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker, shares, price, date })
  });

  purchaseForm.reset();
  loadPurchases();
  loadPortfolioSummary();
});

// Delete purchase
purchasesList.addEventListener("click", async e => {
  if (!e.target.classList.contains("delete-btn")) return;
  const id = e.target.dataset.id;
  await fetch(`/api/purchases/${id}`, { method: "DELETE" });
  loadPurchases();
  loadPortfolioSummary();
});

// Portfolio summary
async function loadPortfolioSummary() {
  const res = await fetch("/api/portfolio/summary");
  const data = await res.json();

  document.getElementById("total-invested").textContent = data.totalInvested.toFixed(2);

  const tableBody = document.getElementById("holdings-table");
  tableBody.innerHTML = "";

  data.holdings.forEach(h => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.ticker}</td>
      <td>${h.shares.toFixed(4)}</td>
      <td>$${h.averagePrice.toFixed(2)}</td>
      <td>$${h.totalCost.toFixed(2)}</td>
      <td>$${h.currentPrice.toFixed(2)}</td>
      <td class="${h.unrealizedPL >= 0 ? 'pl-positive':'pl-negative'}">$${h.unrealizedPL.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial load
loadPurchases();
loadPortfolioSummary();
