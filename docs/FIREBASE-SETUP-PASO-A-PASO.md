# 🔥 FIREBASE: CONFIGURACIÓN PASO A PASO (SUPER DETALLADA)

**Tiempo estimado:** 30-40 minutos  
**Dificultad:** Fácil (solo seguir pasos)

---

## 📋 ANTES DE EMPEZAR

### ✅ Necesitas:
1. Cuenta de Google (gmail)
2. Navegador (Chrome recomendado)
3. 30 minutos de tiempo
4. Los archivos del proyecto abiertos

### 📂 Archivos que vamos a descargar:
- `google-services.json` (Android)
- `GoogleService-Info.plist` (iOS)

### 📝 Datos que vamos a anotar:
- Firebase API Key
- Auth Domain
- Project ID
- Storage Bucket
- Messaging Sender ID
- App ID
- Measurement ID

---

## PASO 1: CREAR PROYECTO FIREBASE

### 1.1 Abrir Firebase Console
1. Ve a: **https://console.firebase.google.com/**
2. Inicia sesión con tu cuenta de Google
3. Verás una pantalla que dice "Welcome to Firebase"

### 1.2 Crear Nuevo Proyecto
1. Click en el botón grande **"Agregar proyecto"** o **"Create a project"**
2. Te llevará a un wizard de 3 pasos

### 1.3 Paso 1 del wizard - Nombre del proyecto
```
Campo: "Nombre del proyecto"
Valor: FinanzasFacil
```
- **IMPORTANTE:** Usa exactamente `FinanzasFacil` (sin espacio, con F mayúscula)
- Abajo verás el "ID del proyecto": probablemente `finanzasfacil-xxxxx`
- Click en **"Continuar"**

### 1.4 Paso 2 del wizard - Google Analytics
```
Pregunta: "¿Habilitar Google Analytics para este proyecto?"
Respuesta: ✅ SÍ (dejar activado)
```
- Google Analytics es útil para ver usuarios y comportamiento
- Click en **"Continuar"**

### 1.5 Paso 3 del wizard - Cuenta de Analytics
```
Campo: "Cuenta de Analytics"
Valor: Selecciona "Default Account for Firebase" (o crea una nueva)
```
- Acepta los términos de Google Analytics
- Click en **"Crear proyecto"**

### 1.6 Esperar
- Verás una barra de progreso
- Tarda 30-60 segundos
- Cuando termine, click en **"Continuar"**

---

## PASO 2: CONFIGURAR APP ANDROID

### 2.1 Ir a Configuración del Proyecto
1. En la página principal del proyecto, verás un ícono de tuerca ⚙️ arriba a la izquierda
2. Click en ⚙️ → **"Configuración del proyecto"**
3. Verás pestañas: General, Uso, Cuentas de servicio...
4. Quédate en la pestaña **"General"**

### 2.2 Agregar App Android
1. Scroll hacia abajo hasta la sección **"Tus apps"**
2. Verás 3 opciones: iOS, Android, Web
3. Click en el ícono de **Android** (un robot verde)

### 2.3 Registrar App Android - Paso 1
```
Campo: "Nombre del paquete de Android"
Valor: com.lipastudios.finanzasfacil
```
**IMPORTANTE:** Copia y pega EXACTAMENTE esto: `com.lipastudios.finanzasfacil`

```
Campo: "Sobrenombre de la app (opcional)"
Valor: FinanzasFacil Android
```

```
Campo: "Certificado de firma SHA-1 de depuración (opcional)"
Valor: (DÉJALO VACÍO por ahora)
```
- Lo configuraremos después
- Click en **"Registrar app"**

### 2.4 Descargar google-services.json
1. Verás un botón **"Descargar google-services.json"**
2. Click en ese botón
3. Se descargará un archivo llamado `google-services.json`
4. **GUARDA ESTE ARCHIVO** - lo necesitaremos en el Paso 8

### 2.5 Siguiente
1. Verás instrucciones sobre cómo agregar el archivo
2. **IGNORA** estas instrucciones por ahora
3. Click en **"Siguiente"** (abajo a la derecha)
4. Sigue clickeando **"Siguiente"** hasta llegar a **"Continuar a la consola"**
5. Click en **"Continuar a la consola"**

---

## PASO 3: CONFIGURAR APP iOS

### 3.1 Agregar App iOS
1. Estás de vuelta en "Configuración del proyecto"
2. En la sección **"Tus apps"**, ahora verás tu app Android
3. Click en el ícono de **iOS** (una manzana)

