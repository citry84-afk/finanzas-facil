# 🚨 INSTRUCCIONES URGENTES: Descargar GoogleService-Info.plist CORRECTO

## ❌ **PROBLEMA ACTUAL:**
El archivo `GoogleService-Info.plist` que tenemos **NO tiene los IDs correctos** para Google Sign In. Por eso Firebase no lo encuentra.

## ✅ **SOLUCIÓN (3 MINUTOS):**

### **1. Ir a Firebase Console:**
```
https://console.firebase.google.com/
```

### **2. Seleccionar tu proyecto:**
- Busca el proyecto: **finanzas-facil-fe8eb**
- Haz clic en él

### **3. Ir a configuración del proyecto:**
1. Haz clic en el **ícono de engranaje ⚙️** (arriba izquierda)
2. Selecciona **"Configuración del proyecto"**

### **4. Seleccionar la app de iOS:**
1. En la sección **"Tus apps"**
2. Busca la app de iOS (debería decir `com.lipastudios.finanzasfacil`)
3. Haz clic en ella

### **5. Descargar el archivo:**
1. Baja hasta encontrar el botón **"Descargar GoogleService-Info.plist"**
2. Haz clic y descarga el archivo
3. El archivo se descargará a tu carpeta de Descargas

### **6. Reemplazar el archivo:**
```bash
# Copia el archivo descargado:
cp ~/Downloads/GoogleService-Info.plist /Users/papi/FinancasFacil/ios/App/App/GoogleService-Info.plist
```

O simplemente:
1. Abre Finder
2. Ve a `/Users/papi/FinancasFacil/ios/App/App/`
3. Borra el `GoogleService-Info.plist` que está ahí
4. Arrastra el nuevo desde Descargas

---

## 🔍 **VERIFICAR QUE EL NUEVO ARCHIVO ES CORRECTO:**

El archivo debe tener estas claves:
```xml
<key>CLIENT_ID</key>
<string>840948445547-XXXXXXXX.apps.googleusercontent.com</string>
<key>REVERSED_CLIENT_ID</key>
<string>com.googleusercontent.apps.840948445547-XXXXXXXX</string>
```

**Nota:** Los `XXXXXXXX` serán números/letras reales, NO placeholders como `abc123def456`.

---

## 🚀 **DESPUÉS DE REEMPLAZAR EL ARCHIVO:**

```bash
# 1. Recompilar
npm run build && npx cap copy ios

# 2. Limpiar y reinstalar
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug -destination 'platform=iOS,id=00008140-000A48813082201C' clean build

# 3. La app ya debería funcionar
```

---

## ⏰ **TIEMPO TOTAL:** 3-5 minutos

**¿Listo para hacerlo?** 🚀
