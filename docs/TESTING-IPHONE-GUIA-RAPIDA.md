# 📱 Guía Rápida - Testing en iPhone

## 🚀 **Pasos Inmediatos:**

### **1️⃣ Cuando Xcode termine de actualizar:**
```
1. Abre el proyecto: App.xcworkspace (NO App.xcodeproj)
2. Selecciona tu iPhone como destino
3. Configura Team y Bundle ID
4. Build & Run (⌘ + R)
```

### **2️⃣ Configuración Importante:**
- **Team**: Tu Apple Developer Account
- **Bundle ID**: `com.finanzasmuyfaciles.app`
- **Signing**: Automático
- **Objectives-C Bridging Header**: Debe existir

### **3️⃣ Si hay errores de CocoaPods:**
```bash
cd ios/App
pod install --repo-update
```

---

## ✅ **Qué Probar en iPhone:**

### **🎯 Funcionalidades Críticas:**
1. **Navegación** - Todas las secciones
2. **Control de Gastos** - Sin login obligatorio ✅
3. **Lead Magnet** - Con botón X ✅
4. **ATT Framework** - Permisos de tracking
5. **AdMob** - Anuncios banner/interstitial
6. **Firebase** - Auth y Firestore
7. **Social Links** - YouTube
8. **Share App** - Compartir aplicación

### **🔍 Verificaciones Específicas:**
- **Splash Screen** se muestra correctamente
- **App Icon** aparece en el home
- **Permisos ATT** se solicitan al inicio
- **Anuncios** se muestran sin errores
- **Navegación** fluida entre secciones
- **No crashes** al abrir la app

---

## 🛠️ **Soluciones Comunes:**

### **Error: "No matching provisioning profile"**
```
1. Ve a Apple Developer Portal
2. Crea App ID con Bundle ID correcto
3. Genera provisioning profile
4. Descarga e instala en Xcode
```

### **Error: "Code signing error"**
```
1. Selecciona Team correcto
2. Cambia Bundle ID si es necesario
3. Clean Build Folder (⌘ + Shift + K)
4. Build nuevamente
```

### **Error: "CocoaPods not found"**
```bash
sudo gem install cocoapods
cd ios/App
pod install
```

---

## 📊 **Checklist de Testing:**

- [ ] App se abre sin crashes
- [ ] Splash screen funciona
- [ ] Navegación entre secciones
- [ ] Control de gastos accesible sin login
- [ ] Lead Magnet se puede cerrar
- [ ] ATT Framework solicita permisos
- [ ] Anuncios AdMob funcionan
- [ ] Firebase Auth funciona
- [ ] Social Links (YouTube) funciona
- [ ] Share App funciona
- [ ] Performance fluida
- [ ] Sin errores en consola

---

## 🎯 **Próximo Paso:**
Una vez que funcione en iPhone, **tomar capturas** para App Store! 📸
