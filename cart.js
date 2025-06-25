let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalAmountSpan = document.getElementById("total-amount");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".total-section").style.display = "none";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100" height="100">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <div>
        <button onclick="changeQty(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
      <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
      <hr>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  totalAmountSpan.innerText = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector(".total-section").style.display = "block";
}

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

document.getElementById("payNowBtn").addEventListener("click", () => {
  document.getElementById("payment-options").style.display = "block";
});

function selectPayment(method) {
  alert("Selected Payment: " + method);
  document.getElementById("order-form").style.display = "block";
}

function placeOrder() {
  document.getElementById("order-success").style.display = "block";
  document.getElementById("order-form").style.display = "none";
  document.getElementById("payment-options").style.display = "none";
  localStorage.removeItem("cart");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

renderCart();
