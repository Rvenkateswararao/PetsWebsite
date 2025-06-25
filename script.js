function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) cartCountElement.innerText = count;
}

function addToCart(item) {
  let cart = getCart();
  const index = cart.findIndex(i => i.id === item.id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(item.name + " added to cart");
}

// Example call (ensure you use image when adding):
// addToCart({ id: 1, name: "Dog Toy", price: 199, image: "images/toy.jpg" });

document.addEventListener("DOMContentLoaded", updateCartCount);
