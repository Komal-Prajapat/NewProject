// cart.js

// Load cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        const { name, price, quantity, image } = item;

        // Create Cart Item HTML
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${image}" alt="${name}">
            <div class="item-details">
                <p class="item-name">${name}</p>
                <p class="item-price">₹${price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <span class="remove-btn" onclick="removeItem(${index})">Remove</span>
        `;

        cartItemsContainer.appendChild(cartItem);

        totalAmount += price * quantity;
    });

    // Update total amount
    totalAmountElement.textContent = totalAmount;
}

// Increase quantity of an item
function increaseQuantity(index) {
    cartItems[index].quantity += 1;
    updateCart();
}

// Decrease quantity of an item
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    updateCart();
}

// Remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Update cart in localStorage and re-render items
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
}

// Initial render
renderCartItems();