# 🎯 GUÍA COMPLETA ADMOB SETUP - FINANZASFÁCIL

## 📋 RESUMEN EJECUTIVO
Esta guía te llevará paso a paso para configurar Google AdMob en tu proyecto FinanzasFácil, tanto para web como para las apps móviles Android e iOS.

## 🎯 OBJETIVOS
- ✅ Configurar cuenta AdMob
- ✅ Crear apps en AdMob (Web, Android, iOS)
- ✅ Obtener Ad Unit IDs
- ✅ Integrar anuncios en la aplicación
- ✅ Monetización: €550-900/mes objetivo

---

## 🚀 PASO 1: CREAR CUENTA ADMOB

### 1.1 Acceder a AdMob
1. Ve a: **https://admob.google.com/**
2. Inicia sesión con tu cuenta Google (la misma de Firebase)
3. Haz clic en **"Comenzar"**

### 1.2 Información de la Cuenta
- **País**: España
- **Moneda**: EUR (Euro)
- **Método de pago**: Configurar después (necesitas ingresos mínimos)

---

## 📱 PASO 2: AGREGAR APPS EN ADMOB

### 2.1 App Web
1. En AdMob, haz clic en **"+ Agregar app"**
2. Selecciona **"Sitio web"**
3. **Nombre de la app**: `FinanzasFácil Web`
4. **URL del sitio web**: `https://finanzasmuyfaciles.netlify.app`
5. **Plataforma**: Web
6. Haz clic en **"Agregar"**

### 2.2 App Android
1. Haz clic en **"+ Agregar app"**
2. Selecciona **"Android"**
3. **Nombre de la app**: `FinanzasFácil Android`
4. **Nombre del paquete**: `com.lipastudios.finanzasfacil`
5. Haz clic en **"Agregar"**

### 2.3 App iOS
1. Haz clic en **"+ Agregar app"**
2. Selecciona **"iOS"**
3. **Nombre de la app**: `FinanzasFácil iOS`
4. **ID de la app**: `com.lipastudios.finanzasfacil`
5. Haz clic en **"Agregar"**

---

## 🎯 PASO 3: CREAR AD UNITS

### 3.1 Para cada app, crear estos tipos de anuncios:

#### **Banner Ads**
- **Nombre**: `Banner Principal`
- **Tipo**: Banner
- **Tamaño**: Adaptativo
- **Ubicación**: Footer de páginas

#### **Interstitial Ads**
- **Nombre**: `Interstitial Entre Secciones`
- **Tipo**: Interstitial
- **Ubicación**: Entre cambios de pantalla

#### **Rewarded Ads**
- **Nombre**: `Rewarded Premium`
- **Tipo**: Rewarded
- **Ubicación**: Para desbloquear funciones premium

### 3.2 Obtener Ad Unit IDs
Para cada Ad Unit creado, copia el **Ad Unit ID** que aparece. Te dará algo como:
```
ca-app-pub-3940256099942544/6300978111
```

---

## 📝 PASO 4: CONFIGURAR AD UNITS EN EL CÓDIGO

### 4.1 Crear archivo de configuración
Crear: `src/config/admob.ts`

```typescript
export const ADMOB_CONFIG = {
  // App IDs (uno por plataforma)
  APP_IDS: {
    ANDROID: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',
    IOS: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',
    WEB: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX'
  },
  
  // Ad Unit IDs
  AD_UNITS: {
    BANNER: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
    INTERSTITIAL: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
    REWARDED: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX'
  }
};
```

### 4.2 Actualizar capacitor.config.ts
```typescript
plugins: {
  AdMob: {
    appIdAndroid: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',
    appIdIos: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',
    appIdWeb: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',
    initializeForTesting: false // Cambiar a true para testing
  }
}
```

---

## 🔧 PASO 5: IMPLEMENTAR ANUNCIOS EN COMPONENTES

### 5.1 Banner Ad Component
```typescript
// src/components/AdMobBanner.tsx
import { AdMob } from '@capacitor-community/admob';
import { useEffect } from 'react';

export const AdMobBanner = () => {
  useEffect(() => {
    const showBanner = async () => {
      await AdMob.showBanner({
        adId: ADMOB_CONFIG.AD_UNITS.BANNER,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false
      });
    };
    
    showBanner();
  }, []);

  return null; // El banner se renderiza nativamente
};
```

### 5.2 Interstitial Ad Component
```typescript
// src/components/AdMobInterstitial.tsx
import { AdMob } from '@capacitor-community/admob';

export const showInterstitialAd = async () => {
  try {
    await AdMob.prepareInterstitial({
      adId: ADMOB_CONFIG.AD_UNITS.INTERSTITIAL,
      isTesting: false
    });
    
    await AdMob.showInterstitial();
  } catch (error) {
    console.log('Error showing interstitial:', error);
  }
};
```

### 5.3 Rewarded Ad Component
```typescript
// src/components/AdMobRewarded.tsx
import { AdMob } from '@capacitor-community/admob';

export const showRewardedAd = async (): Promise<boolean> => {
  try {
    await AdMob.prepareRewardVideoAd({
      adId: ADMOB_CONFIG.AD_UNITS.REWARDED,
      isTesting: false
    });
    
    const result = await AdMob.showRewardVideoAd();
    return result.rewarded; // true si el usuario vio el anuncio completo
  } catch (error) {
    console.log('Error showing rewarded ad:', error);
    return false;
  }
};
```

