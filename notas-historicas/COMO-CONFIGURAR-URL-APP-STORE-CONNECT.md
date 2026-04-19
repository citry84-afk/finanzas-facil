# 📱 CONFIGURAR URL EN APP STORE CONNECT

## 🎯 OBJETIVO

Configurar la URL del sitio web del desarrollador en App Store Connect para que AdMob pueda verificar el archivo `app-ads.txt`.

---

## 📋 PASOS DETALLADOS

### PASO 1: Acceder a App Store Connect

1. **Ve a:** https://appstoreconnect.apple.com
2. **Inicia sesión** con tu cuenta de Apple Developer
3. **Haz clic en:** "Mis Apps" o "My Apps"

### PASO 2: Seleccionar tu App

1. **Busca y selecciona:** "FinanzasFacil"
2. **O busca por Bundle ID:** `com.lipastudios.finanzasfacil`

### PASO 3: Ir a Información de la App

1. **En el menú lateral izquierdo**, busca:
   - **"Información de la app"** (App Information)
   - O **"Información"** → **"Información general"**

2. **Haz clic en:** "Información de la app"

### PASO 4: Buscar el Campo de URL

1. **Busca en la página:**
   - **"URL del sitio web del desarrollador"** (Developer Website URL)
   - O **"URL de soporte"** (Support URL)
   - O **"URL del desarrollador"** (Developer URL)

2. **Estos campos suelen estar en:**
   - Sección "Información general"
   - O sección "Información de contacto"
   - O sección "Información de soporte"

### PASO 5: Añadir la URL

1. **En el campo "URL del sitio web del desarrollador":**
   - Añade: `https://finanzasmuyfacil.com`
   - **NO uses:** `http://finanzasmuyfacil.com` (debe ser HTTPS)
   - **NO uses:** `www.finanzasmuyfacil.com` (sin www)

2. **Si hay un campo "URL de soporte":**
   - También puedes añadir: `https://finanzasmuyfacil.com`

### PASO 6: Guardar los Cambios

1. **Haz clic en:** "Guardar" o "Save" (arriba a la derecha)
2. **Espera** a que se guarde (debería aparecer un mensaje de confirmación)

---

## 🔍 SI NO ENCUENTRAS EL CAMPO

### Alternativa 1: Buscar en "Información de soporte"

1. **Ve a:** Información → Información de soporte
2. **Busca:** "URL de soporte" o "Support URL"
3. **Añade:** `https://finanzasmuyfacil.com`

### Alternativa 2: Buscar en "Información de contacto"

1. **Ve a:** Información → Información de contacto
2. **Busca:** "URL del desarrollador" o "Developer URL"
3. **Añade:** `https://finanzasmuyfacil.com`

### Alternativa 3: Verificar en "Versiones"

1. **Ve a:** Una versión específica de la app
2. **Busca:** "Información de la app" dentro de esa versión
3. **Busca:** El campo de URL del sitio web

---

## ⏰ DESPUÉS DE CONFIGURAR

### Paso 1: Esperar 24-48 horas

AdMob puede tardar en sincronizar los datos desde App Store Connect.

### Paso 2: Verificar en AdMob

1. **Ve a:** https://admob.google.com/
2. **Ve a:** Aplicaciones → FinanzasFacil iOS → Configuración
3. **Haz clic en:** "Buscar actualizaciones" o "Verify app"
4. **Espera:** 5-10 minutos
5. **Si no funciona:** Espera 24 horas más y vuelve a intentar

---

## ✅ VERIFICACIÓN

### Verificar que la URL esté configurada:

1. **Ve a App Store Connect**
2. **Verifica** que el campo "URL del sitio web del desarrollador" contenga: `https://finanzasmuyfacil.com`

### Verificar que el archivo esté accesible:

```bash
curl https://finanzasmuyfacil.com/app-ads.txt
```

**Debe mostrar:**
```
google.com, pub-4837743291717475, DIRECT, f08c47fec0942fa0
```

---

## 🎯 RESUMEN

1. ✅ **Ve a App Store Connect:** https://appstoreconnect.apple.com
2. ✅ **Selecciona tu app:** FinanzasFacil
3. ✅ **Ve a:** Información de la app
4. ✅ **Busca:** "URL del sitio web del desarrollador"
5. ✅ **Añade:** `https://finanzasmuyfacil.com`
6. ✅ **Guarda** los cambios
7. ✅ **Espera 24-48 horas**
8. ✅ **Vuelve a AdMob** y haz clic en "Buscar actualizaciones"

---

**¿Necesitas ayuda para encontrar el campo?** Comparte una captura de pantalla de la página "Información de la app" en App Store Connect.

