// Initialize cart from localStorage or create an empty one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart status display
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

// Add event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
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

    // Initial update of cart status display on page load
    updateCartStatus();
});
