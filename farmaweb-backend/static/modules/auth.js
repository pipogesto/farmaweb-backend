// static/modules/auth.js
import { currentUser, setCurrentUser } from './state.js';
import { loadPage } from './router.js';
import { showToast } from './toast.js';

export async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const errorMsg = document.getElementById('error-message');

    // Desactivar botón mientras carga
    submitBtn.disabled = true;
    submitBtn.textContent = "Verificando...";
    if(errorMsg) errorMsg.classList.add('hidden');

    try {
        // Petición al Backend Real (app.py)
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Login Exitoso: Guardamos el usuario real de la DB
            setCurrentUser(data.user);
            showToast(`Bienvenido de nuevo, ${data.user.name}`, 'success');
            updateLoginButton();
            
            // Redirigir según el rol
            if (data.user.role === 'admin') {
                loadPage('admin-dashboard');
            } else {
                loadPage('inicio');
            }
        } else {
            // Error de credenciales
            if(errorMsg) {
                errorMsg.textContent = data.message || 'Correo o contraseña incorrectos.';
                errorMsg.classList.remove('hidden');
            }
            showToast(data.message || 'Error al iniciar sesión', 'error');
        }

    } catch (error) {
        console.error('Error en login:', error);
        showToast('Error de conexión con el servidor', 'error');
    } finally {
        // Reactivar botón
        submitBtn.disabled = false;
        submitBtn.textContent = "Entrar";
    }
}

export function handleLogout() {
    if (!currentUser) return;
    showToast(`Hasta pronto, ${currentUser.name}`, 'info');
    setCurrentUser(null);
    updateLoginButton();
    loadPage('inicio');
}

export function updateLoginButton() {
    const loginContainers = document.querySelectorAll('.login-button-container');
    const mobileSeparator = document.querySelector('.login-separator');

    if (currentUser) {
        let desktopHtml = '';
        let mobileHtml = '';

        if (currentUser.role === 'admin') {
            desktopHtml += `<a href="#" data-page="admin-dashboard" class="nav-link" style="font-size: 0.875rem;">Panel Admin</a>`;
            mobileHtml += `<a href="#" data-page="admin-dashboard" class="nav-link">Panel Admin</a>`;
        }
        desktopHtml += `<a href="#" data-page="cuenta" class="nav-link" style="font-size: 0.875rem;">Mi Cuenta</a>
                        <button class="button button-outline logout-button" style="padding: 0.5rem 0.75rem; font-size: 0.875rem;">Cerrar Sesión</button>`;
        
        mobileHtml += `<a href="#" data-page="cuenta" class="nav-link">Mi Cuenta</a>
                       <a href="#" class="nav-link logout-button">Cerrar Sesión</a>`;

        loginContainers.forEach(container => {
            container.innerHTML = container.dataset.context === "mobile" ? mobileHtml : desktopHtml;
        });
        
        if (mobileSeparator) mobileSeparator.classList.add('hidden');

    } else {
        const desktopHtml = `<a href="#" data-page="login" class="login-button"><i data-lucide="user"></i><span>Iniciar Sesión</span></a>`;
        const mobileHtml = `<a href="#" data-page="login" class="nav-link">Iniciar Sesión</a>
                            <a href="#" data-page="registro" class="nav-link">Registrarse</a>`;
        
        loginContainers.forEach(container => {
            container.innerHTML = container.dataset.context === "mobile" ? mobileHtml : desktopHtml;
        });

        if (mobileSeparator) mobileSeparator.classList.remove('hidden');
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}