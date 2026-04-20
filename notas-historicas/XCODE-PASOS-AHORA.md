# 🎯 PASOS EXACTOS EN XCODE (AHORA)

## 📱 **1. SELECCIONAR DISPOSITIVO**

Arriba a la izquierda en Xcode, cambiar de:
- ❌ "App" o "iPhone 15 Pro"
- ✅ **"Any iOS Device (arm64)"**

---

## 🧹 **2. LIMPIAR BUILD**

**Menú:**
```
Product → Clean Build Folder (⇧⌘K)
```

Espera 3-5 segundos...

---

## 📦 **3. ARCHIVE**

**Menú:**
```
Product → Archive
```

**IMPORTANTE:** No cierres Xcode. Espera 2-5 minutos hasta que aparezca "Archive Succeeded"

---

## 📤 **4. UPLOAD**

Cuando termine, se abre automáticamente **"Organizer"**:

1. Verás tu app "FinanzasFacil" en la lista
2. Click en: **"Distribute App"**
3. Selecciona: **"App Store Connect"**
4. Click: **"Next"**
5. Selecciona: **"Upload"**
6. Click: **"Next"** varias veces
7. **Espera** a que suba (1-2 minutos)

---

## ✅ **5. TERMINAR**

Cuando veas "Upload Successful":
1. Cierra Organizer
2. Ya está! La app está subida

---

## ⚠️ **SI DA ERROR:**

### **Error: "Code Signing"**
- Ve a: Xcode → App (sidebar) → Signing & Capabilities
- Team: Selecciona "LIPA Studios" (tu cuenta)
- Automatically manage signing: ✅ CHECKED

### **Error: "Missing Info.plist"**
- Ya está solucionado. Ignora.

### **Error: Build Failed**
- Product → Clean Build Folder
- Volver a hacer Archive

---

**¿HASTA DONDE HAS LLEGADO?** Avísame y te guío el siguiente paso 🔥

