import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // NO mostrar en apps nativas (iOS/Android)
    if (Capacitor.isNativePlatform()) {
      return;
    }
    // Verificar si ya está instalado
    const checkIfInstalled = () => {
      // Para iOS
      if ((window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }
      
      // Para Android/otros
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      // Verificar si está en la pantalla de inicio
      if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        setIsInstalled(true);
        return;
      }
    };

    checkIfInstalled();

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Escuchar cuando se instala la app
    const handleAppInstalled = () => {
      console.log('PWA instalada');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // iOS y navegadores que no disparan el evento: mostrar botón manual
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isInstalled && (isIOS || isSafari)) {
      setShowInstallPrompt(true);
    }

    // Fallback: si tras 4s no llega el evento y no está instalado, mostrar manual
    const fallbackTimer = window.setTimeout(() => {
      if (!isInstalled && !deferredPrompt) {
        setShowInstallPrompt(true);
      }
    }, 4000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Mostrar el prompt de instalación
      await deferredPrompt.prompt();
      
      // Esperar a que el usuario responda
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA');
      } else {
        console.log('Usuario rechazó instalar la PWA');
      }
      
      // Limpiar el prompt
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error al instalar PWA:', error);
    }
  };

  const handleManualInstall = () => {
    // Mostrar instrucciones para instalación manual
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      alert('Para instalar en iOS:\n1. Toca el botón Compartir\n2. Selecciona "Agregar a pantalla de inicio"\n3. Toca "Agregar"');
    } else if (isAndroid) {
      alert('Para instalar en Android:\n1. Toca el menú (⋮)\n2. Selecciona "Instalar app" o "Agregar a pantalla de inicio"\n3. Confirma la instalación');
    } else {
      alert('Para instalar:\n1. Busca el icono de instalación en la barra de direcciones\n2. Haz clic en "Instalar"\n3. Confirma la instalación');
    }
  };

  // No mostrar nada si ya está instalado
  if (isInstalled) {
    return null;
  }

  // No mostrar nada si no hay prompt disponible
  if (!showInstallPrompt && !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Instalar FinanzasFácil
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Accede más rápido y usa sin conexión
            </p>
            <div className="mt-3 flex space-x-2">
              {deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
                >
                  Instalar
                </button>
              ) : (
                <button
                  onClick={handleManualInstall}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
                >
                  Instalar
                </button>
              )}
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs px-3 py-1.5 rounded-md transition-colors"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstall;
