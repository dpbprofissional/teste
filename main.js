document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const shippingEl = document.getElementById('shipping'); // Assuming a fixed shipping for now

    // Function to update cart display
    function updateCartDisplay() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let currentSubtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="images/${item.id}.jpg" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Preço: R$ ${item.price.toFixed(2)}</p>
                        <p>Quantidade: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-from-cart-btn" data-index="${index}">Remover</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                currentSubtotal += item.price * item.quantity;
            });
        }

        const shippingCost = cart.length > 0 ? 15.00 : 0.00; // Example fixed shipping
        if (subtotalEl) subtotalEl.textContent = currentSubtotal.toFixed(2);
        if (shippingEl) shippingEl.textContent = shippingCost.toFixed(2);
        if (totalEl) totalEl.textContent = (currentSubtotal + shippingCost).toFixed(2);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemIndex = parseInt(event.target.dataset.index);
                removeFromCart(itemIndex);
            });
        });
    }

    // Function to add item to cart
    function addToCart(productId, productName, productPrice) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
        }
        updateCartDisplay();
        alert(`${productName} adicionado ao carrinho!`);
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    // Add event listeners to "Add to Cart" buttons on products page
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = event.target.dataset.productPrice;
            addToCart(productId, productName, productPrice);
        });
    });

    // Initial cart display update (e.g., if loading from localStorage in a real app)
    updateCartDisplay();

    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (cart.length === 0) {
                alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
                return;
            }
            alert('Compra finalizada com sucesso! (Simulação)');
            // Here you would typically send data to a server
            cart.length = 0; // Clear the cart
            updateCartDisplay();
            window.location.href = 'index.html'; // Redirect to home or a confirmation page
        });
    }
});
