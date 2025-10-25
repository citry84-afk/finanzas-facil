import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  // Registro inmediato para mejor compatibilidad con Safari
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registrado exitosamente:', registration.scope);
      
      // Verificar actualizaciones
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Nueva versión disponible');
              // Opcional: mostrar notificación al usuario
            }
          });
        }
      });
    })
    .catch((registrationError) => {
      console.log('SW falló al registrarse:', registrationError);
    });

  // También registrar en load para máxima compatibilidad
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado en load:', registration.scope);
      })
      .catch((registrationError) => {
        console.log('SW falló en load:', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Ocultar contenido inicial HTML cuando React se monte
// Esto asegura que AdSense vea el contenido, pero la UX permanece inalterada
setTimeout(() => {
  const initialContent = document.getElementById('initial-content');
  if (initialContent) {
    initialContent.style.display = 'none';
  }
}, 100);
