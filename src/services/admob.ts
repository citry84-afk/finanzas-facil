import { AdMob, AdmobConsentStatus } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { ADMOB_CONFIG } from '../config/admob';

let initializationPromise: Promise<boolean> | null = null;

function canRequestAds(status: AdmobConsentStatus) {
  return status === AdmobConsentStatus.NOT_REQUIRED || status === AdmobConsentStatus.OBTAINED;
}

export function isNativeAdPlatform() {
  const platform = Capacitor.getPlatform();
  return platform === 'ios' || platform === 'android';
}

export function ensureAdMobReady() {
  if (!isNativeAdPlatform()) return Promise.resolve(false);

  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        await AdMob.initialize({
          initializeForTesting: ADMOB_CONFIG.TESTING.ENABLED,
          testingDevices: ADMOB_CONFIG.TESTING.TEST_DEVICE_IDS,
          tagForChildDirectedTreatment: ADMOB_CONFIG.PRIVACY.TAG_FOR_CHILD_DIRECTED_TREATMENT,
          tagForUnderAgeOfConsent: ADMOB_CONFIG.PRIVACY.TAG_FOR_UNDER_AGE_OF_CONSENT,
          maxAdContentRating: ADMOB_CONFIG.PRIVACY.MAX_AD_CONTENT_RATING,
        });

        let consentInfo = await AdMob.requestConsentInfo();
        if (consentInfo.status === AdmobConsentStatus.REQUIRED && consentInfo.isConsentFormAvailable) {
          consentInfo = await AdMob.showConsentForm();
        }

        return canRequestAds(consentInfo.status);
      } catch (error) {
        console.error('No se pudo preparar AdMob con consentimiento:', error);
        return false;
      }
    })();
  }

  return initializationPromise;
}

export async function openAdPrivacyChoices() {
  if (!isNativeAdPlatform()) return false;

  try {
    await AdMob.initialize({
      initializeForTesting: ADMOB_CONFIG.TESTING.ENABLED,
      testingDevices: ADMOB_CONFIG.TESTING.TEST_DEVICE_IDS,
      tagForChildDirectedTreatment: ADMOB_CONFIG.PRIVACY.TAG_FOR_CHILD_DIRECTED_TREATMENT,
      tagForUnderAgeOfConsent: ADMOB_CONFIG.PRIVACY.TAG_FOR_UNDER_AGE_OF_CONSENT,
      maxAdContentRating: ADMOB_CONFIG.PRIVACY.MAX_AD_CONTENT_RATING,
    });

    await AdMob.resetConsentInfo();
    const consentInfo = await AdMob.requestConsentInfo();
    if (consentInfo.status !== AdmobConsentStatus.REQUIRED || !consentInfo.isConsentFormAvailable) {
      return false;
    }

    const updatedConsent = await AdMob.showConsentForm();
    await AdMob.removeBanner().catch(() => undefined);
    initializationPromise = null;

    if (!canRequestAds(updatedConsent.status)) return false;
    return true;
  } catch (error) {
    console.error('No se pudieron abrir las preferencias de anuncios:', error);
    return false;
  }
}
