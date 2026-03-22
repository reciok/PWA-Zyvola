const API_BASE_URL = 'https://pwa-zyvola.onrender.com';
const TOKEN_STORAGE_KEY = 'authToken';

async function verificarSesionPWA() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
        window.location.href = '../index.html';
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Sesion invalida');
        }

        return true;
    } catch (_error) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        window.location.href = '../index.html';
        return false;
    }
}

window.verificarSesionPWA = verificarSesionPWA;
