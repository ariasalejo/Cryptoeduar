// Importa módulos
import { initTheme } from './app/auth.js';
import { loadMarketData } from './app/api.js';
import { initCharts } from './app/charts.js';

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa funcionalidades
    initTheme();
    loadMarketData();
    initCharts();
    
    // Registra Service Worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado:', registration.scope);
                })
                .catch(error => {
                    console.log('Error registrando SW:', error);
                });
        });
    }
});