---

## 🎨 PASO 6: INTEGRAR ANUNCIOS EN LA APP

### 6.1 Banner en Landing Page
```typescript
// En App.tsx, agregar al final de la landing page
import { AdMobBanner } from './components/AdMobBanner';

// En el return de la landing page
<div className="fixed bottom-0 left-0 right-0 z-50">
  <AdMobBanner />
</div>
```

### 6.2 Interstitial entre pantallas
```typescript
// En App.tsx, agregar antes de setMode
import { showInterstitialAd } from './components/AdMobInterstitial';

const handleModeChange = async (newMode: string) => {
  // Mostrar interstitial cada 3 navegaciones
  if (Math.random() < 0.3) {
    await showInterstitialAd();
  }
  setMode(newMode);
};
```

### 6.3 Rewarded para funciones premium
```typescript
// En componentes que requieren premium
import { showRewardedAd } from './components/AdMobRewarded';

const unlockPremiumFeature = async () => {
  const rewarded = await showRewardedAd();
  if (rewarded) {
    // Desbloquear función premium
    setPremiumUnlocked(true);
  }
};
```

---

## 🧪 PASO 7: TESTING Y DEPLOYMENT

### 7.1 Testing Mode
Durante desarrollo, usar IDs de test:
```typescript
// IDs de test de Google (NO monetizan)
const TEST_AD_UNITS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917'
};
```

### 7.2 Producción
Antes de publicar en stores:
1. Cambiar `isTesting: false`
2. Usar IDs reales de AdMob
3. Verificar que los anuncios cargan correctamente
4. Testear en dispositivos reales

---

## 📊 PASO 8: MONITOREO Y OPTIMIZACIÓN

### 8.1 Métricas a Seguir
- **Impressions**: Número de anuncios mostrados
- **CTR (Click Through Rate)**: % de clics
- **eCPM**: Ingresos por mil impresiones
- **Fill Rate**: % de anuncios que se cargan

### 8.2 Objetivos de Ingresos
- **Mes 1-3**: €50-150/mes
- **Mes 4-6**: €300-800/mes
- **Mes 12+**: €1,000-2,500/mes

### 8.3 Optimizaciones
- **A/B Testing**: Diferentes posiciones de anuncios
- **Frecuencia**: No saturar al usuario
- **Calidad**: Anuncios relevantes para finanzas
- **UX**: Anuncios que no interrumpan la experiencia

---

## 🚨 CONSIDERACIONES IMPORTANTES

### ⚠️ Políticas AdMob
- **Contenido**: No anuncios en contenido sensible
- **Tráfico**: Solo tráfico orgánico real
- **Clics**: Prohibido hacer clic en tus propios anuncios
- **Contenido**: Debe ser útil y de calidad

### ⚠️ UX/UI
- **No intrusivo**: Anuncios que no molesten
- **Relevante**: Anuncios relacionados con finanzas
- **Balance**: Monetización vs experiencia de usuario
- **Testing**: Probar en diferentes dispositivos

### ⚠️ Legal
- **GDPR**: Cumplir con regulaciones europeas
- **Cookies**: Aviso de cookies si es necesario
- **Privacidad**: Política de privacidad actualizada

---

## 📋 CHECKLIST FINAL

### ✅ Configuración AdMob
- [ ] Cuenta AdMob creada
- [ ] 3 apps agregadas (Web, Android, iOS)
- [ ] Ad Units creados (Banner, Interstitial, Rewarded)
- [ ] Ad Unit IDs copiados

### ✅ Implementación Código
- [ ] Plugin AdMob instalado
- [ ] Configuración en capacitor.config.ts
- [ ] Componentes de anuncios creados
- [ ] Integración en App.tsx

### ✅ Testing
- [ ] Testing con IDs de prueba
- [ ] Verificación en dispositivos reales
- [ ] Anuncios cargan correctamente
- [ ] No errores en consola

### ✅ Producción
- [ ] IDs reales configurados
- [ ] isTesting: false
- [ ] Apps publicadas en stores
- [ ] Monitoreo activado

---

## 🎯 PRÓXIMOS PASOS

1. **Seguir esta guía paso a paso**
2. **Configurar AdMob** (30-45 minutos)
3. **Implementar anuncios** en el código
4. **Testing** en dispositivos reales
5. **Primera build** para stores
6. **Publicar** y comenzar monetización

---

## 💰 PROYECCIÓN DE INGRESOS

Con 5,000 usuarios activos mensuales:
- **Banner Ads**: €200-400/mes
- **Interstitial**: €250-500/mes  
- **Rewarded**: €100-200/mes
- **TOTAL**: €550-1,100/mes

¡Con una buena implementación, puedes alcanzar fácilmente los €1,000/mes en 6 meses!

---

*Guía creada para FinanzasFácil - Estrategia Multiplataforma 2025*
*Próximo paso: Configurar AdMob siguiendo esta guía*
