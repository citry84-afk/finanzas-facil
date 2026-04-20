# 📱 CHECKLIST: GUIDELINES iOS y Android

## ✅ **LO QUE SÍ HACEMOS CON CÓDIGO ÚNICO:**

### **1. Capacitor (Multiplataforma)**
- ✅ **Una sola base de código** (`src/`) que se transpila para web, iOS y Android
- ✅ **Build:** `npm run build` → genera `dist/` para todas las plataformas
- ✅ **Deploy iOS:** `npx cap copy ios` + compilar en Xcode
- ✅ **Deploy Android:** `npx cap copy android` + `./gradlew assembleRelease`

### **2. Firebase (Multiplataforma)**
- ✅ Mismo `firebase/auth.ts` funciona en web, iOS y Android
- ✅ Configuraciones nativas (`GoogleService-Info.plist` iOS + `google-services.json` Android)

### **3. Componentes React (Multiplataforma)**
- ✅ Todos los componentes (`Login.tsx`, `Calculator.tsx`, etc.) funcionan en ambas plataformas

---

## 📋 **GUIDELINES APPLE APP STORE:**

### ✅ **1. Requisitos Técnicos:**
- ✅ `Info.plist` configurado con:
  - `CFBundleDisplayName`: "FinanzasFacil"
  - `NSUserTrackingUsageDescription`: Descripción de tracking
  - `CFBundleURLTypes`: Configurado para Google Sign-In
- ✅ `App.entitlements` con `com.apple.developer.applesignin`
- ✅ Aplicación mínima iOS 12.0+ (verificar en Xcode)
- ✅ Icono de la app (Assets.xcassets)
- ✅ Splash screen configurado

### ✅ **2. Requisitos de Contenido:**
- ✅ Descripción de la app (a definir en App Store Connect)
- ✅ Capturas de pantalla (preparar 6.5", 5.5", iPad)
- ✅ Política de privacidad URL (requerida por Apple)
- ✅ Email de soporte
- ✅ Categoría: "Finance" o "Productivity"

### ⚠️ **3. Pendiente (REQUIERE TU ACCIÓN):**
- ⏳ **TestFlight Beta Testing** (opcional pero recomendado)
- ⏳ **Privacy Policy** (crear URL pública)
- ⏳ **App Preview Video** (opcional, recomendado)

---

## 📋 **GUIDELINES GOOGLE PLAY STORE:**

### ✅ **1. Requisitos Técnicos:**
- ✅ `AndroidManifest.xml` configurado con:
  - Permisos: `INTERNET`, `ACCESS_NETWORK_STATE`
  - `applicationId`: `com.lipastudios.finanzasfacil`
  - AdMob App ID configurado
- ✅ Aplicación mínima Android 5.0 (API 21+)
- ✅ Icono de la app (mipmap)
- ✅ Splash screen configurado

### ✅ **2. Requisitos de Contenido:**
- ✅ Descripción de la app (a definir en Google Play Console)
- ✅ Capturas de pantalla (preparar diferentes tamaños)
- ✅ Política de privacidad URL (requerida por Google)
- ✅ Email de soporte
- ✅ Categoría: "Finance" o "Productivity"

### ⚠️ **3. Pendiente (REQUIERE TU ACCIÓN):**
- ⏳ **Google Play Console** (crear cuenta de desarrollador, €25 única vez)
- ⏳ **Privacy Policy** (crear URL pública)
- ⏳ **Content Rating** (opcional, recomendado)

---

## 🔥 **PRUEBAS REQUERIDAS:**

### **iOS:**
- ✅ Compilación exitosa
- ⏳ Google Sign-In funciona
- ⏳ Apple Sign-In funciona
- ⏳ Navegación fluida
- ⏳ Calculadoras funcionan correctamente
- ⏳ AdMob banners mostrándose

### **Android:**
- ⏳ Compilación (a verificar)
- ⏳ Google Sign-In funciona
- ⏳ Navegación fluida
- ⏳ Calculadoras funcionan correctamente
- ⏳ AdMob banners mostrándose

---

## 🚨 **PROBLEMAS CONOCIDOS:**

### **1. Google/Apple Sign-In en iOS:**
- ❌ **Estado:** No funciona (queda en "Procesando...")
- 🔧 **Causa posible:** Capacitor Firebase Auth plugin no configurado correctamente
- 🔧 **Solución pendiente:** Debugging en progreso

### **2. Apple Sign-In Requisito:**
- ⚠️ **Apple requiere:** Si ofreces otros métodos de login, DEBES ofrecer Apple Sign-In
- ✅ **Solución:** Ya lo implementamos

---

## 📊 **COMPARACIÓN: CÓDIGO vs CONFIGURACIÓN NATIVA:**

| Componente | Web | iOS | Android | Una Sola Base |
|------------|-----|-----|---------|---------------|
| React Components | ✅ | ✅ | ✅ | ✅ SÍ |
| Firebase Auth | ✅ | ✅ | ✅ | ✅ SÍ |
| Calculadoras | ✅ | ✅ | ✅ | ✅ SÍ |
| AdMob | ✅ | ✅ | ✅ | ✅ SÍ |
| Navigation | ✅ | ✅ | ✅ | ✅ SÍ |
| **Config nativa** | ❌ | **plist** | **XML** | ❌ NO |
| **Build** | Netlify | **Xcode** | **Gradle** | ❌ NO |

**Conclusión:** El código es el mismo, pero cada plataforma tiene su build nativo.

---

## 🎯 **PRÓXIMOS PASOS PARA PUBLICAR:**

### **PASO 1: Arreglar Sign-In** 🔥
- Prioridad máxima: Los métodos de login deben funcionar

### **PASO 2: Preparar Assets**
- Crear capturas de pantalla (iOS: 6.5", 5.5", iPad | Android: varios tamaños)
- Preparar iconos finales
- Escribir descripción de la app

### **PASO 3: Privacy Policy**
- Crear página web con política de privacidad
- URL pública (puede ser en tu dominio o páginas gratuitas)

### **PASO 4: App Store Connect (iOS)**
- Crear cuenta ($99/año)
- Configurar app
- Subir build

### **PASO 5: Google Play Console (Android)**
- Crear cuenta (€25 única vez)
- Configurar app
- Subir APK

---

## 💡 **RESPUESTA A TU PREGUNTA:**

> "¿Entiendo que cada cambio que hacemos en la app se traslada a todas las plataformas?"

**SÍ, PERO CON MATICES:**

1. ✅ **Código React (`src/`):** 100% compartido entre web, iOS y Android
2. ✅ **Lógica de negocio:** 100% compartida
3. ✅ **UI/UX:** 100% compartida
4. ❌ **Build process:** Cada plataforma tiene su build nativo
5. ❌ **Configuración nativa:** Cada plataforma tiene su `Info.plist` o `AndroidManifest.xml`

**Ejemplo práctico:**
- Añades una calculadora nueva → Se ve en web, iOS Y Android automáticamente
- Cambias un color → Se aplica en todas las plataformas
- Cambias configuración nativa iOS → Sólo afecta iOS

---

## ✅ **CONCLUSIÓN:**

**Estamos muy cerca** de cumplir las guidelines, pero:

1. ⚠️ **Sign-In debe funcionar** (prioridad máxima)
2. ⏳ Necesitamos tus capturas y descripciones
3. ⏳ Necesitamos crear la Privacy Policy
4. ✅ Todo lo demás está prácticamente listo

**¿Seguimos con el debugging del Sign-In?** 🔥
