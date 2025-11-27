// modules/ui.js

export function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

function getRatingHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i data-lucide="star" style="width: 1rem; height: 1rem;" class="${i <= rating ? 'star-filled' : 'star-empty'}"></i>`;
    }
    return html;
}

export function getProductCardHTML(product) {
    // Placeholder por si falla la imagen
    const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image';
    
    return `
        <div class="product-card">
            <div class="product-card-image-wrapper">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-card-image" 
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                />
                ${product.badge ? `<div class="product-card-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-card-content">
                <div class="product-rating">
                    ${getRatingHTML(product.rating)}
                    <span class="product-rating-text">(${product.rating}.0)</span>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="product-current-price">${formatCurrency(product.price)}</span>
                        ${product.originalPrice ? `<span class="product-original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                    <button class="button button-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i data-lucide="shopping-cart"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
}