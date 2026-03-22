// ===== CONFIGURACIÓN DE APPS DISPONIBLES =====
// Agrega nuevas apps aquí a medida que las crees
const APPS = [
    {
        id: 'password-generator',
        nombre: 'Generador de Contraseñas',
        descripcion: 'Crea contraseñas fuertes y seguras personalizadas',
        icon: '🔐',
        ruta: './Generador de contraseñas/index.html',
        disponible: true
    },
    {
        id: 'financial-calculators',
        nombre: 'Calculadoras Financieras',
        descripcion: 'Calcula préstamos, interés simple e interés compuesto',
        icon: '📈',
        ruta: './calculadoras financieras/index.html',
        disponible: true
    }
    // Próximas apps aquí...
    // {
    //     id: 'app-name',
    //     nombre: 'Nombre de la App',
    //     descripcion: 'Descripción breve',
    //     icon: '😀',
    //     ruta: './carpeta-app/index.html',
    //     disponible: true
    // }
];

// ===== FUNCIÓN PARA RENDERIZAR APPS =====
function renderApps() {
    const grid = document.getElementById('appsGrid');
    
    if (APPS.length === 0) {
        grid.innerHTML = '<div class="no-apps">Próximamente más aplicaciones...</div>';
        return;
    }

    const appCards = APPS
        .filter(app => app.disponible)
        .map(app => `
            <div class="app-card" onclick="abrirApp('${app.ruta}')">
                <div class="app-icon">${app.icon}</div>
                <h3>${app.nombre}</h3>
                <p class="app-description">${app.descripcion}</p>
                <a href="${app.ruta}" class="app-link">Abrir App</a>
            </div>
        `).join('');

    if (appCards === '') {
        grid.innerHTML = '<div class="no-apps">Próximamente más aplicaciones...</div>';
    } else {
        grid.innerHTML = appCards;
    }
}

// ===== FUNCIÓN PARA ABRIR APP =====
function abrirApp(ruta) {
    // El enlace también funciona como fallback
    // Esta función podría expandirse para analytics, logging, etc.
    console.log('Abriendo app:', ruta);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    renderApps();

    // Registrar Service Worker si es posible
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(err => {
            console.log('Service Worker no disponible:', err);
        });
    }
});

// ===== FUNCIÓN PARA AGREGAR NUEVAS APPS =====
/**
 * Usa esta función para agregar nuevas apps al portal
 * Ejemplo: agregarApp('mi-app', 'Mi Aplicación', 'Descripción', '📱', './mi-app/index.html')
 */
function agregarApp(id, nombre, descripcion, icon, ruta) {
    const app = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        icon: icon,
        ruta: ruta,
        disponible: true
    };
    
    // Verificar que no exista una app con el mismo ID
    if (!APPS.find(a => a.id === id)) {
        APPS.push(app);
        renderApps();
        console.log(`App '${nombre}' agregada exitosamente`);
    } else {
        console.warn(`App con ID '${id}' ya existe`);
    }
}

// ===== ACTUALIZAR DISPONIBILIDAD DE APPS =====
function actualizarDisponibilidad(id, disponible) {
    const app = APPS.find(a => a.id === id);
    if (app) {
        app.disponible = disponible;
        renderApps();
    }
}
