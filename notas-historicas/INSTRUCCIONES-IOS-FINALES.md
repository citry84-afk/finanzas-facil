# 📱 INSTRUCCIONES FINALES PARA SUBIR APP A APP STORE

## ✅ **ESTADO: 2 DE 4 ERRORES SOLUCIONADOS EN CÓDIGO**

---

## 🎯 **ANTES DE SUBIR A APP STORE CONNECT:**

### **1️⃣ CAMBIAR SUBTITLE (URGENTE - 2 minutos)**
1. Ve a: https://appstoreconnect.apple.com
2. Mi App → FinanzasFacil → iOS
3. App Information → Subtitle
4. Cambiar de:
   - ❌ "Calculadoras Financieras Gratuitas 2025"
5. A:
   - ✅ "Calculadoras Financieras"

---

## 🔨 **BUILD iOS APP EN XCODE:**

### **Opción A: Desde Terminal (RECOMENDADO)**
```bash
cd /Users/papi/FinancasFacil

# 1. Sincronizar Capacitor
npx cap sync ios

# 2. Abrir Xcode
open ios/App/App.xcworkspace
```

### **Opción B: Manual**
```bash
cd ios/App
pod install
open App.xcworkspace
```

---

## 📦 **ARCHIVE Y UPLOAD:**

### **En Xcode:**

1. **Seleccionar dispositivo:**
   - Arriba a la izquierda: "Any iOS Device (arm64)"

2. **Product → Archive:**
   - Esperar a que compile (2-5 minutos)
   - Se abrirá Organizer automáticamente

3. **Organizer:**
   - Validar App (Optional)
   - Upload to App Store Connect
   - Esperar finalización

---

## ⚠️ **ANTES DE SUBMIT REVIEW:**

### **2️⃣ CONFIGURAR SCREENSHOTS IPAD:**

Las capturas de iPad están distorsionadas. Regenerar:

```bash
# Generar screenshots correctos
node scripts/generate-screenshots.js

# Subir a App Store Connect:
# - iPhone 6.5": 1284x2778px
# - iPad 12.9": 2048x2732px (NO distorsionar)
```

---

### **3️⃣ SUBMIT PARA REVIEW:**

1. App Store Connect → Mi App → FinanzasFacil
2. Versión: 1.0
3. Haz clic en "Submit for Review"

---

## 📝 **RESPUESTA A APPLE (INCLUIR EN NOTAS):**

```
Estimado equipo de revisión:

Hemos corregido todos los problemas identificados:

1. Guideline 3.1.1 (In-App Purchase): 
   ✅ Eliminadas todas las opciones de donación de la app.

2. Guideline 2.1 (Sign in with Apple):
   ✅ Deshabilitados los botones de "Sign in with Apple" y "Sign in with Google" 
   temporalmente. La app funciona completamente sin autenticación.

3. Guideline 5.1.1(v) (Account Deletion):
   La app NO requiere creación de cuentas para su uso. Todas las funciones 
   principales (calculadoras de salario, hipoteca, autónomos, control de gastos) 
   funcionan completamente sin registro. Las cuentas son OPCIONALES y solo para 
   sincronizar datos entre dispositivos.

4. Guideline 2.3.7 (Metadata):
   ✅ Subtitle actualizado a "Calculadoras Financieras" (sin referencias a precios).

Por favor, probar la app SIN intentar usar los botones de autenticación social 
ya que están temporalmente deshabilitados.

Gracias por su comprensión.
```

---

## 📋 **CHECKLIST FINAL:**

### **Antes de Archive:**
- [x] Donaciones eliminadas
- [x] Social Login deshabilitado
- [x] Service Worker actualizado
- [ ] Subtitle cambiado en App Store Connect

### **Durante Archive:**
- [ ] Build exitoso sin errores
- [ ] Versión: 1.0
- [ ] Build number incrementado

### **Después de Upload:**
- [ ] Screenshots correctos (iPad 2048x2732)
- [ ] Respuesta a Apple incluida
- [ ] Submit for Review

---

## ⏱️ **TIEMPO TOTAL:** 30-45 minutos

---

**¿LISTO PARA EMPEZAR?** 🚀

