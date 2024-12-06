// DOM Elements
const checkoutItemsContainer = document.querySelector('.price-summary');
const totalAmountElement = document.querySelector('.total-summary span:last-child');
const editOrderButton = document.querySelector('.btn.edit');

// Load cart details from localStorage
let checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
let checkoutTotal = localStorage.getItem('checkoutTotal') || 0;

// Function to render checkout items
function renderCheckoutItems() {
    checkoutItemsContainer.innerHTML = '';

    if (checkoutItems.length === 0) {
        checkoutItemsContainer.innerHTML = `<p>No items in checkout.</p>`;
        totalAmountElement.textContent = "₹0";
        return;
    }

    let itemsCount = 0;
    checkoutItems.forEach(item => {
        itemsCount += item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span class="price">₹${item.price * item.quantity}</span>
        `;

        checkoutItemsContainer.appendChild(itemElement);
    });

    // Update total amount
    totalAmountElement.textContent = `₹${checkoutTotal}`;

    // Update item count
    document.querySelector('.price-summary .price:first-child').textContent = `${itemsCount} items`;
}

// Edit order button logic: Redirect back to cart page
editOrderButton.addEventListener('click', function() {
    window.location.href = 'cart.html'; // Update this if your cart page is named differently
});

// Initial render on checkout page load
document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutItems();
});
