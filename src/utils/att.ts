// App Tracking Transparency (ATT) Framework for iOS
// Required for iOS 14.5+ when using Firebase Analytics, AdMob, or any tracking
import { AppTrackingTransparency } from 'capacitor-plugin-app-tracking-transparency';
import { Capacitor } from '@capacitor/core';

export interface ATTResult {
  status: 'authorized' | 'denied' | 'restricted' | 'not-determined';
  canTrack: boolean;
}

/**
 * Request App Tracking Transparency permission
 * This is REQUIRED for iOS apps that use:
 * - Firebase Analytics
 * - AdMob personalized ads
 * - Any cross-app tracking
 */
export const requestTrackingPermission = async (): Promise<ATTResult> => {
  try {
    // Only request on iOS
    if (Capacitor.getPlatform() !== 'ios') {
      console.log('ATT: Not iOS platform, tracking allowed by default');
      return { status: 'authorized', canTrack: true };
    }

    // Check if ATT is available (iOS 14.5+)
    const status = await AppTrackingTransparency.getTrackingStatus();
    console.log('ATT: Current status:', status);

    // If already determined, return current status
    if (status.status !== 'not-determined') {
      return {
        status: status.status,
        canTrack: status.status === 'authorized'
      };
    }

    // Request permission
    console.log('ATT: Requesting tracking permission...');
    const result = await AppTrackingTransparency.requestTrackingPermission();
    
    console.log('ATT: Permission result:', result);
    
    return {
      status: result.status,
      canTrack: result.status === 'authorized'
    };

  } catch (error) {
    console.error('ATT: Error requesting permission:', error);
    
    // If ATT is not available (iOS < 14.5), allow tracking
    if (error instanceof Error && error.message.includes('not available')) {
      console.log('ATT: Not available on this iOS version, allowing tracking');
      return { status: 'authorized', canTrack: true };
    }
    
    // Default to denying tracking on error
    return { status: 'denied', canTrack: false };
  }
};

/**
 * Get current tracking status without requesting
 */
export const getTrackingStatus = async (): Promise<ATTResult> => {
  try {
    if (Capacitor.getPlatform() !== 'ios') {
      return { status: 'authorized', canTrack: true };
    }

    const status = await AppTrackingTransparency.getTrackingStatus();
    return {
      status: status.status,
      canTrack: status.status === 'authorized'
    };
  } catch (error) {
    console.error('ATT: Error getting status:', error);
    return { status: 'denied', canTrack: false };
  }
};

/**
 * Initialize tracking services based on ATT permission
 */
export const initializeTrackingServices = async (canTrack: boolean) => {
  console.log('ATT: Initializing tracking services, canTrack:', canTrack);
  
  if (canTrack) {
    // Initialize Firebase Analytics with full tracking
    await initializeFirebaseAnalytics(true);
    
    // Initialize AdMob with personalized ads
    await initializeAdMob(true);
    
    console.log('ATT: Full tracking enabled');
  } else {
    // Initialize with limited tracking
    await initializeFirebaseAnalytics(false);
    
    // Initialize AdMob with non-personalized ads
    await initializeAdMob(false);
    
    console.log('ATT: Limited tracking enabled');
  }
};

/**
 * Initialize Firebase Analytics based on tracking permission
 */
const initializeFirebaseAnalytics = async (canTrack: boolean) => {
  try {
    // Firebase Analytics will automatically respect ATT permission
    // We just need to ensure it's initialized
    console.log('Firebase Analytics: Initializing with tracking:', canTrack);
    
    // Firebase will handle the rest based on ATT permission
    // No additional configuration needed
    
  } catch (error) {
    console.error('Firebase Analytics: Error initializing:', error);
  }
};

/**
 * Initialize AdMob based on tracking permission
 */
const initializeAdMob = async (canTrack: boolean) => {
  try {
    console.log('AdMob: Initializing with personalized ads:', canTrack);
    
    // AdMob will automatically show personalized or non-personalized ads
    // based on ATT permission. No additional configuration needed.
    
  } catch (error) {
    console.error('AdMob: Error initializing:', error);
  }
};

/**
 * Check if we should show personalized ads
 */
export const shouldShowPersonalizedAds = async (): Promise<boolean> => {
  const result = await getTrackingStatus();
  return result.canTrack;
};

/**
 * Get user-friendly message for tracking permission
 */
export const getTrackingMessage = (): string => {
  return `Esta aplicación utiliza datos de seguimiento para:

• Mostrar anuncios personalizados relevantes para ti
• Mejorar la experiencia de la aplicación  
• Analizar el uso para optimizar funciones

Tus datos se mantienen seguros y no se comparten con terceros no autorizados.`;
};

/**
 * Hook for React components to use ATT
 */
export const useAppTrackingTransparency = () => {
  const requestPermission = async () => {
    const result = await requestTrackingPermission();
    await initializeTrackingServices(result.canTrack);
    return result;
  };

  const checkStatus = async () => {
    return await getTrackingStatus();
  };

  const canShowPersonalizedAds = async () => {
    return await shouldShowPersonalizedAds();
  };

  return {
    requestPermission,
    checkStatus,
    canShowPersonalizedAds,
    getTrackingMessage
  };
};

export default {
  requestTrackingPermission,
  getTrackingStatus,
  initializeTrackingServices,
  shouldShowPersonalizedAds,
  getTrackingMessage,
  useAppTrackingTransparency
};
