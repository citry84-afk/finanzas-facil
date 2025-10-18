# 🔓 REGLAS DE FIREBASE PÚBLICAS PARA ADSENSE

## ⚠️ IMPORTANTE: Aprobación de Google AdSense

Google AdSense **RECHAZA sitios con contenido bloqueado por autenticación**.

Para que AdSense apruebe tu sitio, **TODO el contenido debe ser público y accesible** sin login.

---

## 📋 REGLAS PÚBLICAS PARA FIRESTORE

Copia y pega estas reglas en **Firebase Console → Firestore Database → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // TODO EL CONTENIDO ES PÚBLICO
    // Esto permite que Google AdSense rastree y apruebe el sitio
    
    // Usuarios - Solo escritura autenticada (lectura pública para perfiles)
    match /users/{userId} {
      // Cualquiera puede leer perfiles públicos
      allow read: if true;
      // Solo el usuario propietario puede modificar sus datos
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Datos de la app - TODO PÚBLICO
    match /appData/{document=**} {
      // Lectura pública para AdSense
      allow read: if true;
      // Escritura solo para usuarios autenticados
      allow write: if request.auth != null;
    }
    
    // Contenido - TODO PÚBLICO
    match /content/{document=**} {
      // Lectura pública para AdSense
      allow read: if true;
      // Escritura solo para usuarios autenticados
      allow write: if request.auth != null;
    }
    
    // Analytics - TODO PÚBLICO (lectura) pero escritura protegida
    match /analytics/{document=**} {
      // Lectura pública para AdSense
      allow read: if true;
      // Escritura solo para usuarios autenticados
      allow write: if request.auth != null;
    }
    
    // Calculadoras y resultados - TODO PÚBLICO
    match /calculators/{document=**} {
      // Lectura pública para AdSense
      allow read: if true;
      // Escritura solo para usuarios autenticados
      allow write: if request.auth != null;
    }
  }
}
```

---

## ✅ PASOS PARA APLICAR:

1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto: **finanzas-facil-fe8eb**
3. Menú lateral → **Firestore Database**
4. Pestaña **"Rules"**
5. **BORRA** todas las reglas actuales
6. **COPIA Y PEGA** las reglas de arriba
7. Haz clic en **"Publicar"**

---

## 🎯 RESULTADO:

- ✅ **TODO el contenido es accesible públicamente**
- ✅ **Google AdSense puede rastrear e indexar todo**
- ✅ **Los usuarios autenticados pueden guardar datos**
- ✅ **Sin barreras de autenticación para visitantes**

---

## 🔄 DESPUÉS DE LA APROBACIÓN:

Una vez que AdSense apruebe tu sitio:
- Puedes **reactivar los botones de login** (actualmente ocultos)
- Puedes agregar **features premium** para usuarios registrados
- El contenido principal **DEBE seguir siendo público** para mantener AdSense

---

## 📝 NOTAS:

- **Login/Registro están OCULTOS** temporalmente en la landing page
- **Todo el contenido es accesible** sin autenticación
- **Las calculadoras funcionan sin login**
- **AdSense puede rastrear todo el sitio**

