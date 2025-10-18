# 🚨 URGENTE: Configurar Reglas de Seguridad de Firestore

## ⚠️ PROBLEMA CRÍTICO
- **Firestore está en Test Mode**
- **Las reglas de seguridad CADUCAN HOY (días restantes: 0)**
- **Sin reglas = La app no podrá acceder a la base de datos**

## 🔧 SOLUCIÓN INMEDIATA

### PASO 1: Ir a Firebase Console
1. Ve a: **https://console.firebase.google.com/**
2. Selecciona el proyecto: **Finanzas-facil**

### PASO 2: Configurar Firestore Security Rules
1. En el menú lateral, haz clic en **"Firestore Database"**
2. Ve a la pestaña **"Rules"**
3. **REEMPLAZA** las reglas actuales con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para usuarios autenticados
    match /users/{userId} {
      // Solo el usuario propietario puede leer/escribir sus datos
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reglas para datos de la app (calculadoras, etc.)
    match /appData/{document} {
      // Solo usuarios autenticados pueden leer
      allow read: if request.auth != null;
      // Solo admins pueden escribir (opcional)
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Reglas para contenido público (artículos, etc.)
    match /content/{document} {
      // Cualquiera puede leer contenido público
      allow read: if true;
      // Solo admins pueden escribir
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Reglas para analytics y métricas
    match /analytics/{document} {
      // Solo usuarios autenticados pueden escribir analytics
      allow write: if request.auth != null;
      // Solo admins pueden leer analytics
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### PASO 3: Publicar las Reglas
1. Haz clic en **"Publish"** (Publicar)
2. Confirma la acción

## 🎯 REGLAS EXPLICADAS

### ✅ **¿Qué permiten estas reglas?**

**Para usuarios autenticados:**
- ✅ Leer/escribir sus propios datos de usuario
- ✅ Leer datos de la app (calculadoras, etc.)
- ✅ Escribir analytics personales

**Para contenido público:**
- ✅ Cualquiera puede leer artículos, guías, etc.
- ✅ Solo admins pueden modificar contenido

**Para admins:**
- ✅ Acceso completo a todos los datos
- ✅ Pueden escribir contenido público

### 🛡️ **¿Qué protegen?**
- ❌ Usuarios no pueden acceder a datos de otros usuarios
- ❌ Usuarios no pueden modificar contenido público
- ❌ Usuarios no autenticados no pueden escribir datos

## 🚨 IMPORTANTE
- **HAZLO AHORA** - Las reglas caducan hoy
- **Sin estas reglas** = La app no funcionará
- **Con estas reglas** = App funcionará + Datos protegidos

## 📞 ¿NECESITAS AYUDA?
Si tienes problemas, dime y te ayudo paso a paso.

