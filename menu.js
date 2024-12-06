// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartCount = document.getElementById('cart-count');

// Load cart items from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count in the header
function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to add item to the cart
function addToCart(itemId, itemName, itemPrice) {
    const cartItem = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: 1
    };

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

// Attach event listeners to all add-to-cart buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        const itemId = menuItem.dataset.id;
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = menuItem.querySelector('p').textContent.replace('₹', '');

        // Add item to cart
        addToCart(itemId, itemName, itemPrice);
    });
});

// Update cart count on page load
updateCartCount();