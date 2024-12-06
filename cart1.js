// Load cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButton = document.getElementById('checkout-btn');

// Debugging: Check if elements are correctly selected
console.log("Cart Items Container:", cartItemsContainer);
console.log("Total Amount Element:", totalAmountElement);
console.log("Checkout Button:", checkoutButton);

// Function to render cart items
function renderCartItems() {

    if (!cartItemsContainer || !totalAmountElement) {

        console.error("Required elements not found in the DOM!");
        return;

    }

    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    if (cartItems.length === 0) {

        cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
        totalAmountElement.textContent = "₹0";
        return;

    }

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

    // Update total amount with currency formatting
    totalAmountElement.textContent = new Intl.NumberFormat('en-IN', {

        style: 'currency',
        currency: 'INR'
    }).format(totalAmount);

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

// Proceed to Checkout
checkoutButton.addEventListener('click', function() {

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;

    }

    // Store cart items and total amount in localStorage for checkout page
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem('checkoutTotal', totalAmount);
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));

    // Redirect to the checkout page
    window.location.href = 'Checkout11.html'; // Change this if your file is named differently

});

// Initial render
document.addEventListener("DOMContentLoaded", () => {

    renderCartItems();
    
});
