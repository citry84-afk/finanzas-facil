import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdPluginEvents, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { getBannerConfig } from '../config/admob';
import { ensureAdMobReady } from '../services/admob';

interface AdMobBannerProps {
  position?: 'top' | 'bottom';
  size?: 'adaptive' | 'large' | 'medium' | 'full';
  enabled?: boolean;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ 
  position = 'bottom', 
  size = 'adaptive',
  enabled = true
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const listenerHandles: Array<{ remove: () => Promise<void> }> = [];

    const clearBannerLayout = () => {
      document.documentElement.classList.remove('native-ad-banner-visible');
      document.documentElement.style.removeProperty('--native-ad-banner-height');
    };

    const initializeBanner = async () => {
      try {
        if (!Capacitor.isNativePlatform()) {
          return;
        }

        if (!enabled) {
          await AdMob.removeBanner().catch(() => undefined);
          clearBannerLayout();
          return;
        }

        const adsAllowed = await ensureAdMobReady();
        if (!adsAllowed || cancelled) return;

        const platform = Capacitor.getPlatform();
        if (platform !== 'android' && platform !== 'ios') {
          return;
        }

        const bannerConfig = getBannerConfig(platform);
        
        const adPosition = position === 'top' 
          ? BannerAdPosition.TOP_CENTER 
          : BannerAdPosition.BOTTOM_CENTER;

        const adSize = size === 'adaptive' 
          ? BannerAdSize.ADAPTIVE_BANNER 
          : BannerAdSize.BANNER;

        listenerHandles.push(await AdMob.addListener(BannerAdPluginEvents.SizeChanged, ({ height }) => {
          if (height > 0) {
            document.documentElement.style.setProperty('--native-ad-banner-height', `${Math.ceil(height)}px`);
            document.documentElement.classList.add('native-ad-banner-visible');
          } else {
            clearBannerLayout();
          }
        }));

        await AdMob.showBanner({
          adId: bannerConfig.adId,
          adSize: adSize,
          position: adPosition,
          margin: bannerConfig.margin,
          isTesting: bannerConfig.isTesting,
          npa: bannerConfig.npa
        });

        if (cancelled) {
          await AdMob.removeBanner().catch(() => undefined);
          clearBannerLayout();
          return;
        }

      } catch (err) {
        console.error('Error loading AdMob Banner:', err);
        setError('Error loading banner');
      }
    };

    initializeBanner();

    return () => {
      cancelled = true;
      listenerHandles.forEach((handle) => void handle.remove());
      clearBannerLayout();
      if (Capacitor.isNativePlatform()) {
        AdMob.removeBanner().catch(() => undefined);
      }
    };
  }, [enabled, position, size]);

  // Si hay error, no mostrar nada
  if (error) {
    return null;
  }

  if (!Capacitor.isNativePlatform()) return null;

  // El banner se renderiza nativamente, este componente solo maneja la lógica
  return null;
};

// Hook para controlar el banner desde otros componentes
export const useAdMobBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showBanner = async () => {
    try {
      if (!Capacitor.isNativePlatform()) return;
      
      const adsAllowed = await ensureAdMobReady();
      if (!adsAllowed) return;
      const platform = Capacitor.getPlatform();
      if (platform !== 'android' && platform !== 'ios') return;

      const bannerConfig = getBannerConfig(platform);
      await AdMob.showBanner({
        adId: bannerConfig.adId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: bannerConfig.margin,
        isTesting: bannerConfig.isTesting,
        npa: bannerConfig.npa
      });
      
      setIsVisible(true);
    } catch (error) {
      console.error('Error showing banner:', error);
    }
  };

  const hideBanner = async () => {
    try {
      if (!Capacitor.isNativePlatform()) return;
      
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
