# 📱 Seleccionar Apps para CMP en AdMob

## 🎯 PASOS A SEGUIR

### **1. SELECCIONAR LA APP** ✅

**Qué hacer:**
- ✅ **Marca el checkbox** de **"FinanzasFacil | iOS"** (la app que acabas de verificar)
- ❌ **NO marques** las otras apps (LIPA Studios, FinanzasFacil Android) por ahora

**Por qué:**
- Solo necesitas configurar la app iOS que acabas de verificar
- Puedes añadir las otras apps después si las necesitas

---

### **2. AÑADIR URL DE POLÍTICA DE PRIVACIDAD** ✅

**Qué hacer:**
1. Haz clic en **"Añadir URL"** debajo de "FinanzasFacil | iOS"
2. Introduce esta URL:
   ```
   https://finanzasmuyfacil.com/privacy
   ```
3. Haz clic en "Guardar" o "Aceptar"

**Por qué:**
- AdMob necesita una URL pública donde los usuarios puedan leer tu política de privacidad
- Esta URL es obligatoria para cumplir con GDPR
- Los usuarios podrán hacer clic en "Learn more" en el mensaje de consentimiento

**Nota:** Si esta URL no funciona directamente, puedes usar:
- `https://finanzasmuyfacil.com` (URL principal)
- O crear una página HTML estática en `/public/privacy.html`

---

### **3. IMPLEMENTACIÓN EN BLOQUES DE ANUNCIOS** ⚠️

**Qué hacer:**
- ❌ **DEJA EL TOGGLE DESACTIVADO** (OFF/gris) por ahora

**Por qué:**
- Este toggle es para una funcionalidad avanzada de AdMob
- Si lo activas, AdMob intentará implementar automáticamente el mensaje en tus bloques de anuncios
- **NO es necesario** si vas a implementar el SDK de UMP manualmente (que es lo que haremos)
- Puedes activarlo después si quieres, pero no es necesario ahora

**Recomendación:**
- Deja el toggle **DESACTIVADO** (OFF)
- Implementaremos el mensaje manualmente usando el SDK de UMP
- Esto te da más control sobre cuándo y cómo se muestra el mensaje

---

## 📋 RESUMEN DE ACCIONES

### **Para "FinanzasFacil | iOS":**

1. ✅ **Checkbox:** Marcar (seleccionar)
2. ✅ **URL de política de privacidad:** 
   - Haz clic en "Añadir URL"
   - Introduce: `https://finanzasmuyfacil.com/privacy`
   - Guardar
3. ❌ **Implementación en bloques de anuncios:** 
   - Dejar DESACTIVADO (OFF/gris)

### **Para las otras apps:**
- ❌ **NO marcar** los checkboxes (LIPA Studios, FinanzasFacil Android)
- Puedes configurarlas después si las necesitas

---

## 🚀 SIGUIENTE PASO

1. ✅ **Marca el checkbox** de "FinanzasFacil | iOS"
2. ✅ **Haz clic en "Añadir URL"** y añade `https://finanzasmuyfacil.com/privacy`
3. ❌ **Deja el toggle "Implementación en bloques de anuncios" DESACTIVADO**
4. ✅ **Haz clic en "Confirmación"** (botón azul)
5. ✅ **Continúa con los siguientes pasos** del asistente

---

## ⚠️ NOTAS IMPORTANTES

1. **URL de política de privacidad:**
   - Debe ser una URL pública accesible
   - Debe ser HTTPS (no HTTP)
   - Debe contener tu política de privacidad completa
   - Los usuarios podrán acceder a ella desde el mensaje de consentimiento

2. **Implementación en bloques de anuncios:**
   - No es necesario activarlo ahora
   - Lo implementaremos manualmente usando el SDK de UMP
   - Te dará más control sobre el mensaje

3. **Otras apps:**
   - No es necesario configurarlas ahora
   - Puedes añadirlas después si las necesitas
   - Enfócate en "FinanzasFacil | iOS" por ahora

---

**¡Perfecto! Sigue estos pasos y continúa con la configuración del mensaje.**

