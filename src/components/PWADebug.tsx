import React, { useState, useEffect } from 'react';

const PWADebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkPWAStatus = () => {
      const info = {
        // Navegador
        userAgent: navigator.userAgent,
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
        
        // PWA Support
        hasServiceWorker: 'serviceWorker' in navigator,
        hasManifest: 'onbeforeinstallprompt' in window,
        
        // Display Mode
        displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 
                   window.matchMedia('(display-mode: minimal-ui)').matches ? 'minimal-ui' : 'browser',
        
        // iOS specific
        isStandalone: (navigator as any).standalone || false,
        
        // Service Worker
        swRegistration: null as any,
        swController: navigator.serviceWorker?.controller || null,
        
        // Manifest
        manifestUrl: document.querySelector('link[rel="manifest"]')?.getAttribute('href') || 'not found',
        
        // URLs
        currentUrl: window.location.href,
        origin: window.location.origin,
      };

      // Check Service Worker registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration()
          .then(registration => {
            info.swRegistration = registration;
            setDebugInfo(info);
          })
          .catch(err => {
            info.swRegistration = `Error: ${err.message}`;
            setDebugInfo(info);
          });
      } else {
        setDebugInfo(info);
      }
    };

    checkPWAStatus();
  }, []);

  // Solo mostrar en desarrollo o si hay un parámetro debug
  const shouldShow = process.env.NODE_ENV === 'development' || 
                   new URLSearchParams(window.location.search).has('debug');

  if (!shouldShow) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50 overflow-auto max-h-96">
      <h3 className="font-bold mb-2">🔍 PWA Debug Info</h3>
      <div className="space-y-1">
        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key}>
            <span className="text-blue-300">{key}:</span>{' '}
            <span className="text-green-300">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 space-y-2">
        <button
          onClick={() => {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                  registration.unregister();
                });
                window.location.reload();
              });
            }
          }}
          className="bg-red-600 text-white px-2 py-1 rounded text-xs"
        >
          🗑️ Clear SW
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-2 py-1 rounded text-xs ml-2"
        >
          🔄 Reload
        </button>
      </div>
    </div>
  );
};

export default PWADebug;


