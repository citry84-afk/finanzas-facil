# 📱 INSTALAR APP DESDE XCODE

## 🎯 **PASOS EN XCODE:**

### **1. Verificar que el proyecto esté abierto:**
- ✅ Xcode debería estar abierto ahora
- ✅ Proyecto: `App.xcworkspace`
- ✅ Esquema: `App`

### **2. Seleccionar tu iPhone:**
- En la barra superior de Xcode, busca el desplegable que dice algo como "Any iOS Device"
- Haz clic en él
- Selecciona **"iPhone de Luis A."** (tu iPhone conectado)

### **3. Compilar e instalar:**
- Presiona **⌘ + R** (Command + R)
- O haz clic en el botón ▶️ "Run" en la barra superior
- Espera a que compile (puede tardar 1-2 minutos)
- La app se instalará automáticamente en tu iPhone

### **4. En tu iPhone:**
- Cuando aparezca un mensaje, toca **"Confiar en este ordenador"**
- La app se abrirá automáticamente después de instalarse

---

## ✅ **DESPUÉS DE INSTALAR:**

La app debería mostrar:
- ❌ **NO** el banner del curso de 29€
- ✅ Solo "20 Gastos Deducibles" (19€)
- ✅ Calculadoras funcionando
- ✅ Botones de Google/Apple Sign In

---

## 🔧 **SI HAY ERRORES:**

### **Error de firma:**
- Ve a: Target "App" → Signing & Capabilities
- Cambia el "Team" a tu cuenta de Apple
- Xcode generará el certificado automáticamente

### **No aparece tu iPhone:**
- Desconecta y vuelve a conectar el cable
- En el iPhone: **Configuración → General → Gestión de VPN y dispositivos**
- Toca tu perfil y verifica que confíe en este ordenador

---

**¡AHORA PRESIONA ⌘ + R EN XCODE!** 🚀📱
