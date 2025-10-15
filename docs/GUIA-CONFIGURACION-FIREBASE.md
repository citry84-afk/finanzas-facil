# 🔥 GUÍA: CONFIGURACIÓN FIREBASE PARA FINANZASFÁCIL

## 📋 PREREQUISITOS
- Cuenta Google
- Acceso a [Firebase Console](https://console.firebase.google.com/)

---

## PASO 1: CREAR PROYECTO FIREBASE (5 min)

1. Ve a https://console.firebase.google.com/
2. Click en **"Agregar proyecto"**
3. Nombre del proyecto: **FinanzasFacil**
4. ID del proyecto: **finanzasfacil** (o el que te asignen)
5. ✅ Habilitar Google Analytics (recomendado)
6. Crear proyecto y esperar

---

## PASO 2: AGREGAR APP ANDROID (10 min)

1. En el proyecto, click en ⚙️ **"Configuración del proyecto"**
2. Click en el ícono de **Android**
3. Completar datos:
   - **Nombre del paquete Android:** `com.lipastudios.finanzasfacil`
   - **Sobrenombre de la app:** FinanzasFácil Android
   - **Certificado de firma SHA-1:** (opcional por ahora)
4. Click **"Registrar app"**
5. **DESCARGAR** `google-services.json`
6. **COPIAR** el archivo a: `/Users/papi/FinanzasFacil/android/app/google-services.json`
7. Skip los siguientes pasos, click en **"Continuar a la consola"**

---

## PASO 3: AGREGAR APP iOS (10 min)

1. En el proyecto, click en ⚙️ **"Configuración del proyecto"**
2. Click en el ícono de **iOS**
3. Completar datos:
   - **ID del paquete de iOS:** `com.lipastudios.finanzasfacil`
   - **Sobrenombre de la app:** FinanzasFácil iOS
   - **ID de App Store:** (dejar en blanco por ahora)
4. Click **"Registrar app"**
5. **DESCARGAR** `GoogleService-Info.plist`
6. **COPIAR** el archivo a: `/Users/papi/FinancasFacil/ios/App/App/GoogleService-Info.plist`
7. Skip los siguientes pasos, click en **"Continuar a la consola"**

---

## PASO 4: HABILITAR AUTHENTICATION (10 min)

1. En el menú lateral, ir a **"Authentication"**
2. Click **"Comenzar"**
3. Click en la pestaña **"Sign-in method"**

### 4.1 Habilitar Email/Password
1. Click en **"Correo electrónico/contraseña"**
2. ✅ Habilitar la primera opción (Correo electrónico/contraseña)
3. ❌ NO habilitar "Link de correo electrónico (sin contraseña)"
4. Guardar

### 4.2 Habilitar Google Sign-In
1. Click en **"Google"**
2. ✅ Habilitar
3. **Correo electrónico de asistencia del proyecto:** tu-email@gmail.com
4. Guardar

### 4.3 Habilitar Apple Sign-In (iOS)
1. Click en **"Apple"**
2. ✅ Habilitar
3. Guardar
4. (Configuración adicional se hace más tarde en Apple Developer)

---

## PASO 5: CONFIGURAR FIRESTORE DATABASE (10 min)

1. En el menú lateral, ir a **"Firestore Database"**
2. Click **"Crear base de datos"**
3. Seleccionar **"Empezar en modo de prueba"** (cambiaremos las reglas después)
4. Ubicación: **us-central1** (o la más cercana)
5. Habilitar

### 5.1 Configurar Reglas de Seguridad
1. Click en la pestaña **"Reglas"**
2. Reemplazar con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios autenticados pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /calculations/{calculationId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /trackedExpenses/{expenseId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /settings/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. **Publicar** las reglas

---

## PASO 6: CONFIGURAR CLOUD MESSAGING (5 min)

1. En el menú lateral, ir a **"Cloud Messaging"**
2. Ya está habilitado por defecto ✅
3. Toma nota de:
   - **Server key** (para enviar notificaciones desde backend)
   - **Sender ID** (para configurar en la app)

---

## PASO 7: OBTENER CREDENCIALES WEB (5 min)

1. En **"Configuración del proyecto"** → **"General"**
2. Scroll hasta **"Tus apps"**
3. Click en **"Agregar app"** → Seleccionar **Web** (ícono `</>`)
4. **Sobrenombre de la app:** FinanzasFácil Web
5. ✅ También configurar Firebase Hosting
6. Registrar app
7. **COPIAR** el objeto `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "finanzasfacil.firebaseapp.com",
  projectId: "finanzasfacil",
  storageBucket: "finanzasfacil.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXX"
};
```

8. **GUARDAR** estas credenciales (las necesitaremos)

---

## PASO 8: CONFIGURAR ARCHIVOS EN EL PROYECTO

### 8.1 Crear archivo de configuración Firebase
Crea: `/Users/papi/FinancasFacil/src/firebase/config.ts`

```typescript
// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIza...", // REEMPLAZAR con tu API Key
  authDomain: "finanzasfacil.firebaseapp.com",
  projectId: "finanzasfacil",
  storageBucket: "finanzasfacil.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXX"
};
```

### 8.2 Verificar archivos nativos
Verifica que estos archivos existan:
- ✅ `/Users/papi/FinanzasFacil/android/app/google-services.json`
- ✅ `/Users/papi/FinancasFacil/ios/App/App/GoogleService-Info.plist`

---

## PASO 9: SYNC Y BUILD

```bash
cd /Users/papi/FinancasFacil

# Sync cambios
npx cap sync

# Build Android (opcional, para probar)
cd android
./gradlew assembleDebug

# Build iOS (opcional, necesita Mac + Xcode)
# npx cap open ios
# Build desde Xcode
```

---

## 📊 ESTRUCTURA DE DATOS EN FIRESTORE

### Colección: `users`
```
users/
  {userId}/
    profile/
      - name: string
      - email: string
      - createdAt: timestamp
      - isPremium: boolean
      - subscriptionEnd: timestamp (nullable)
      
    calculations/
      {calculationId}/
        - type: "irpf" | "cuota" | "gastos"
        - inputs: object
        - results: object
        - date: timestamp
        
    trackedExpenses/
      {expenseId}/
        - category: string
        - amount: number
        - date: timestamp
        - deductible: boolean
        - description: string
        
    settings/
      - notifications: boolean
      - theme: "light" | "dark"
      - language: "es"
```

---

## 🔐 SEGURIDAD Y MEJORES PRÁCTICAS

### Reglas de Firestore (Producción)
Cuando estés listo para producción, actualiza las reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isPremium(userId) {
      return get(/databases/$(database)/documents/users/$(userId)/profile).data.isPremium == true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);
      
      match /calculations/{calculationId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      match /trackedExpenses/{expenseId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
        // Solo usuarios premium pueden tener más de 50 gastos
        allow create: if isAuthenticated() && isOwner(userId) && (
          isPremium(userId) || 
          get(/databases/$(database)/documents/users/$(userId)/trackedExpenses).size() < 50
        );
      }
      
      match /settings/{document=**} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
    }
  }
}
```

### Variables de Entorno
NUNCA commitees las credenciales de Firebase en Git. Usa variables de entorno:

```bash
# .env (NO commitear)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=finanzasfacil.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finanzasfacil
VITE_FIREBASE_STORAGE_BUCKET=finanzasfacil.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXX
```

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto Firebase creado
- [ ] App Android agregada
- [ ] App iOS agregada
- [ ] `google-services.json` descargado y copiado
- [ ] `GoogleService-Info.plist` descargado y copiado
- [ ] Authentication habilitado (Email, Google, Apple)
- [ ] Firestore Database creado
- [ ] Reglas de Firestore configuradas
- [ ] Cloud Messaging configurado
- [ ] Credenciales web obtenidas
- [ ] Archivo `src/firebase/config.ts` creado
- [ ] `npx cap sync` ejecutado
- [ ] Builds de prueba exitosos

---

## 🆘 TROUBLESHOOTING

### Error: "No se encuentra google-services.json"
- Verifica que el archivo esté en `android/app/google-services.json`
- Ejecuta `npx cap sync` nuevamente

### Error: "GoogleService-Info.plist no encontrado"
- Verifica que el archivo esté en `ios/App/App/GoogleService-Info.plist`
- Abre el proyecto en Xcode y agrega el archivo manualmente

### Error: "Firebase App not initialized"
- Verifica que las credenciales en `src/firebase/config.ts` sean correctas
- Asegúrate de que Firebase esté inicializado antes de usarlo

### Error al compilar Android
- Verifica que tengas Java JDK 17 instalado
- Ejecuta `./gradlew clean` y luego `./gradlew assembleDebug`

### Error al compilar iOS
- Verifica que CocoaPods esté actualizado: `pod repo update`
- Ejecuta `pod install` en `ios/App/`
- Abre Xcode y limpia build folder (Cmd+Shift+K)

---

## 📚 RECURSOS

- [Firebase Console](https://console.firebase.google.com/)
- [Capacitor Firebase Plugin Docs](https://github.com/capawesome-team/capacitor-firebase)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)

---

**ÚLTIMA ACTUALIZACIÓN:** 15 Octubre 2025
**ESTADO:** 📝 Guía lista para implementación

