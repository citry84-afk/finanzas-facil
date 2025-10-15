// Configuración de AdMob para FinanzasFácil (SOLO APPS MÓVILES)
// NOTA: Para web usamos Google AdSense, no AdMob
// TODO: Reemplazar con tus IDs reales de AdMob

export const ADMOB_CONFIG = {
  // App IDs (SOLO para apps móviles)
  APP_IDS: {
    ANDROID: 'ca-app-pub-3940256099942544~3347511713', // ID de prueba
    IOS: 'ca-app-pub-3940256099942544~1458002511', // ID de prueba
    // WEB: No usamos AdMob para web, usamos AdSense
  },
  
  // Ad Unit IDs (IDs de prueba de Google)
  AD_UNITS: {
    BANNER: 'ca-app-pub-3940256099942544/6300978111',
    INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
    REWARDED: 'ca-app-pub-3940256099942544/5224354917'
  },

  // Configuración de testing
  TESTING: {
    ENABLED: true, // Cambiar a false en producción
    TEST_DEVICE_IDS: [
      // Agregar IDs de dispositivos de prueba aquí
      'TEST_DEVICE_ID_1',
      'TEST_DEVICE_ID_2'
    ]
  },

  // Configuración de frecuencia
  FREQUENCY: {
    INTERSTITIAL_SHOW_PROBABILITY: 0.3, // 30% de probabilidad
    REWARDED_SHOW_AFTER_ACTIONS: 3, // Mostrar después de 3 acciones
    BANNER_ALWAYS_VISIBLE: true
  }
};

// Función helper para obtener el App ID correcto según la plataforma
export const getAppId = (platform: 'android' | 'ios'): string => {
  switch (platform) {
    case 'android':
      return ADMOB_CONFIG.APP_IDS.ANDROID;
    case 'ios':
      return ADMOB_CONFIG.APP_IDS.IOS;
    default:
      throw new Error('AdMob solo se usa para apps móviles. Para web usar AdSense.');
  }
};

// Función helper para verificar si estamos en modo testing
export const isTesting = (): boolean => {
  return ADMOB_CONFIG.TESTING.ENABLED;
};

// Función helper para obtener configuración de banner
export const getBannerConfig = () => ({
  adId: ADMOB_CONFIG.AD_UNITS.BANNER,
  isTesting: isTesting(),
  margin: 0
});

// Función helper para obtener configuración de interstitial
export const getInterstitialConfig = () => ({
  adId: ADMOB_CONFIG.AD_UNITS.INTERSTITIAL,
  isTesting: isTesting()
});

// Función helper para obtener configuración de rewarded
export const getRewardedConfig = () => ({
  adId: ADMOB_CONFIG.AD_UNITS.REWARDED,
  isTesting: isTesting()
});
