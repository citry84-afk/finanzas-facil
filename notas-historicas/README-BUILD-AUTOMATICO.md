# 🚀 BUILD AUTOMÁTICO - GUÍA RÁPIDA

## ⚡ COMANDO PRINCIPAL

### **Después de hacer cambios:**
```bash
npm run build:all
```

**Esto hace:**
1. ✅ Compila para producción (Web)
2. ✅ Sincroniza con iOS
3. ✅ Sincroniza con Android (si existe)
4. ✅ Listo para desplegar

---

## 📋 COMANDOS DISPONIBLES

### **Build para Todas las Plataformas:**
```bash
npm run build:all
```
- Compila y sincroniza Web, iOS y Android
- Usa este comando después de hacer cambios

### **Actualizar iOS:**
```bash
npm run update:ios
```
- Compila y sincroniza solo iOS
- Opcional: Abre Xcode

### **Actualizar Web (Netlify):**
```bash
npm run update:web
```
- Compila y despliega a Netlify
- Solo si Netlify NO está conectado a Git

### **Actualizar Android:**
```bash
npm run update:android
```
- Compila y sincroniza solo Android
- Opcional: Abre Android Studio

---

## 🔄 WORKFLOW SIMPLE

### **1. Haces cambios en el código**
```bash
# Editas archivos en src/
# Añades nuevas características
# Corriges bugs
```

### **2. Compilas y sincronizas**
```bash
npm run build:all
```

### **3. Pruebas en cada plataforma**
- **Web:** Revisa Netlify (se actualiza automáticamente si está conectado a Git)
- **iOS:** Abre `ios/App/App.xcworkspace` en Xcode
- **Android:** Abre `android` en Android Studio (cuando esté listo)

### **4. Desplegas cuando estés listo**
- **Web:** Netlify se actualiza automáticamente
- **iOS:** Compilas en Xcode y subes a App Store Connect
- **Android:** Compilas en Android Studio y subes a Google Play Console (cuando esté listo)

---

## 🌐 NETLIFY (WEB)

### **Actualización Automática (Recomendado):**
Si Netlify está conectado a Git:
- ✅ **Cada commit** → Netlify compila y despliega automáticamente
- ✅ **No necesitas** ejecutar `npm run update:web`
- ✅ **Solo necesitas** hacer commit y push

### **Actualización Manual:**
Si Netlify NO está conectado a Git:
- ⚠️ **Ejecuta:** `npm run update:web`
- ⚠️ **Netlify desplegará** los cambios manualmente

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

## ✅ RESUMEN

### **Workflow Recomendado:**
1. **Haces cambios** en el código
2. **Ejecutas:** `npm run build:all`
3. **Pruebas** en cada plataforma
4. **Desplegas** cuando estés listo

### **Comandos Principales:**
- `npm run build:all` - Build para todas las plataformas ⭐
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

---

## 🎉 ¡LISTO!

**Ahora todos los cambios se aplicarán simultáneamente a Web e iOS (y Android cuando esté listo).**

**Solo ejecuta:** `npm run build:all` después de hacer cambios.

---

**Última actualización:** 2025-11-12  
**Versión:** 2.0.0  
**Estado:** ✅ Scripts configurados y listos

