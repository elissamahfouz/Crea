// Initialize cart from localStorage or create an empty one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart status display in the header
function updateCartStatus() {
    const cartStatusElement = document.getElementById('cart-status');
    if (cartStatusElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartStatusElement.textContent = `Cart (${totalItems})`;
    }
}

// Function to add product to cart
function addProductToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // Product already in cart, increment quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Product not in cart, add new item
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart status display
    updateCartStatus();

    // Provide user feedback
    alert(`${productName} added to cart!`);
}

// Function to remove item from cart
function removeItemFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh the cart display on cart.html
    updateCartStatus(); // Update header cart count
}

// Function to calculate and display the total price of items in the cart
function calculateCartTotal() {
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (!cartTotalPriceElement) return; // Only run on cart.html

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Function to display cart items on cart.html
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return; // Only run on cart.html

    cartContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item-display'); // Use this class for styling if needed

            itemDiv.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-from-cart-btn" data-product-name="${item.name}">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
        });
    }

    // Add event listeners to new "Remove" buttons
    const removeButtons = cartContainer.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.productName;
            removeItemFromCart(productName);
        });
    });

    calculateCartTotal(); // Update total after displaying items
}


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // For "Add to Cart" buttons (on index.html, products.html)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.productName;
            const productPrice = button.dataset.productPrice;
            if (productName && productPrice) {
                addProductToCart(productName, productPrice);
            } else {
                console.error('Product name or price data attribute missing on button:', button);
                alert('Could not add product to cart. Product details missing.');
            }
        });
    });

    // Initial update of cart status display on page load (all pages)
    updateCartStatus();

    // For cart.html specific logic
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }

    // For "Proceed to Checkout" button (on cart.html)
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Checkout functionality is not yet implemented.');
        });
    }
});
