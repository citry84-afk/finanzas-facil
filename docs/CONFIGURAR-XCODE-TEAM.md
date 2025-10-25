# 🔧 Configurar Apple Developer Team en Xcode

## ✅ GoogleService-Info.plist ya está agregado al proyecto

El archivo **GoogleService-Info.plist** ya fue agregado exitosamente al proyecto de Xcode. 

## 📱 Siguiente paso: Configurar el Team

### **Necesitas hacer esto en Xcode:**

1. **Abre Xcode** (si no está abierto)
   - El proyecto debería estar abierto en: `ios/App/App.xcworkspace`

2. **Selecciona el proyecto "App"** en el navegador izquierdo (panel izquierdo)
   - Es el icono azul con "A" en la parte superior del navegador

3. **Ve a la pestaña "Signing & Capabilities"**
   - Está en la parte superior, junto a "General", "Build Settings", etc.

4. **En "Team":**
   - Haz clic en el menú desplegable
   - **Selecciona tu Apple Developer Account**
   - Si no aparece, haz clic en "Add Account..." y agrega tu Apple ID

5. **Verifica que:**
   - ✅ "Automatically manage signing" esté marcado
   - ✅ "Team" tenga tu cuenta seleccionada
   - ✅ "Bundle Identifier" sea: `com.lipastudios.finanzasfacil`

6. **Conecta tu iPhone:**
   - Conecta el iPhone por USB
   - Confía en el dispositivo cuando pregunte
   - Selecciona tu iPhone en el menú superior de Xcode (donde dice "Any iOS Device")

7. **Lanza la app:**
   - Presiona el botón ▶️ (Play) en la esquina superior izquierda
   - O presiona **⌘ + R**

---

## 🎉 ¡Eso es todo!

Una vez configurado el team, la app debería compilar y ejecutarse en tu iPhone sin problemas.

### **Si aparece un error de permisos en el iPhone:**
1. Ve a **Ajustes** → **General** → **VPN y gestión de dispositivos**
2. Toca tu **Apple ID**
3. Toca **"Confiar en..."**
4. Vuelve a ejecutar la app desde Xcode

---

## 📞 Estado actual:
- ✅ **GoogleService-Info.plist** agregado al proyecto
- ✅ **Hub de Contenido** desplegado en web
- ✅ **Proyecto configurado** y listo
- ⏳ **Esperando configuración del Team** (solo 1 minuto)

**¡Ya estás a un paso de ver tu app funcionando en el iPhone!** 🚀

