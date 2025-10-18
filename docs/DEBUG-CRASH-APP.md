# 🐛 DEBUG - APP CRASHEA AL ABRIR

## 🔍 PROBLEMA ACTUAL

**Síntoma:** La app se abre y se cierra inmediatamente (crash)

**Causas probables:**
1. **Firebase no configurado correctamente** (más probable)
2. **AdMob inicializándose sin permisos**
3. **ATT Framework en Android** (no debería estar)
4. **Error en el código de inicialización**

---

## 🚀 SOLUCIÓN RÁPIDA - VERSIÓN SIN FIREBASE/ADMOB

Vamos a crear una versión básica que funcione:

### **PASO 1: Desactivar Firebase y AdMob temporalmente**

Comentar la inicialización en `App.tsx`:

```typescript
useEffect(() => {
  // TEMPORALMENTE DESACTIVADO PARA DEBUG
  // const initializeATT = async () => {
  //   try {
  //     console.log('Initializing ATT...');
  //     const result = await requestTrackingPermission();
  //     console.log('ATT result:', result);
  //     await initializeTrackingServices(result.canTrack);
  //   } catch (error) {
  //     console.error('Error initializing ATT:', error);
  //     await initializeTrackingServices(false);
  //   }
  // };
  // initializeATT();

  // Track initial page load
  trackPageView('/', 'Finanzas Fáciles - Landing');
}, []);
```

### **PASO 2: Rebuild sin Firebase**

```bash
npm run build
npx cap sync
cd android && ./gradlew clean assembleDebug installDebug
```

---

## 📊 LOGS PARA REVISAR

Cuando abras la app, ejecuta:

```bash
# Ver errores en tiempo real
adb logcat | grep -i "finanzas"

# Ver crashes
adb logcat | grep -i "fatal"

# Ver todo
adb logcat > app_logs.txt
```

---

## 🔧 POSIBLES FIXES

### **FIX 1: Firebase sin configurar**
**Problema:** Firebase no tiene las credenciales correctas
**Solución:** Usar credenciales placeholder que no crasheen

### **FIX 2: AdMob sin inicializar**
**Problema:** AdMob se inicializa antes de tiempo
**Solución:** Inicializar AdMob de forma lazy (solo cuando se necesite)

### **FIX 3: ATT en Android**
**Problema:** El plugin ATT está intentando ejecutarse en Android
**Solución:** Solo ejecutar en iOS

---

## ✅ SOLUCIÓN DEFINITIVA

Voy a hacer una versión que:
1. ✅ Funciona sin Firebase (solo web)
2. ✅ Sin AdMob hasta que esté configurado
3. ✅ Sin ATT en Android
4. ✅ Solo calculadoras básicas funcionando

**Esto nos permitirá:**
- Ver la app funcionando
- Hacer testing básico
- Hacer capturas de pantalla
- Luego agregar Firebase/AdMob cuando funcione

---

*Debug en progreso...*


