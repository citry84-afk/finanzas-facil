# 🚀 GUÍA: BUILD AUTOMÁTICO PARA TODAS LAS PLATAFORMAS

## 🎯 OBJETIVO

**Aplicar cambios simultáneamente a:**
- ✅ **Web (HTML)** - Netlify
- ✅ **iOS** - App Store
- ✅ **Android** - Google Play (cuando esté listo)

---

## 📋 SCRIPTS DISPONIBLES

### **1. Build para Todas las Plataformas** ⭐⭐⭐
**Comando:** `npm run build:all`

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

### **2. Actualizar iOS** ⭐⭐
**Comando:** `npm run update:ios`

**Qué hace:**
1. Compila para producción
2. Sincroniza con iOS
3. Opcional: Abre Xcode

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar iOS
- Para probar cambios en iOS rápidamente
- Antes de compilar para App Store

---

### **3. Actualizar Android** ⭐⭐
**Comando:** `npm run update:android`

**Qué hace:**
1. Compila para producción
2. Sincroniza con Android
3. Opcional: Abre Android Studio

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar Android
- Para probar cambios en Android rápidamente
- Antes de compilar para Google Play

---

### **4. Actualizar Web (Netlify)** ⭐
**Comando:** `npm run update:web`

**Qué hace:**
1. Compila para producción
2. Despliega a Netlify (producción)

**Cuándo usar:**
- Después de hacer cambios y quieres actualizar solo la web
- Para desplegar cambios rápidamente a Netlify
- Cuando Netlify no se actualiza automáticamente

---

### **5. Sincronizar (sin build)** ⚡
**Comandos:**
- `npm run sync:ios` - Sincroniza iOS (requiere build previo)
- `npm run sync:android` - Sincroniza Android (requiere build previo)
- `npm run sync:all` - Sincroniza todas las plataformas (requiere build previo)

**Cuándo usar:**
- Cuando ya hiciste `npm run build` y solo quieres sincronizar
- Para sincronizar rápidamente sin recompilar
- Cuando cambias solo assets (imágenes, etc.)

---

## 🚀 WORKFLOW RECOMENDADO

### **Desarrollo Diario:**

1. **Haces cambios en el código**
2. **Compilas y sincronizas:**
   ```bash
   npm run build:all
   ```
3. **Pruebas en cada plataforma:**
   - Web: Abre `dist/index.html` o revisa Netlify
   - iOS: Abre `ios/App/App.xcworkspace` en Xcode
   - Android: Abre `android` en Android Studio (cuando esté listo)

---

### **Actualización Rápida (iOS + Web):**

```bash
# Opción 1: Build y sincronizar todo
npm run build:all

# Opción 2: Solo iOS
npm run update:ios

# Opción 3: Solo Web
npm run update:web
```

---

### **Actualización para Producción:**

1. **Compilar y sincronizar:**
   ```bash
   npm run build:all
   ```

2. **iOS (App Store):**
   ```bash
   # Abrir Xcode
   open ios/App/App.xcworkspace
   
   # En Xcode:
   # - Product → Archive
   # - Distribute App → App Store Connect
   ```

3. **Android (Google Play) - Cuando esté listo:**
   ```bash
   # Abrir Android Studio
   open -a "Android Studio" android
   
   # En Android Studio:
   # - Build → Generate Signed Bundle / APK
   # - Subir a Google Play Console
   ```

4. **Web (Netlify):**
   ```bash
   npm run update:web
   ```
   O Netlify se actualizará automáticamente si está conectado a Git

---

## 📋 FLUJO AUTOMÁTICO

### **Opción 1: Build Manual (Recomendado)**

```bash
# 1. Haces cambios en el código
# 2. Compilas y sincronizas
npm run build:all

# 3. Pruebas en cada plataforma
# 4. Desplegas cuando estés listo
```

---

### **Opción 2: Netlify Automático (Web)**

Si Netlify está conectado a Git:
- **Cada commit** → Netlify compila y despliega automáticamente
- **No necesitas** ejecutar `npm run update:web`
- **Solo necesitas** ejecutar `npm run build:all` para iOS/Android

---

## 🔧 CONFIGURACIÓN

### **Netlify (Web):**
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20
- **Auto-deploy:** Activado (si está conectado a Git)

### **Capacitor (iOS/Android):**
- **Web directory:** `dist`
- **App ID:** `com.lipastudios.finanzasfacil`
- **App name:** `FinanzasFácil`

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

## 📝 NOTAS IMPORTANTES

### **1. Build Siempre Antes de Sincronizar**
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

## 🚀 PRÓXIMOS PASOS

### **1. Configurar Netlify (Si no está configurado):**
```bash
# Autenticarse en Netlify
npx netlify login

# Conectar a Git (recomendado)
# Ve a Netlify Dashboard → Site settings → Build & deploy
# Conecta tu repositorio Git
```

### **2. Probar el Workflow:**
```bash
# 1. Haz un pequeño cambio en el código
# 2. Ejecuta:
npm run build:all

# 3. Verifica que:
# - dist/ tiene los cambios
# - iOS tiene los cambios (abre Xcode)
# - Netlify tiene los cambios (revisa el sitio)
```

### **3. Automatizar con Git (Opcional):**
```bash
# Crear hook de pre-commit (opcional)
# Para asegurar que siempre se compila antes de commit
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

**¡Ahora todos los cambios se aplicarán simultáneamente a Web e iOS!**

---

**Última actualización:** 2025-11-12  
**Versión:** 2.0.0  
**Estado:** ✅ Scripts configurados y listos

