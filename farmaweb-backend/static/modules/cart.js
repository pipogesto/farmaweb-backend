// modules/cart.js
import { cart, setCart } from './state.js';
import { allProducts } from './data.js';
import { loadPage } from './router.js';
import { showToast } from './toast.js'; // Importamos el Toast

export function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
        showToast(`Se aumentó la cantidad de ${product.name}`, 'info');
    } else {
        cart.push({ ...product, quantity: 1 });
        showToast(`${product.name} añadido al carrito`, 'success');
    }
    
    setCart(cart); // Aseguramos guardar el estado
    updateCartBadge();
}

export function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            setCart(cart); // Guardar cambios
            updateCartBadge();
            
            // Recarga selectiva para mejor UX
            if (document.querySelector('.cart-page')) {
                loadPage('carrito');
            }
        }
    }
}

export function removeFromCart(productId){
    setCart(cart.filter(item => item.id !== productId));
    updateCartBadge();
    showToast('Producto eliminado del carrito', 'error');
    
    if (document.querySelector('.cart-page') || cart.length === 0) {
        loadPage('carrito');
    }
}

export function clearCart() {
    setCart([]);
    updateCartBadge();
}

export function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('hidden', totalItems <= 0);
}