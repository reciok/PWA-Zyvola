// ===== ELEMENTOS DEL DOM =====
const passwordInput = document.getElementById('passwordOutput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const refreshBtn = document.getElementById('refreshBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const historyList = document.getElementById('historyList');

// ===== CARACTERES =====
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?~';

// ===== ESTADO =====
let passwordHistory = [];

// ===== FUNCIONES PRINCIPALES =====
function generatePassword() {
    let characters = '';
    
    if (uppercaseCheckbox.checked) characters += UPPERCASE;
    if (lowercaseCheckbox.checked) characters += LOWERCASE;
    if (numbersCheckbox.checked) characters += NUMBERS;
    if (symbolsCheckbox.checked) characters += SYMBOLS;
    
    // Validación: al menos un tipo debe ser seleccionado
    if (characters === '') {
        alert('Selecciona al menos un tipo de carácter');
        return;
    }
    
    const length = parseInt(lengthInput.value);
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    displayPassword(password);
    calculateStrength(password);
    addToHistory(password);
}

function displayPassword(password) {
    passwordInput.value = password;
}

function calculateStrength(password) {
    let strength = 0;
    
    // Longitud
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (password.length >= 16) strength += 20;
    
    // Complejidad
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?~]/.test(password);
    
    if (hasUppercase) strength += 10;
    if (hasLowercase) strength += 10;
    if (hasNumbers) strength += 10;
    if (hasSymbols) strength += 10;
    
    // Actualizar visualización
    strengthFill.style.width = strength + '%';
    
    let strengthLabel = '';
    if (strength < 30) {
        strengthLabel = 'Muy débil';
    } else if (strength < 50) {
        strengthLabel = 'Débil';
    } else if (strength < 70) {
        strengthLabel = 'Media';
    } else if (strength < 85) {
        strengthLabel = 'Fuerte';
    } else {
        strengthLabel = 'Muy fuerte';
    }
    
    strengthText.textContent = strengthLabel;
}

function addToHistory(password) {
    const now = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    passwordHistory.unshift({ password, time: now });
    
    // Limitar historial a 10 elementos
    if (passwordHistory.length > 10) {
        passwordHistory.pop();
    }
    
    saveHistory();
    displayHistory();
}

function displayHistory() {
    historyList.innerHTML = '';
    
    if (passwordHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #808080;">Aún no hay contraseñas generadas</p>';
        return;
    }
    
    passwordHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <span>${item.password}</span>
                <span style="font-size: 0.75em; opacity: 0.7; margin-left: 10px;">${item.time}</span>
            </div>
            <button onclick="copyFromHistory('${item.password}')" title="Copiar">Copiar</button>
        `;
        historyList.appendChild(historyItem);
    });
}

function copyFromHistory(password) {
    copyToClipboard(password);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('No se pudo copiar:', err);
    }
    document.body.removeChild(textarea);
}

function showCopyFeedback() {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ ¡Copiado!';
    copyBtn.style.background = '#10B981';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

function clearHistory() {
    if (confirm('¿Estás seguro de que deseas limpiar todo el historial?')) {
        passwordHistory = [];
        saveHistory();
        displayHistory();
    }
}

// ===== ALMACENAMIENTO LOCAL =====
function saveHistory() {
    try {
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    } catch (e) {
        console.warn('No se pudo guardar el historial:', e);
    }
}

function loadHistory() {
    try {
        const saved = localStorage.getItem('passwordHistory');
        if (saved) {
            passwordHistory = JSON.parse(saved);
            displayHistory();
        }
    } catch (e) {
        console.warn('No se pudo cargar el historial:', e);
    }
}

// ===== EVENT LISTENERS =====
generateBtn.addEventListener('click', generatePassword);
refreshBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', () => {
    if (passwordInput.value) {
        copyToClipboard(passwordInput.value);
    }
});
clearHistoryBtn.addEventListener('click', clearHistory);

// Actualizar la longitud mostrada
lengthInput.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

// Generar contraseña inicial cuando el usuario interactúa
generateBtn.addEventListener('click', generatePassword);
uppercaseCheckbox.addEventListener('change', generatePassword);
lowercaseCheckbox.addEventListener('change', generatePassword);
numbersCheckbox.addEventListener('change', generatePassword);
symbolsCheckbox.addEventListener('change', generatePassword);
lengthInput.addEventListener('change', generatePassword);

// ===== INICIALIZACIÓN =====
window.addEventListener('load', () => {
    if (typeof verificarSesionPWA === 'function') {
        verificarSesionPWA();
    }
    loadHistory();
    generatePassword();
});

// ===== ACCESO A TECLADO =====
document.addEventListener('keypress', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
            e.preventDefault();
            copyToClipboard(passwordInput.value);
        }
    }
});
