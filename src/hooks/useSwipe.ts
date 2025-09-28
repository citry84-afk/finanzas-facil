import React, { useState, useEffect, useRef } from 'react';

interface SwipeOptions {
  threshold?: number; // Distancia mínima para considerar swipe
  velocity?: number; // Velocidad mínima
  preventDefault?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  enabled?: boolean;
  safeZone?: {
    top?: number; // Evitar isla dinámica
    bottom?: number;
    left?: number;
    right?: number;
  };
}

export const useSwipe = (options: SwipeOptions = {}): React.RefObject<HTMLDivElement> => {
  const {
    threshold = 50,
    velocity = 0.3,
    preventDefault = true,
    enabled = true,
    safeZone = { top: 100, bottom: 50, left: 20, right: 20 },
    ...callbacks
  } = options;

  const [swipeData, setSwipeData] = useState({
    startX: 0,
    startY: 0,
    startTime: 0,
    isSwipping: false
  });

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current || document.body as HTMLDivElement;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;

      // Verificar si está en zona segura
      const { innerWidth, innerHeight } = window;
      const isInSafeZone = 
        clientY < safeZone.top! ||
        clientY > innerHeight - safeZone.bottom! ||
        clientX < safeZone.left! ||
        clientX > innerWidth - safeZone.right!;

      if (isInSafeZone) return;

      // Solo prevenir default si no hay elementos interactivos
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, input, select, textarea, a, [role="button"]');
      
      if (isInteractive) return;

      setSwipeData({
        startX: clientX,
        startY: clientY,
        startTime: Date.now(),
        isSwipping: true
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeData.isSwipping) return;

      // Solo prevenir si es un swipe horizontal significativo
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - swipeData.startX);
      const deltaY = Math.abs(touch.clientY - swipeData.startY);
      
      if (deltaX > 10 && deltaX > deltaY && preventDefault) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!swipeData.isSwipping) return;

      const touch = e.changedTouches[0];
      const { clientX, clientY } = touch;
      const endTime = Date.now();

      const deltaX = clientX - swipeData.startX;
      const deltaY = clientY - swipeData.startY;
      const deltaTime = endTime - swipeData.startTime;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / deltaTime;

      // Verificar si cumple los criterios de swipe
      if (distance >= threshold && velocity >= options.velocity!) {
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Determinar dirección principal
        if (absDeltaX > absDeltaY) {
          // Swipe horizontal
          if (deltaX > 0 && callbacks.onSwipeRight) {
            callbacks.onSwipeRight();
          } else if (deltaX < 0 && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft();
          }
        } else {
          // Swipe vertical
          if (deltaY > 0 && callbacks.onSwipeDown) {
            callbacks.onSwipeDown();
          } else if (deltaY < 0 && callbacks.onSwipeUp) {
            callbacks.onSwipeUp();
          }
        }
      }

      setSwipeData({
        startX: 0,
        startY: 0,
        startTime: 0,
        isSwipping: false
      });
    };

    // Agregar event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, threshold, velocity, preventDefault, safeZone, swipeData.isSwipping, callbacks]);

  return elementRef;
};
