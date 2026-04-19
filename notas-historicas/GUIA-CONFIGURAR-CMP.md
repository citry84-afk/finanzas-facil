# 🚀 Guía: Configurar CMP (Consent Management Platform) en AdMob

## ✅ LO QUE YA TIENES LISTO

1. ✅ **Política de Privacidad completa** - Disponible en tu app
2. ✅ **URL del sitio web:** `https://finanzasmuyfacil.com`
3. ✅ **App verificada en AdMob**

---

## 📋 PASOS PARA CONFIGURAR CMP

### **Paso 1: Añadir URL de Política de Privacidad**

**URL que debes usar:**
```
https://finanzasmuyfacil.com/privacy
```

**O si prefieres:**
```
https://finanzasmuyfacil.com/privacidad
```

**Nota:** Si ninguna de estas URLs funciona directamente, puedes:
- Usar la URL principal: `https://finanzasmuyfacil.com` (y mencionar que la política está en `/privacy`)
- O crear una página HTML estática en `/public/privacy.html`

---

### **Paso 2: Elegir opciones de consentimiento**

En el asistente de AdMob, podrás elegir:

1. **Tipo de mensaje:**
   - Mensaje de consentimiento estándar (recomendado)
   - Mensaje personalizado

2. **Opciones de consentimiento:**
   - ✅ Anuncios personalizados
   - ✅ Anuncios no personalizados
   - ✅ Medición de audiencia
   - ✅ Desarrollo de productos

**Recomendación:** Deja todas las opciones activadas para maximizar los ingresos.

---

### **Paso 3: Revisar configuración de cuenta**

AdMob revisará automáticamente:
- ✅ Tu cuenta está configurada para reglamentos europeos
- ✅ Tienes una política de privacidad
- ✅ Tu app está verificada

---

### **Paso 4: Publicar mensaje**

Una vez configurado, haz clic en **"Publicar"** para activar el mensaje.

---

### **Paso 5: Implementar SDK de UMP** ⚠️ IMPORTANTE

**Esto es lo que necesitarás hacer en tu código:**

1. **Instalar el SDK de UMP (User Messaging Platform):**
   ```bash
   npm install @capacitor-community/admob
   ```

2. **O si ya lo tienes, verificar que esté actualizado**

3. **Integrar el mensaje de consentimiento en tu app**

**Nota:** Te ayudaré a implementar esto después de que publiques el mensaje en AdMob.

---

## 🎯 INFORMACIÓN QUE NECESITARÁS

### **URL de Política de Privacidad:**
```
https://finanzasmuyfacil.com/privacy
```

### **Información de la App:**
- **App ID:** `ca-app-pub-4837743291717475~3521575123`
- **Bundle ID:** `com.lipastudios.finanzasfacil`
- **Plataforma:** iOS

---

## ⚠️ IMPORTANTE

1. **La política de privacidad debe ser accesible públicamente**
   - Verifica que `https://finanzasmuyfacil.com/privacy` funcione
   - Si no funciona, usa `https://finanzasmuyfacil.com` y menciona que la política está en `/privacy`

2. **Después de publicar el mensaje, necesitarás:**
   - Implementar el SDK de UMP en tu app
   - Mostrar el mensaje de consentimiento a los usuarios
   - Manejar las respuestas de consentimiento

3. **El mensaje aparecerá automáticamente:**
   - A usuarios en EEE, Reino Unido y Suiza
   - La primera vez que abran la app
   - Si cambian su consentimiento

---

## 🚀 SIGUIENTE PASO

1. **Haz clic en "Empezar" en AdMob**
2. **Añade la URL de política de privacidad:** `https://finanzasmuyfacil.com/privacy`
3. **Elige las opciones de consentimiento** (recomendado: todas activadas)
4. **Revisa la configuración**
5. **Publica el mensaje**
6. **Después, te ayudo a implementar el SDK de UMP en tu app**

---

## 📝 NOTAS

- **Tiempo estimado:** 5-10 minutos para configurar el mensaje
- **Implementación del SDK:** 15-30 minutos (te ayudo después)
- **Pruebas:** 10-15 minutos para verificar que funciona

---

**¡Adelante! Haz clic en "Empezar" y sigue los pasos. Te ayudo con la implementación del SDK después.**

