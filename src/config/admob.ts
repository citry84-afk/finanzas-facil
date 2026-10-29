import { MaxAdContentRating } from '@capacitor-community/admob';

// Configuración de AdMob para las aplicaciones móviles.
// La web no solicita anuncios actualmente.
type AdMobPlatform = 'android' | 'ios';

const admobTestingEnabled = import.meta.env.DEV || import.meta.env.VITE_ADMOB_TESTING === 'true';

export const ADMOB_CONFIG = {
  // App IDs (SOLO para apps móviles)
  APP_IDS: {
    ANDROID: 'ca-app-pub-4837743291717475~5262527045',
    IOS: 'ca-app-pub-4837743291717475~3521575123',
  },
  
  // Ad Unit IDs por app/plataforma
  AD_UNITS: {
    ANDROID: {
      BANNER: 'ca-app-pub-4837743291717475/5805807742',
      INTERSTITIAL: 'ca-app-pub-4837743291717475/8858991273',
      REWARDED: 'ca-app-pub-4837743291717475/9665161708'
    },
    IOS: {
      BANNER: 'ca-app-pub-4837743291717475/5023688041',
      INTERSTITIAL: 'ca-app-pub-4837743291717475/4480762567',
      REWARDED: 'ca-app-pub-4837743291717475/5058852225'
    }
  },

  // Configuración de testing
  TESTING: {
    ENABLED: admobTestingEnabled,
    TEST_DEVICE_IDS: []
  },

  // Solo está activo el banner. Los formatos que interrumpen la navegación
  // permanecen deshabilitados para preservar la confianza del usuario.
  FREQUENCY: {
    INTERSTITIAL_SHOW_PROBABILITY: 0,
    REWARDED_SHOW_AFTER_ACTIONS: 3, // Mostrar después de 3 acciones
    BANNER_ALWAYS_VISIBLE: true
  },

  PRIVACY: {
    NON_PERSONALIZED_ADS: true,
    MAX_AD_CONTENT_RATING: MaxAdContentRating.General,
    TAG_FOR_CHILD_DIRECTED_TREATMENT: false,
    TAG_FOR_UNDER_AGE_OF_CONSENT: false
  }
};

// Función helper para obtener el App ID correcto según la plataforma
export const getAppId = (platform: AdMobPlatform): string => {
  switch (platform) {
    case 'android':
      return ADMOB_CONFIG.APP_IDS.ANDROID;
    case 'ios':
      return ADMOB_CONFIG.APP_IDS.IOS;
    default:
      throw new Error('AdMob solo se usa en las aplicaciones móviles.');
  }
};

const getAdUnitIds = (platform: AdMobPlatform) => {
  return platform === 'ios' ? ADMOB_CONFIG.AD_UNITS.IOS : ADMOB_CONFIG.AD_UNITS.ANDROID;
};

// Función helper para verificar si estamos en modo testing
export const isTesting = (): boolean => {
  return ADMOB_CONFIG.TESTING.ENABLED;
};

// Función helper para obtener configuración de banner
export const getBannerConfig = (platform: AdMobPlatform) => ({
  adId: getAdUnitIds(platform).BANNER,
  isTesting: isTesting(),
  margin: 0,
  npa: ADMOB_CONFIG.PRIVACY.NON_PERSONALIZED_ADS
});

// Función helper para obtener configuración de interstitial
export const getInterstitialConfig = (platform: AdMobPlatform) => ({
  adId: getAdUnitIds(platform).INTERSTITIAL,
  isTesting: isTesting()
});

// Función helper para obtener configuración de rewarded
export const getRewardedConfig = (platform: AdMobPlatform) => ({
  adId: getAdUnitIds(platform).REWARDED,
  isTesting: isTesting()
});
