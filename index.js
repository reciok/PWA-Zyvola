const APPS = [
    {
        id: 'password-generator',
        nombre: 'Generador de Contrasenas',
        descripcion: 'Crea contrasenas fuertes y seguras personalizadas',
        icon: '🔐',
        ruta: './Generador de contraseñas/index.html',
        disponible: true
    },
    {
        id: 'financial-calculators',
        nombre: 'Calculadoras Financieras',
        descripcion: 'Calcula prestamos, interes simple e interes compuesto',
        icon: '📈',
        ruta: './calculadoras financieras/index.html',
        disponible: true
    }
];

const API_BASE_URL = 'https://pwa-zyvola.onrender.com';
const TOKEN_STORAGE_KEY = 'authToken';

const authSection = document.getElementById('authSection');
const appsSection = document.getElementById('appsSection');
const authStatus = document.getElementById('authStatus');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

function setAuthStatus(message, type) {
    authStatus.textContent = message;
    authStatus.classList.remove('success', 'error');
    if (type) {
        authStatus.classList.add(type);
    }
}

function mostrarSeccionAuth() {
    authSection.classList.remove('hidden');
    appsSection.classList.add('hidden');
}

function mostrarSeccionApps(email) {
    welcomeMessage.textContent = `Bienvenido, ${email}`;
    authSection.classList.add('hidden');
    appsSection.classList.remove('hidden');
}

function renderApps() {
    const grid = document.getElementById('appsGrid');

    const appCards = APPS
        .filter((app) => app.disponible)
        .map((app) => `
            <div class="app-card" onclick="abrirApp('${app.ruta}')">
                <div class="app-icon">${app.icon}</div>
                <h3>${app.nombre}</h3>
                <p class="app-description">${app.descripcion}</p>
                <a href="${app.ruta}" class="app-link">Abrir App</a>
            </div>
        `)
        .join('');

    grid.innerHTML = appCards || '<div class="no-apps">Proximamente mas aplicaciones...</div>';
}

function abrirApp(ruta) {
    console.log('Abriendo app:', ruta);
}

async function registrarUsuario(event) {
    event.preventDefault();

    const email = registerEmail.value.trim();
    const password = registerPassword.value;

    if (!email || !password) {
        setAuthStatus('Completa email y contrasena para registrarte.', 'error');
        return;
    }

    setAuthStatus('Registrando usuario...');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo registrar el usuario');
        }

        setAuthStatus('Registro completado. Ahora puedes iniciar sesion.', 'success');
        loginEmail.value = email;
        registerForm.reset();
        loginPassword.focus();
    } catch (error) {
        setAuthStatus(error.message, 'error');
    }
}

async function iniciarSesion(event) {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !password) {
        setAuthStatus('Completa email y contrasena para iniciar sesion.', 'error');
        return;
    }

    setAuthStatus('Iniciando sesion...');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok || !data.token) {
            throw new Error(data.message || 'Credenciales invalidas');
        }

        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
        setAuthStatus('Sesion iniciada correctamente.', 'success');
        await verificarSesion();
    } catch (error) {
        setAuthStatus(error.message, 'error');
    }
}

function cerrarSesion() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    location.reload();
}

async function verificarSesion() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
        mostrarSeccionAuth();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Sesion no valida');
        }

        const data = await response.json();
        const email = data && data.user && data.user.email ? data.user.email : 'usuario';
        renderApps();
        mostrarSeccionApps(email);
    } catch (_error) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        mostrarSeccionAuth();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    registerForm.addEventListener('submit', registrarUsuario);
    loginForm.addEventListener('submit', iniciarSesion);
    logoutBtn.addEventListener('click', cerrarSesion);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js?v=3').catch((error) => {
            console.log('Service Worker no disponible:', error);
        });
    }

    verificarSesion();
});

window.abrirApp = abrirApp;
