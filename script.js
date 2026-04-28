const products = [
    {
        id: 1,
        name: "Caneca Especial com Chocolates + Balão",
        description: "Um presente completo e inesquecível Acompanha: 1 caneca personalizada 1 chocolate BIS 2 KitKat 1 balão em formato de coração ",
        price: 59.90,
        image: "img/image (1).png"
    },
    {
        id: 2,
        name: "caneca personalizada",
        description: "Com foto  ou arte personalizada ",
        price: 35.00,
        image: "img/image (2).png"
    },
    {
        id: 3,
        name: "Caneca com Foto Personalizada",
        description: "Um presente completo e inesquecível  Acompanha: 1 caneca personalizada 1 foto polaroid 1 chaveiro bombons de chocolate",
        price: 49.90,
        image: "img/image (3).png"
    },
    {
        id: 4,
        name: "kit com caneca ",
        description: "1 caneca personalizada com bombons de chocolate",
        price: 40.00,
        image: "img/image (4).png"
    }
];

let cart = [];

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i>
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            </div>
        </div>
    `).join('');

    // Adicionar event listeners de forma mais robusta
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId, this);
        });
    });
}

function addToCart(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        
        // Feedback visual
        if (buttonElement) {
            const originalContent = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-check"></i>';
            buttonElement.style.background = '#25d366';
            setTimeout(() => {
                buttonElement.innerHTML = originalContent;
                buttonElement.style.background = '';
            }, 1000);
        }
    }
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <small onclick="removeFromCart(${index})" style="color: red; cursor: pointer;">Remover</small>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function sendWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    let message = "Olá! Gostaria de fazer um pedido:\n\n";
    cart.forEach(item => {
        message += `• ${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const phone = "5511999999999"; // Substituir pelo número real
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// Inicializar
renderProducts();