### 3.2 Registrar App iOS - Paso 1
```
Campo: "ID del paquete de iOS"
Valor: com.lipastudios.finanzasfacil
```
**IMPORTANTE:** Usa EXACTAMENTE el mismo que Android: `com.lipastudios.finanzasfacil`

```
Campo: "Sobrenombre de la app (opcional)"
Valor: FinanzasFacil iOS
```

```
Campo: "ID de App Store (opcional)"
Valor: (DÉJALO VACÍO)
```
- Lo tendrás cuando publiques en App Store
- Click en **"Registrar app"**

### 3.3 Descargar GoogleService-Info.plist
1. Verás un botón **"Descargar GoogleService-Info.plist"**
2. Click en ese botón
3. Se descargará un archivo llamado `GoogleService-Info.plist`
4. **GUARDA ESTE ARCHIVO** - lo necesitaremos en el Paso 8

### 3.4 Siguiente
1. Click en **"Siguiente"** hasta llegar a **"Continuar a la consola"**
2. Click en **"Continuar a la consola"**

---

## PASO 4: HABILITAR AUTHENTICATION

### 4.1 Ir a Authentication
1. En el menú lateral izquierdo, busca **"Compilación"** o **"Build"**
2. Click en **"Authentication"**
3. Si es la primera vez, verás un botón **"Comenzar"** o **"Get started"**
4. Click en **"Comenzar"**

### 4.2 Ir a "Sign-in method"
1. Verás 3 pestañas arriba: Users, Sign-in method, Templates
2. Click en la pestaña **"Sign-in method"**
3. Verás una lista de proveedores de autenticación

### 4.3 Habilitar Email/Password
1. En la lista, busca **"Correo electrónico/contraseña"** o **"Email/Password"**
2. Click en esa fila (toda la fila es clickeable)
3. Se abrirá un modal/panel lateral

**En el modal:**
```
Toggle: "Correo electrónico/contraseña"
Estado: ✅ ACTIVADO (enable)
```

```
Toggle: "Link de correo electrónico (sin contraseña)"
Estado: ❌ DESACTIVADO (disabled)
```
- Solo activa el primero
- Click en **"Guardar"** o **"Save"**

### 4.4 Habilitar Google
1. En la lista, busca **"Google"**
2. Click en esa fila
3. Se abrirá un modal/panel lateral

**En el modal:**
```
Toggle superior: "Habilitar"
Estado: ✅ ACTIVADO
```

```
Campo: "Correo electrónico de asistencia del proyecto"
Valor: TU EMAIL (el de tu cuenta de Google)
```
- Usa el email con el que creaste el proyecto
- Click en **"Guardar"**

### 4.5 Habilitar Apple (solo iOS)
1. En la lista, busca **"Apple"**
2. Click en esa fila
3. Se abrirá un modal/panel lateral

**En el modal:**
```
Toggle superior: "Habilitar"
Estado: ✅ ACTIVADO
```
- No necesitas configurar nada más por ahora
- Click en **"Guardar"**

**Resultado:**
Ahora deberías ver 3 proveedores habilitados:
- ✅ Correo electrónico/contraseña
- ✅ Google
- ✅ Apple

---

## PASO 5: CONFIGURAR FIRESTORE DATABASE

### 5.1 Ir a Firestore Database
1. En el menú lateral izquierdo, bajo **"Compilación"**
2. Click en **"Firestore Database"**
3. Verás un botón **"Crear base de datos"** o **"Create database"**
4. Click en **"Crear base de datos"**

### 5.2 Modo de Seguridad
Te preguntará sobre las reglas de seguridad:

**Opciones:**
- Modo de producción (todo bloqueado)
- Modo de prueba (todo permitido temporalmente)

**Selecciona:** ✅ **"Empezar en modo de prueba"** o **"Start in test mode"**

**Por qué:**
- Más fácil para desarrollo
- Cambiaremos las reglas después

Click en **"Siguiente"**

### 5.3 Ubicación de Firestore
Te preguntará dónde alojar los datos:

**Recomendaciones por región:**
- España: `europe-west1` (Bélgica) o `europe-west3` (Frankfurt)
- Latinoamérica: `us-central1` (Iowa) o `southamerica-east1` (São Paulo)
- USA: `us-central1` (Iowa)

```
Campo: "Ubicación de Cloud Firestore"
Valor: Selecciona la más cercana a tus usuarios
```

