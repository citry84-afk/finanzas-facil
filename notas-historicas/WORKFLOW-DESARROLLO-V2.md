# 🚀 WORKFLOW DE DESARROLLO V2.0

## 🎯 OBJETIVO

**Aplicar cambios simultáneamente a todas las plataformas:**
- ✅ **Web (HTML)** - Netlify (actualización automática)
- ✅ **iOS** - App Store (sincronización automática)
- ✅ **Android** - Google Play (cuando esté listo)

---

## 📋 COMANDOS PRINCIPALES

### **⭐ Build para Todas las Plataformas (Recomendado)**
```bash
npm run build:all
```

**Qué hace:**
1. Compila para producción (Web)
2. Sincroniza con iOS
3. Sincroniza con Android (si existe)
4. Listo para desplegar

**Cuándo usar:**
- Después de hacer cambios importantes
- Antes de actualizar todas las plataformas
- Para asegurar que todo está sincronizado

---

### **🍎 Actualizar iOS**
```bash
npm run update:ios
```

**Qué hace:**
1. Compila para producción
2. Sincroniza con iOS
3. Opcional: Abre Xcode

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar iOS
- Para probar cambios en iOS rápidamente
- Antes de compilar para App Store

---

### **🌐 Actualizar Web (Netlify)**
```bash
npm run update:web
```

**Qué hace:**
1. Compila para producción
2. Despliega a Netlify (producción)

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar solo la web
- Para desplegar cambios rápidamente a Netlify
- Cuando Netlify no se actualiza automáticamente

---

### **🤖 Actualizar Android (Cuando esté listo)**
```bash
npm run update:android
```

**Qué hace:**
1. Compila para producción
2. Sincroniza con Android
3. Opcional: Abre Android Studio

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar Android
- Para probar cambios en Android rápidamente
- Antes de compilar para Google Play

---

## 🔄 WORKFLOW DIARIO

### **Paso 1: Haces cambios en el código**
- Editas archivos en `src/`
- Añades nuevas características
- Corriges bugs

### **Paso 2: Compilas y sincronizas**
```bash
npm run build:all
```

### **Paso 3: Pruebas en cada plataforma**
- **Web:** Abre `dist/index.html` o revisa Netlify
- **iOS:** Abre `ios/App/App.xcworkspace` en Xcode
- **Android:** Abre `android` en Android Studio (cuando esté listo)

### **Paso 4: Desplegas cuando estés listo**
- **Web:** Netlify se actualiza automáticamente (si está conectado a Git)
- **iOS:** Compilas en Xcode y subes a App Store Connect
- **Android:** Compilas en Android Studio y subes a Google Play Console (cuando esté listo)

---

## ⚡ COMANDOS RÁPIDOS

### **Después de hacer cambios:**
```bash
npm run build:all
```

### **Solo actualizar iOS:**
```bash
npm run update:ios
```

### **Solo actualizar Web:**
```bash
npm run update:web
```

### **Solo sincronizar (sin build):**
```bash
npm run sync:all
```

---

## 🌐 NETLIFY (WEB)

### **Actualización Automática (Recomendado):**
Si Netlify está conectado a Git:
- **Cada commit** → Netlify compila y despliega automáticamente
- **No necesitas** ejecutar `npm run update:web`
- **Solo necesitas** hacer commit y push

### **Actualización Manual:**
Si Netlify NO está conectado a Git:
- **Ejecuta:** `npm run update:web`
- **Netlify desplegará** los cambios manualmente

---

## 🍎 iOS

### **Actualizar iOS:**
```bash
npm run update:ios
```

### **Abrir en Xcode:**
```bash
open ios/App/App.xcworkspace
```

### **Compilar para App Store:**
1. Abre Xcode
2. Selecciona "Any iOS Device"
3. Product → Archive
4. Distribute App → App Store Connect
5. Sigue el asistente

---

