# 🍎 Configurar Sign in with Apple en Xcode

## ⚠️ **OBLIGATORIO PARA APP STORE**

Ya implementamos **Sign in with Apple** en el código. Ahora necesitas configurarlo en **Xcode**.

---

## 📋 **Pasos en Xcode:**

### **1️⃣ Abrir el proyecto:**
- Asegúrate de que **Xcode** esté abierto con el proyecto `App.xcworkspace`

### **2️⃣ Seleccionar el proyecto:**
- Haz clic en **"App"** en el navegador izquierdo (icono azul con "A")

### **3️⃣ Ir a Signing & Capabilities:**
- Haz clic en la pestaña **"Signing & Capabilities"** (arriba)

### **4️⃣ Agregar Sign in with Apple:**
- Haz clic en **"+ Capability"** (botón arriba a la izquierda)
- Busca **"Sign in with Apple"**
- Haz doble clic para agregarlo

### **5️⃣ Verificar:**
- Deberías ver una nueva sección **"Sign in with Apple"** en la lista de capabilities
- **No necesitas configurar nada más**, solo agregarlo

---

## 🔥 **Estado actual:**

### **✅ Ya completado:**
- ✅ Código implementado en `Login.tsx`
- ✅ Botón de Apple agregado (diseño oficial)
- ✅ AuthService configurado
- ✅ AuthContext actualizado
- ✅ Firebase configurado en `AppDelegate.swift`

### **⏳ Pendiente:**
- 🔧 Agregar capability en Xcode (5 minutos)
- 🔥 Habilitar Apple Sign In en Firebase Console (5 minutos)

---

## 🎯 **Después de agregar la capability:**

Necesitarás configurar **Firebase Console** para Apple Sign In:

1. Ve a **Firebase Console** → Tu proyecto
2. **Authentication** → **Sign-in method**
3. Haz clic en **"Apple"**
4. **Habilitar** el proveedor
5. Configurar Service ID (te daré las instrucciones)

---

## ⚡ **¡Hazlo ahora!**

**Abre Xcode** y agrega la capability **"Sign in with Apple"**. 

Solo toma 1 minuto y es **CRÍTICO** para la aprobación de Apple.