**IMPORTANTE:** No podrás cambiar esto después

Click en **"Habilitar"** o **"Enable"**

### 5.4 Esperar
- Firestore se está creando
- Tarda 1-2 minutos
- Cuando termine, verás la interfaz de Firestore

### 5.5 Configurar Reglas de Seguridad
1. En Firestore, click en la pestaña **"Reglas"** arriba
2. Verás un editor de código
3. **BORRA TODO** el contenido actual
4. **PEGA** esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper: verificar si está autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función helper: verificar si es el dueño
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Colección de usuarios
    match /users/{userId} {
      // Solo el usuario puede leer/escribir sus propios datos
      allow read, write: if isAuthenticated() && isOwner(userId);
      
      // Sub-colección: cálculos
      match /calculations/{calculationId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      // Sub-colección: gastos trackeados
      match /trackedExpenses/{expenseId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      // Sub-colección: configuración
      match /settings/{document=**} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
    }
  }
}
```

5. Click en **"Publicar"** o **"Publish"**

---

## PASO 6: CONFIGURAR CLOUD MESSAGING (NOTIFICACIONES)

### 6.1 Ir a Cloud Messaging
1. En el menú lateral izquierdo
2. Click en **"Cloud Messaging"**
3. Ya está habilitado por defecto ✅

### 6.2 Anotar IDs (opcional)
Si quieres enviar notificaciones desde backend:
1. Verás **"Server key"**
2. Verás **"Sender ID"**
3. Anótalos si los necesitas

**Por ahora:** No hace falta hacer nada más aquí.

---

## PASO 7: OBTENER CREDENCIALES WEB

### 7.1 Agregar App Web
1. Ve a ⚙️ → **"Configuración del proyecto"**
2. En la sección **"Tus apps"**, verás Android e iOS
3. Click en el ícono **Web** `</>`
4. Se abrirá un modal

### 7.2 Registrar App Web
```
Campo: "Sobrenombre de la app"
Valor: FinanzasFacil Web
```

```
Checkbox: "También configurar Firebase Hosting"
Estado: ✅ MARCADO
```

Click en **"Registrar app"**

### 7.3 COPIAR CREDENCIALES (IMPORTANTE)
Verás un código JavaScript como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDEMO_KEY_1234567890abcdefghijk",
  authDomain: "finanzasfacil-xxxxx.firebaseapp.com",
  projectId: "finanzasfacil-xxxxx",
  storageBucket: "finanzasfacil-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

**COPIA ESTAS CREDENCIALES** - Las necesitaremos en el Paso 8

### 7.4 Guardar las credenciales
Abre un editor de texto (Notepad, TextEdit, etc.) y pega:

```
API_KEY=AIzaSyDEMO_KEY_1234567890abcdefghijk
AUTH_DOMAIN=finanzasfacil-xxxxx.firebaseapp.com
PROJECT_ID=finanzasfacil-xxxxx
STORAGE_BUCKET=finanzasfacil-xxxxx.appspot.com
MESSAGING_SENDER_ID=123456789012
APP_ID=1:123456789012:web:abcdef1234567890
MEASUREMENT_ID=G-XXXXXXXXXX
```

**Reemplaza con TUS valores reales**

Click en **"Continuar a la consola"**

---

## PASO 8: CONFIGURAR ARCHIVOS EN EL PROYECTO

### 8.1 Copiar google-services.json (Android)

**En tu Mac:**

1. Busca el archivo `google-services.json` que descargaste en el Paso 2
2. Probablemente está en tu carpeta **"Descargas"** o **"Downloads"**
3. Cópialo
4. Pégalo en esta ruta EXACTA:

```
/Users/papi/FinancasFacil/android/app/google-services.json
```

**Verificar:**
```bash
ls -la /Users/papi/FinancasFacil/android/app/google-services.json
```
Debería mostrar el archivo.

### 8.2 Copiar GoogleService-Info.plist (iOS)

**En tu Mac:**

1. Busca el archivo `GoogleService-Info.plist` que descargaste en el Paso 3
2. Probablemente está en **"Descargas"**
3. Cópialo
4. Pégalo en esta ruta EXACTA:

```
/Users/papi/FinancasFacil/ios/App/App/GoogleService-Info.plist
```

**Verificar:**
```bash
ls -la /Users/papi/FinancasFacil/ios/App/App/GoogleService-Info.plist
```
Debería mostrar el archivo.

### 8.3 Crear archivo .env (Credenciales Web)

**En tu Mac:**

1. Abre Terminal o usa tu editor de código
2. Ve a la carpeta del proyecto:
```bash
cd /Users/papi/FinancasFacil
```

3. Crea un archivo `.env`:
```bash
touch .env
```

4. Abre el archivo `.env` con tu editor
5. Pega esto (REEMPLAZA con tus credenciales del Paso 7):

```env
VITE_FIREBASE_API_KEY=AIzaSyDEMO_KEY_1234567890abcdefghijk
VITE_FIREBASE_AUTH_DOMAIN=finanzasfacil-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finanzasfacil-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=finanzasfacil-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

