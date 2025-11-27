import { currentUser, setCurrentUser } from '../state.js';
import { updateLoginButton } from '../auth.js';
import { loadPage } from '../router.js';
import { showToast } from '../toast.js';

export function initAccountPage() {
    if (!currentUser) {
        loadPage('login');
        return;
    }

    // Rellenar datos visuales
    const nameDisplay = document.getElementById('account-name-display');
    const emailDisplay = document.getElementById('account-email-display');
    const welcomeName = document.getElementById('account-welcome-name');
    
    if(nameDisplay) nameDisplay.textContent = currentUser.name;
    if(emailDisplay) emailDisplay.textContent = currentUser.email;
    if(welcomeName) welcomeName.textContent = currentUser.name;
    
    // Rellenar inputs del formulario
    const accNameInput = document.getElementById('acc-name');
    const accEmailInput = document.getElementById('acc-email');
    
    if (accNameInput) accNameInput.value = currentUser.name;
    if (accEmailInput) accEmailInput.value = currentUser.email;

    // Navegación de pestañas (Sidebar)
    const accountContent = document.querySelector('.account-content');
    document.querySelectorAll('.account-nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.account-nav-link.active')?.classList.remove('active');
            link.classList.add('active');

            accountContent.querySelectorAll('.account-section').forEach(sec => sec.classList.add('hidden'));
            const targetId = link.dataset.section;
            document.getElementById(targetId)?.classList.remove('hidden');
        });
    });

    // --- LÓGICA DE GUARDADO EN BASE DE DATOS ---
    const form = document.getElementById('personal-info-form');
    if (form) {
        // Clonamos el nodo para eliminar listeners viejos (truco rápido para evitar duplicados)
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newName = document.getElementById('acc-name').value;
            const submitBtn = newForm.querySelector('button[type="submit"]');
            
            submitBtn.textContent = "Guardando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/user/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: currentUser.email, // Identificador
                        name: newName
                    })
                });

                const data = await response.json();

                if (data.success) {
                    // Actualizar estado local
                    currentUser.name = newName;
                    setCurrentUser(currentUser); // Guarda en localStorage y actualiza variables
                    
                    showToast('Información actualizada correctamente', 'success');
                    
                    // Actualizar interfaz sin recargar
                    if(nameDisplay) nameDisplay.textContent = newName;
                    if(welcomeName) welcomeName.textContent = newName;
                    updateLoginButton(); 
                } else {
                    showToast(data.message || 'Error al actualizar', 'error');
                }
            } catch (error) {
                console.error(error);
                showToast('Error de conexión', 'error');
            } finally {
                submitBtn.textContent = "Guardar Cambios";
                submitBtn.disabled = false;
            }
        });
    }
}