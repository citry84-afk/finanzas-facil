# 📋 PASOS: Configurar URL del Sitio Web en AdMob

## ⚠️ IMPORTANTE: NO BORRES LOS DETALLES DE LA TIENDA

**NO borres los detalles de la tienda de aplicaciones.** Solo necesitas EDITAR para añadir la URL del sitio web.

---

## 🎯 PASOS CORRECTOS

### PASO 1: Editar los Detalles de la Tienda

1. **Ve a:** AdMob → Aplicaciones → FinanzasFacil iOS → Configuración
2. **Busca:** "Detalles de la tienda de aplicaciones" (App store details)
3. **Haz clic en el icono de lápiz (Editar)** junto a "Detalles de la tienda de aplicaciones"
   - NO hagas clic en "Borrar detalles de la tienda"
   - Haz clic en el icono de EDITAR (lápiz)

### PASO 2: Añadir la URL del Sitio Web

Cuando edites los detalles, deberías ver campos como:
- **Tipo de tienda:** App Store (iOS) - Ya configurado
- **Bundle ID:** com.lipastudios.finanzasfacil - Ya configurado
- **Nombre:** FinanzasFacil - Ya configurado
- **URL del sitio web:** ⚠️ **ESTE CAMPO DEBE AÑADIRSE/COMPLETARSE**
- **Dominio del desarrollador:** ⚠️ **ESTE CAMPO DEBE AÑADIRSE/COMPLETARSE**

**Añade:**
- **URL del sitio web:** `https://finanzasmuyfacil.com`
- **Dominio del desarrollador:** `finanzasmuyfacil.com`

### PASO 3: Guardar los Cambios

1. **Guarda** los cambios
2. **Espera 5-10 minutos** para que AdMob procese los cambios
3. **Haz clic en:** "Buscar actualizaciones" o "Verify app"

---

## 🔍 SI NO VES EL CAMPO "URL del Sitio Web"

Si al editar los detalles de la tienda NO ves un campo para "URL del sitio web", puede ser que:

1. **AdMob obtenga la URL automáticamente desde App Store Connect:**
   - Verifica en App Store Connect que la URL del sitio web esté configurada
   - Ve a: https://appstoreconnect.apple.com
   - Ve a: Tu app → Información de la app → Información general
   - Verifica que el campo "URL del sitio web del desarrollador" esté configurado con: `https://finanzasmuyfacil.com`

2. **O necesites configurarla en otro lugar:**
   - A veces AdMob tiene una sección separada para "Información del desarrollador"
   - Busca en AdMob: Configuración de cuenta → Información del desarrollador
   - O: Configuración → Detalles de la cuenta → URL del sitio web

---

## ✅ VERIFICACIÓN FINAL

Después de configurar la URL:

1. **Verifica que el archivo app-ads.txt esté accesible:**
   ```
   https://finanzasmuyfacil.com/app-ads.txt
   ```

2. **Verifica el contenido:**
   ```
   google.com, pub-4837743291717475, DIRECT, f08c47fec0942fa0
   ```

3. **En AdMob:**
   - Haz clic en "Buscar actualizaciones" o "Verify app"
   - Espera 5-10 minutos
   - Si no funciona, espera 24 horas y vuelve a intentar

---

## 🎯 RESUMEN

1. ✅ **NO borres** los detalles de la tienda
2. ✅ **Edita** los detalles de la tienda (icono de lápiz)
3. ✅ **Añade** la URL del sitio web: `https://finanzasmuyfacil.com`
4. ✅ **Guarda** los cambios
5. ✅ **Espera** 5-10 minutos
6. ✅ **Haz clic en** "Buscar actualizaciones"

---

**Si no ves el campo para la URL del sitio web al editar, verifica en App Store Connect que la URL esté configurada allí.**