6. **GUARDA** el archivo

### 8.4 Agregar .env al .gitignore

**IMPORTANTE:** No queremos commitear las credenciales

1. Abre `.gitignore`
2. Agrega al final:

```
# Firebase credentials
.env
.env.local
.env.production
google-services.json
GoogleService-Info.plist
```

3. Guarda el archivo

---

## PASO 9: SYNC Y TEST

### 9.1 Sync Capacitor

En Terminal:

```bash
cd /Users/papi/FinancasFacil
npx cap sync
```

Deberías ver:
```
✔ Copying web assets...
✔ Updating Android plugins...
✔ Updating iOS plugins...
✔ Sync finished
```

### 9.2 Verificar Instalación

Verifica que los archivos estén en su lugar:

```bash
# Android
ls -la android/app/google-services.json

# iOS
ls -la ios/App/App/GoogleService-Info.plist

# Web
ls -la .env
```

Todos deberían existir.

---

## PASO 10: TESTING (OPCIONAL PERO RECOMENDADO)

### 10.1 Test Web (Local)

```bash
npm run dev
```

Abre http://localhost:5173

Intenta:
- Ir a la página de login
- Crear una cuenta con email
- Debería funcionar (si no, revisa la consola del navegador)

### 10.2 Verificar en Firebase Console

1. Ve a Firebase Console → Authentication → Users
2. Deberías ver el usuario que creaste
3. ✅ Si aparece = TODO FUNCIONA

---

## ✅ CHECKLIST FINAL

Marca cada item cuando lo completes:

### Firebase Console
- [ ] Proyecto Firebase creado
- [ ] App Android agregada
- [ ] App iOS agregada
- [ ] App Web agregada
- [ ] Authentication habilitado (Email, Google, Apple)
- [ ] Firestore Database creado
- [ ] Reglas de Firestore configuradas
- [ ] Cloud Messaging configurado

### Archivos Descargados
- [ ] `google-services.json` descargado
- [ ] `GoogleService-Info.plist` descargado
- [ ] Credenciales web copiadas

### Archivos en el Proyecto
- [ ] `android/app/google-services.json` copiado
- [ ] `ios/App/App/GoogleService-Info.plist` copiado
- [ ] `.env` creado con credenciales
- [ ] `.gitignore` actualizado

### Testing
- [ ] `npx cap sync` ejecutado sin errores
- [ ] Archivos verificados (existen)
- [ ] Test de login funcionando (opcional)

---

## 🆘 TROUBLESHOOTING

### Error: "No such file or directory: google-services.json"
**Solución:** Verifica que el archivo esté en `android/app/` (no en `android/`)

### Error: "GoogleService-Info.plist not found"
**Solución:** Verifica que el archivo esté en `ios/App/App/` (3 carpetas adentro)

### Error: "Firebase: Error (auth/invalid-api-key)"
**Solución:** Verifica que el `.env` tenga las credenciales correctas y esté en la raíz del proyecto

### Error: "Firebase App not initialized"
**Solución:** 
1. Verifica que `.env` existe
2. Reinicia el servidor de desarrollo (`npm run dev`)
3. Verifica que las variables empiecen con `VITE_`

### Login no funciona
**Solución:**
1. Ve a Firebase Console → Authentication
2. Verifica que Email/Password esté habilitado
3. Revisa la consola del navegador para ver el error exacto

---

## 📞 SIGUIENTE PASO

Una vez completado todo esto, avísame y continuamos con:
1. Integrar los componentes de Login en App.tsx
2. Crear rutas protegidas
3. Primera build de prueba

---

**TIEMPO TOTAL:** 30-40 minutos
**DIFICULTAD:** Fácil (solo seguir pasos)
**RESULTADO:** Firebase 100% configurado y funcionando

🔥 **¡Vamos, que puedes!**

