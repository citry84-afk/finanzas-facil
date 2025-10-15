import React, { useEffect, useState } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { ADMOB_CONFIG, getBannerConfig } from '../config/admob';

interface AdMobBannerProps {
  position?: 'top' | 'bottom';
  size?: 'adaptive' | 'large' | 'medium' | 'full';
  className?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ 
  position = 'bottom', 
  size = 'adaptive',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeBanner = async () => {
      try {
        // Verificar si AdMob está disponible
        if (!AdMob) {
          console.log('AdMob not available on this platform');
          return;
        }

        // Configurar el banner
        const bannerConfig = getBannerConfig();
        
        // Mapear posición
        const adPosition = position === 'top' 
          ? BannerAdPosition.TOP_CENTER 
          : BannerAdPosition.BOTTOM_CENTER;

        // Mapear tamaño
        const adSize = size === 'adaptive' 
          ? BannerAdSize.ADAPTIVE_BANNER 
          : BannerAdSize.BANNER;

        // Mostrar el banner
        await AdMob.showBanner({
          adId: bannerConfig.adId,
          adSize: adSize,
          position: adPosition,
          margin: bannerConfig.margin,
          isTesting: bannerConfig.isTesting
        });

        setIsLoaded(true);
        console.log('AdMob Banner loaded successfully');
        
      } catch (err) {
        console.error('Error loading AdMob Banner:', err);
        setError('Error loading banner');
      }
    };

    initializeBanner();

    // Cleanup al desmontar el componente
    return () => {
      if (AdMob && isLoaded) {
        AdMob.hideBanner().catch(console.error);
      }
    };
  }, [position, size]);

  // Si hay error, no mostrar nada
  if (error) {
    return null;
  }

  // En web, no mostrar nada ya que usamos AdSense
  if (!AdMob) {
    return null; // Web usa AdSense, no AdMob
  }

  // El banner se renderiza nativamente, este componente solo maneja la lógica
  return null;
};

// Hook para controlar el banner desde otros componentes
export const useAdMobBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showBanner = async () => {
    try {
      if (!AdMob) return;
      
      const bannerConfig = getBannerConfig();
      await AdMob.showBanner({
        adId: bannerConfig.adId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: bannerConfig.isTesting
      });
      
      setIsVisible(true);
    } catch (error) {
      console.error('Error showing banner:', error);
    }
  };

  const hideBanner = async () => {
    try {
      if (!AdMob) return;
      
      await AdMob.hideBanner();
      setIsVisible(false);
    } catch (error) {
      console.error('Error hiding banner:', error);
    }
  };

  return {
    isVisible,
    showBanner,
    hideBanner
  };
};
