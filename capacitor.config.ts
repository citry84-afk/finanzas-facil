import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lipastudios.finanzasfacil',
  appName: 'FinanzasFácil',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#3b82f6",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#FFFFFF",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    AdMob: {
      // TODO: Reemplazar con tus App IDs reales de AdMob
      // NOTA: Solo para apps móviles. Web usa Google AdSense
      appIdAndroid: 'ca-app-pub-4837743291717475~5262527045', // ID de prueba
      appIdIos: 'ca-app-pub-4837743291717475~3521575123', // ID de prueba
      // appIdWeb: No se usa - web usa AdSense
      initializeForTesting: false // Cambiar a false en producción
    }
  }
};

export default config;