## 🤖 ANDROID (Cuando esté listo)

### **Actualizar Android:**
```bash
npm run update:android
```

### **Abrir en Android Studio:**
```bash
open -a "Android Studio" android
```

### **Compilar para Google Play:**
1. Abre Android Studio
2. Build → Generate Signed Bundle / APK
3. Selecciona AAB (Android App Bundle)
4. Sube a Google Play Console

---

## 📝 NOTAS IMPORTANTES

### **1. Siempre Compila Antes de Sincronizar**
- **Siempre ejecuta** `npm run build` antes de sincronizar
- **Capacitor sincroniza** el contenido de `dist/` a las apps nativas
- **Si no compilas**, los cambios no se reflejarán en las apps

### **2. Netlify se Actualiza Automáticamente**
- Si Netlify está conectado a Git, se actualiza automáticamente
- **No necesitas** ejecutar `npm run update:web` manualmente
- **Solo necesitas** hacer commit y push

### **3. iOS Requiere Xcode**
- Después de sincronizar, abre Xcode para probar
- **Xcode es necesario** para compilar y probar en dispositivo
- **No puedes probar iOS** sin Xcode

### **4. Android Requiere Android Studio**
- Cuando esté listo, Android Studio será necesario
- **Android Studio es necesario** para compilar y probar
- **No puedes probar Android** sin Android Studio

---

## 🚀 EJEMPLO DE USO

### **Escenario 1: Haces un cambio y quieres actualizar todo**

```bash
# 1. Haces cambios en el código
# 2. Compilas y sincronizas
npm run build:all

# 3. Pruebas
# - Web: Revisa Netlify
# - iOS: Abre Xcode
# - Android: Abre Android Studio (cuando esté listo)
```

### **Escenario 2: Solo quieres actualizar iOS**

```bash
# 1. Haces cambios en el código
# 2. Actualizas iOS
npm run update:ios

# 3. Pruebas en iOS
# - Abre Xcode
# - Prueba en dispositivo o simulador
```

### **Escenario 3: Solo quieres actualizar Web**

```bash
# 1. Haces cambios en el código
# 2. Actualizas Web
npm run update:web

# 3. Revisa Netlify
# - Los cambios deberían estar disponibles
```

---

## ✅ RESUMEN

### **Workflow Recomendado:**

1. **Haces cambios** en el código
2. **Ejecutas:** `npm run build:all`
3. **Pruebas** en cada plataforma
4. **Desplegas** cuando estés listo

### **Comandos Principales:**
- `npm run build:all` - Build para todas las plataformas
- `npm run update:ios` - Actualizar iOS
- `npm run update:web` - Actualizar Web (Netlify)
- `npm run update:android` - Actualizar Android (cuando esté listo)

---

## 🎯 PRÓXIMOS PASOS

### **1. Probar el Workflow:**
```bash
# 1. Haz un pequeño cambio en el código
# 2. Ejecuta:
npm run build:all

# 3. Verifica que:
# - dist/ tiene los cambios
# - iOS tiene los cambios (abre Xcode)
# - Netlify tiene los cambios (revisa el sitio)
```

### **2. Configurar Netlify (Si no está configurado):**
```bash
# Autenticarse en Netlify
npx netlify login

# Conectar a Git (recomendado)
# Ve a Netlify Dashboard → Site settings → Build & deploy
# Conecta tu repositorio Git
```

### **3. Automatizar con Git (Opcional):**
```bash
# Crear hook de pre-commit (opcional)
# Para asegurar que siempre se compila antes de commit
```

---

## 🎉 ¡LISTO!

**Ahora todos los cambios se aplicarán simultáneamente a Web e iOS (y Android cuando esté listo).**

**Solo ejecuta:** `npm run build:all` después de hacer cambios.

---

**Última actualización:** 2025-11-12  
**Versión:** 2.0.0  
**Estado:** ✅ Scripts configurados y listos

