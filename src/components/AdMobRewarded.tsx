import { AdMob } from '@capacitor-community/admob';
import { getRewardedConfig, ADMOB_CONFIG } from '../config/admob';

interface RewardedResult {
  success: boolean;
  rewarded: boolean;
  reward?: {
    type: string;
    amount: number;
  };
  error?: string;
}

interface RewardedAdOptions {
  title?: string;
  description?: string;
  rewardType?: string;
  rewardAmount?: number;
}

class AdMobRewardedManager {
  private isPrepared = false;
  private isLoading = false;
  private showCount = 0;
  private rewardCount = 0;
  private actionCount = 0;

  /**
   * Prepara el anuncio rewarded
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

      const config = getRewardedConfig();
      
      await AdMob.prepareRewardVideoAd({
        adId: config.adId,
        isTesting: config.isTesting
      });

      this.isPrepared = true;
      this.isLoading = false;
      console.log('Rewarded ad prepared successfully');
      return true;
      
    } catch (error) {
      console.error('Error preparing rewarded ad:', error);
      this.isLoading = false;
      return false;
    }
  }

  /**
   * Muestra el anuncio rewarded
   */
  async show(_options: RewardedAdOptions = {}): Promise<RewardedResult> {
    try {
      if (!AdMob) {
        return { 
          success: false, 
          rewarded: false, 
          error: 'AdMob not available' 
        };
      }

      // Preparar si no está listo
      if (!this.isPrepared) {
        const prepared = await this.prepare();
        if (!prepared) {
          return { 
            success: false, 
            rewarded: false, 
            error: 'Failed to prepare ad' 
          };
        }
      }

      // Mostrar el anuncio
      const result = await AdMob.showRewardVideoAd();
      
      this.showCount++;
      this.isPrepared = false; // Necesita prepararse de nuevo
      
      // Check if user completed the ad (plugin returns reward info if completed)
      if (result && result.amount > 0) {
        this.rewardCount++;
        console.log('User rewarded successfully!', result);
        
        return {
          success: true,
          rewarded: true,
          reward: {
            type: result.type || 'unknown',
            amount: result.amount || 1
          }
        };
      } else {
        console.log('User did not complete the ad');
        return {
          success: true,
          rewarded: false
        };
      }
      
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      this.isPrepared = false;
      return { 
        success: false, 
        rewarded: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Muestra anuncio rewarded para desbloquear función premium
   */
  async unlockPremiumFeature(featureName: string): Promise<RewardedResult> {
    console.log(`Unlocking premium feature: ${featureName}`);
    return await this.show({
      title: `Desbloquear ${featureName}`,
      description: `Ve un anuncio para acceder a ${featureName}`,
      rewardType: 'premium_access',
      rewardAmount: 1
    });
  }

  /**
   * Muestra anuncio rewarded después de ciertas acciones
   */
  async showAfterActions(requiredActions: number = ADMOB_CONFIG.FREQUENCY.REWARDED_SHOW_AFTER_ACTIONS): Promise<RewardedResult> {
    this.actionCount++;
    
    if (this.actionCount >= requiredActions) {
      this.actionCount = 0; // Reset counter
      return await this.show({
        title: '¡Recompensa por usar la app!',
        description: 'Has usado la app varias veces, ¡gana una recompensa!',
        rewardType: 'bonus',
        rewardAmount: 1
      });
    }
    
    return { success: true, rewarded: false };
  }

  /**
   * Muestra anuncio rewarded para obtener vidas/energía
   */
  async earnLives(livesAmount: number = 1): Promise<RewardedResult> {
    return await this.show({
      title: '¡Gana vidas gratis!',
      description: `Ve un anuncio para obtener ${livesAmount} vida${livesAmount > 1 ? 's' : ''} gratis`,
      rewardType: 'lives',
      rewardAmount: livesAmount
    });
  }

  /**
   * Muestra anuncio rewarded para obtener monedas
   */
  async earnCoins(coinsAmount: number = 100): Promise<RewardedResult> {
    return await this.show({
      title: '¡Gana monedas gratis!',
      description: `Ve un anuncio para obtener ${coinsAmount} monedas gratis`,
      rewardType: 'coins',
      rewardAmount: coinsAmount
    });
  }

  /**
   * Obtiene estadísticas del rewarded
   */
  getStats() {
    return {
      showCount: this.showCount,
      rewardCount: this.rewardCount,
      actionCount: this.actionCount,
      isPrepared: this.isPrepared,
      isLoading: this.isLoading,
      rewardRate: this.showCount > 0 ? (this.rewardCount / this.showCount) * 100 : 0
    };
  }

  /**
   * Resetea el contador de shows (útil para testing)
   */
  reset() {
    this.showCount = 0;
    this.rewardCount = 0;
    this.actionCount = 0;
    this.isPrepared = false;
    this.isLoading = false;
  }
}

// Instancia singleton
const rewardedManager = new AdMobRewardedManager();

// Funciones de conveniencia para usar en componentes
export const showRewardedAd = async (options?: RewardedAdOptions): Promise<RewardedResult> => {
  return await rewardedManager.show(options);
};

export const unlockPremiumFeature = async (featureName: string): Promise<RewardedResult> => {
  return await rewardedManager.unlockPremiumFeature(featureName);
};

export const showRewardedAfterActions = async (requiredActions?: number): Promise<RewardedResult> => {
  return await rewardedManager.showAfterActions(requiredActions);
};

export const earnLives = async (livesAmount?: number): Promise<RewardedResult> => {
  return await rewardedManager.earnLives(livesAmount);
};

export const earnCoins = async (coinsAmount?: number): Promise<RewardedResult> => {
  return await rewardedManager.earnCoins(coinsAmount);
};

export const prepareRewardedAd = async (): Promise<boolean> => {
  return await rewardedManager.prepare();
};

export const getRewardedStats = () => {
  return rewardedManager.getStats();
};

export const resetRewardedStats = () => {
  rewardedManager.reset();
};

// Hook para usar en componentes React
export const useRewardedAd = () => {
  const showAd = async (options?: RewardedAdOptions) => {
    const result = await showRewardedAd(options);
    return result;
  };

  const unlockFeature = async (featureName: string) => {
    const result = await unlockPremiumFeature(featureName);
    return result;
  };

  const showAfterActions = async (requiredActions?: number) => {
    const result = await showRewardedAfterActions(requiredActions);
    return result;
  };

  const earnLivesAd = async (livesAmount?: number) => {
    const result = await earnLives(livesAmount);
    return result;
  };

  const earnCoinsAd = async (coinsAmount?: number) => {
    const result = await earnCoins(coinsAmount);
    return result;
  };

  const prepareAd = async () => {
    return await prepareRewardedAd();
  };

  const stats = getRewardedStats();

  return {
    showAd,
    unlockFeature,
    showAfterActions,
    earnLives: earnLivesAd,
    earnCoins: earnCoinsAd,
    prepareAd,
    stats,
    resetStats: resetRewardedStats
  };
};

export default rewardedManager;
