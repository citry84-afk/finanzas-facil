import { AdMob } from '@capacitor-community/admob';
import { getInterstitialConfig, ADMOB_CONFIG } from '../config/admob';

interface InterstitialResult {
  success: boolean;
  error?: string;
}

class AdMobInterstitialManager {
  private isPrepared = false;
  private isLoading = false;
  private showCount = 0;

  /**
   * Prepara el anuncio interstitial
   */
  async prepare(): Promise<boolean> {
    if (this.isLoading) return false;
    if (this.isPrepared) return true;

    try {
      this.isLoading = true;
      
      if (!AdMob) {
        console.log('AdMob not available on this platform');
        return false;
      }

      const config = getInterstitialConfig();
      
      await AdMob.prepareInterstitial({
        adId: config.adId,
        isTesting: config.isTesting
      });

      this.isPrepared = true;
      this.isLoading = false;
      console.log('Interstitial ad prepared successfully');
      return true;
      
    } catch (error) {
      console.error('Error preparing interstitial ad:', error);
      this.isLoading = false;
      return false;
    }
  }

  /**
   * Muestra el anuncio interstitial
   */
  async show(): Promise<InterstitialResult> {
    try {
      if (!AdMob) {
        return { success: false, error: 'AdMob not available' };
      }

      // Verificar si debemos mostrar el anuncio basado en probabilidad
      const shouldShow = Math.random() < ADMOB_CONFIG.FREQUENCY.INTERSTITIAL_SHOW_PROBABILITY;
      
      if (!shouldShow) {
        return { success: true }; // No error, simplemente no mostramos el anuncio
      }

      // Preparar si no está listo
      if (!this.isPrepared) {
        const prepared = await this.prepare();
        if (!prepared) {
          return { success: false, error: 'Failed to prepare ad' };
        }
      }

      // Mostrar el anuncio
      await AdMob.showInterstitial();
      
      this.showCount++;
      this.isPrepared = false; // Necesita prepararse de nuevo
      
      console.log(`Interstitial ad shown successfully (count: ${this.showCount})`);
      return { success: true };
      
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      this.isPrepared = false;
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Muestra anuncio interstitial entre navegaciones
   */
  async showOnNavigation(from: string, to: string): Promise<InterstitialResult> {
    console.log(`Navigation: ${from} → ${to}`);
    return await this.show();
  }

  /**
   * Muestra anuncio interstitial después de completar una acción
   */
  async showAfterAction(action: string): Promise<InterstitialResult> {
    console.log(`Action completed: ${action}`);
    return await this.show();
  }

  /**
   * Obtiene estadísticas del interstitial
   */
  getStats() {
    return {
      showCount: this.showCount,
      isPrepared: this.isPrepared,
      isLoading: this.isLoading
    };
  }

  /**
   * Resetea el contador de shows (útil para testing)
   */
  reset() {
    this.showCount = 0;
    this.isPrepared = false;
    this.isLoading = false;
  }
}

// Instancia singleton
const interstitialManager = new AdMobInterstitialManager();

// Funciones de conveniencia para usar en componentes
export const showInterstitialAd = async (): Promise<InterstitialResult> => {
  return await interstitialManager.show();
};

export const showInterstitialOnNavigation = async (
  from: string, 
  to: string
): Promise<InterstitialResult> => {
  return await interstitialManager.showOnNavigation(from, to);
};

export const showInterstitialAfterAction = async (
  action: string
): Promise<InterstitialResult> => {
  return await interstitialManager.showAfterAction(action);
};

export const prepareInterstitialAd = async (): Promise<boolean> => {
  return await interstitialManager.prepare();
};

export const getInterstitialStats = () => {
  return interstitialManager.getStats();
};

export const resetInterstitialStats = () => {
  interstitialManager.reset();
};

// Hook para usar en componentes React
export const useInterstitialAd = () => {
  const showAd = async () => {
    const result = await showInterstitialAd();
    return result.success;
  };

  const showOnNavigation = async (from: string, to: string) => {
    const result = await showInterstitialOnNavigation(from, to);
    return result.success;
  };

  const showAfterAction = async (action: string) => {
    const result = await showInterstitialAfterAction(action);
    return result.success;
  };

  const prepareAd = async () => {
    return await prepareInterstitialAd();
  };

  const stats = getInterstitialStats();

  return {
    showAd,
    showOnNavigation,
    showAfterAction,
    prepareAd,
    stats,
    resetStats: resetInterstitialStats
  };
};

export default interstitialManager;
