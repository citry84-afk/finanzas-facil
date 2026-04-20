# 🎯 GUÍA VISUAL - 2 MINUTOS EN XCODE

## ✅ **PASO 1: SELECCIONAR TARGET "App"**
1. En la barra lateral izquierda, haz clic en el **icono azul de "App"** (arriba del todo)
2. Asegúrate de que en el panel central esté seleccionado el target **"App"** (no "Pods" ni otros)

```
┌────────────────────────────────────────────┐
│ 📱 App (icono azul) ← CLIC AQUÍ           │
│   └── App                                  │
│       └── Frameworks                       │
│       └── Products                         │
└────────────────────────────────────────────┘
```

---

## ✅ **PASO 2: IR A "SIGNING & CAPABILITIES"**
1. En la parte superior del panel central, verás varias pestañas
2. Haz clic en **"Signing & Capabilities"** (la 3ª pestaña)

```
┌────────────────────────────────────────────┐
│ General │ Resource Tags │ Signing & Capabilities │ Build Settings │
│                            ↑↑↑↑↑↑↑↑↑↑
│                         CLIC AQUÍ
└────────────────────────────────────────────┘
```

---

## ✅ **PASO 3: AGREGAR "Sign in with Apple"**
1. En la esquina superior izquierda de la pestaña "Signing & Capabilities", verás un botón **"+ Capability"**
2. Haz clic en **"+ Capability"**
3. En la ventana que aparece, busca **"Sign in with Apple"**
4. Haz **doble clic** en "Sign in with Apple"

```
┌────────────────────────────────────────────┐
│ + Capability  ← CLIC AQUÍ                  │
│                                            │
│ Buscar: Sign in with Apple                 │
│ ┌────────────────────────────────────┐    │
│ │ 🍎 Sign in with Apple              │    │
│ │    ← DOBLE CLIC AQUÍ              │    │
│ └────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

---

## ✅ **PASO 4: COMPILAR Y PROBAR**
1. Presiona **⌘ + R** (o haz clic en el botón ▶️ de Play)
2. Espera a que compile (30-60 segundos)
3. La app se instalará automáticamente en tu iPhone

```
┌────────────────────────────────────────────┐
│ ▶️ App │ iPhone de Luis                    │
│    ↑                                       │
│    CLIC AQUÍ o presiona ⌘ + R             │
└────────────────────────────────────────────┘
```

---

## ✅ **PASO 5: PROBAR EN EL IPHONE**
1. Abre la app en tu iPhone
2. Ve a **"Registrarse"** o **"Iniciar Sesión"**
3. Haz clic en **"Continuar con Apple"** o **"Continuar con Google"**
4. ¡Debería funcionar! 🎉

---

## 🔍 **VER LOGS (OPCIONAL)**
Si quieres ver los logs de depuración:
1. Abre **Safari** en tu Mac
2. Ve a **Develop** → **[Tu iPhone]** → **[FinanzasFácil]**
3. Se abrirá el inspector web
4. Ve a la pestaña **"Console"**
5. Verás logs como: `Iniciando sesión con Apple...`

---

## ❌ **SI HAY ERROR:**
Copia y pega el mensaje de error completo de la consola y te ayudaré.

---

**¡YA ESTÁ TODO LISTO! SOLO FALTAN ESTOS PASOS** 🚀
