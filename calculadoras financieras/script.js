const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

function formatCurrency(value) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

document.getElementById('loanForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const principal = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('loanRate').value) / 100;
    const years = parseInt(document.getElementById('loanYears').value, 10);

    const monthlyRate = annualRate / 12;
    const months = years * 12;
    let monthlyPayment;

    if (monthlyRate === 0) {
        monthlyPayment = principal / months;
    } else {
        monthlyPayment = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
    }

    const total = monthlyPayment * months;
    const interest = total - principal;

    document.getElementById('loanResult').textContent =
        `Cuota mensual: ${formatCurrency(monthlyPayment)} | Total pagado: ${formatCurrency(total)} | Intereses: ${formatCurrency(interest)}`;
});

document.getElementById('simpleForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const principal = parseFloat(document.getElementById('simplePrincipal').value);
    const annualRate = parseFloat(document.getElementById('simpleRate').value) / 100;
    const years = parseFloat(document.getElementById('simpleYears').value);

    const interest = principal * annualRate * years;
    const amount = principal + interest;

    document.getElementById('simpleResult').textContent =
        `Interes generado: ${formatCurrency(interest)} | Monto final: ${formatCurrency(amount)}`;
});

document.getElementById('compoundForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const principal = parseFloat(document.getElementById('compoundPrincipal').value);
    const annualRate = parseFloat(document.getElementById('compoundRate').value) / 100;
    const years = parseFloat(document.getElementById('compoundYears').value);
    const timesPerYear = parseInt(document.getElementById('compoundTimes').value, 10);

    const amount = principal * Math.pow(1 + (annualRate / timesPerYear), timesPerYear * years);
    const interest = amount - principal;

    document.getElementById('compoundResult').textContent =
        `Interes generado: ${formatCurrency(interest)} | Monto final: ${formatCurrency(amount)}`;
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch((error) => {
            console.error('No se pudo registrar el service worker:', error);
        });
    });
}
