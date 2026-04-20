# 📱 INSTRUCCIONES PARA COMPILAR Y SUBIR A APP STORE

## ✅ **ARCHIVOS SINCRONIZADOS:**

Los cambios de eliminación de cuenta ya están en iOS:
- ✅ Build web completado
- ✅ Assets copiados a `ios/App/App/public`
- ✅ Xcode abierto con el workspace

---

## 🚨 **PROBLEMA CON COCOAPODS:**

CocoaPods tiene un problema con Ruby en tu sistema. Esto puede afectar la compilación.

**Solución rápida:**
1. En Xcode, intenta compilar primero
2. Si falla, ejecuta manualmente desde Terminal:
   ```bash
   cd /Users/papi/FinancasFacil/ios/App
   export LANG=en_US.UTF-8
   pod install
   ```

---

## 📋 **PASOS PARA COMPILAR Y SUBIR:**

### **1. En Xcode (ya abierto):**

1. **Seleccionar el dispositivo:**
   - En la barra superior, selecciona "Any iOS Device (arm64)" o un dispositivo físico

2. **Limpiar el build:**
   - Menú: `Product` → `Clean Build Folder` (Shift + Cmd + K)

3. **Archivar:**
   - Menú: `Product` → `Archive`
   - Espera a que termine (puede tardar varios minutos)

4. **Si aparece error de CocoaPods:**
   - Cierra Xcode
   - Abre Terminal y ejecuta:
     ```bash
     cd /Users/papi/FinancasFacil/ios/App
     export LANG=en_US.UTF-8
     pod install
     ```
   - Si sigue fallando, intenta:
     ```bash
     sudo gem install cocoapods
     pod install
     ```

5. **Después de archivar exitosamente:**
   - Se abrirá automáticamente el "Organizer"
   - Selecciona el archive más reciente
   - Click en "Distribute App"

6. **Distribuir:**
   - Selecciona "App Store Connect"
   - Click "Next"
   - Selecciona "Upload" (no Export)
   - Click "Next"
   - Revisa las opciones y click "Upload"
   - Espera a que termine

---

## ✅ **VERIFICACIONES ANTES DE SUBIR:**

- [x] Build web completado
- [x] Assets sincronizados a iOS
- [x] Función de eliminación de cuenta implementada
- [ ] Compilación exitosa en Xcode
- [ ] Archive creado
- [ ] Upload a App Store Connect completado

---

## 📝 **DESPUÉS DE SUBIR:**

1. **Ir a App Store Connect:**
   - https://appstoreconnect.apple.com/
   - Apps → FinanzasFácil → Versión

2. **Responder a Apple:**
   - En la sección de "App Review Information"
   - Click en "Reply to Review"
   - Usa este texto:

```
La función de eliminación de cuenta está disponible en:

1. El usuario debe estar autenticado en la app
2. En la pantalla principal del "Control de Gastos"
3. Hacer clic en el icono de usuario (arriba a la derecha, con icono de Settings)
4. Seleccionar "Eliminar Cuenta" del menú desplegable
5. Seguir el proceso de confirmación en dos pasos:
   - Paso 1: Ver advertencia sobre eliminación permanente
   - Paso 2: Escribir "ELIMINAR" para confirmar

La eliminación es permanente y elimina:
- El usuario de Firebase Authentication
- Todos los datos del usuario de Firestore
- El proceso es completamente automatizado dentro de la app

Cumplimos con Guideline 5.1.1(v):
✅ Eliminación permanente (no desactivación)
✅ Accesible desde la app (sin sitio web externo)
✅ Confirmación de seguridad para prevenir eliminación accidental
✅ Proceso automatizado (sin requerir servicio al cliente)
```

3. **Resubmitir para revisión:**
   - Click en "Submit for Review"
   - Espera confirmación

---

## 🎯 **VERSIÓN:**

- **Build Number**: Incrementar si es necesario
- **Version**: 1.0
- **Cambios**: Eliminación de cuenta implementada (Guideline 5.1.1(v))

---

## ⚠️ **SI HAY PROBLEMAS:**

**Error de CocoaPods:**
- Puede necesitar reinstalar Ruby o usar Homebrew Ruby
- O compilar sin CocoaPods (si las dependencias ya están instaladas)

**Error de firma:**
- Verificar que el certificado de distribución esté activo
- En Xcode: Preferences → Accounts → Download Manual Profiles

**Error de provisioning:**
- Verificar que el bundle ID coincida con App Store Connect
- Verificar que el provisioning profile esté correcto

---

**✅ TODO LISTO PARA COMPILAR**



