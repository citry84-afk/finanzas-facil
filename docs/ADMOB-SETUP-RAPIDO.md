# 🚀 ADMOB SETUP RÁPIDO - FINANZASFÁCIL

## ⏰ TIEMPO ESTIMADO: 30-45 MINUTOS

---

## 🎯 PASO 1: CREAR CUENTA ADMOB (5 min)

1. **Ve a**: https://admob.google.com/
2. **Inicia sesión** con tu cuenta Google
3. **Haz clic en "Comenzar"**
4. **Configuración**:
   - País: España
   - Moneda: EUR
   - Método de pago: Configurar después

---

## 📱 PASO 2: AGREGAR APPS (10 min)

### **App Android**
1. **"+ Agregar app"** → **"Android"**
2. **Nombre**: `FinanzasFácil Android`
3. **Paquete**: `com.lipastudios.finanzasfacil`
4. **"Agregar"**

### **App iOS**
1. **"+ Agregar app"** → **"iOS"**
2. **Nombre**: `FinanzasFácil iOS`
3. **ID**: `com.lipastudios.finanzasfacil`
4. **"Agregar"**

---

## 🎯 PASO 3: CREAR AD UNITS (15 min)

**Para cada app (Android e iOS), crear:**

### **Banner Ad**
- **Nombre**: `Banner Principal`
- **Tipo**: Banner
- **Tamaño**: Adaptativo

### **Interstitial Ad**
- **Nombre**: `Interstitial Entre Secciones`
- **Tipo**: Interstitial

### **Rewarded Ad**
- **Nombre**: `Rewarded Premium`
- **Tipo**: Rewarded

---

## 📋 PASO 4: COPIAR IDs (5 min)

**Copia estos 5 IDs:**

```
App ID Android:     ca-app-pub-XXXXXXXXXX~XXXXXXXXXX
App ID iOS:         ca-app-pub-XXXXXXXXXX~XXXXXXXXXX
Banner Ad Unit ID:  ca-app-pub-XXXXXXXXXX/XXXXXXXXXX
Interstitial ID:    ca-app-pub-XXXXXXXXXX/XXXXXXXXXX
Rewarded ID:        ca-app-pub-XXXXXXXXXX/XXXXXXXXXX
```

---

## 🔧 PASO 5: ACTUALIZAR CÓDIGO (5 min)

**Ejecuta este comando con tus IDs:**

```bash
node scripts/actualizar_admob_ids.js \
  "ca-app-pub-TU_APP_ID_ANDROID" \
  "ca-app-pub-TU_APP_ID_IOS" \
  "ca-app-pub-TU_BANNER_ID" \
  "ca-app-pub-TU_INTERSTITIAL_ID" \
  "ca-app-pub-TU_REWARDED_ID"
```

**Ejemplo:**
```bash
node scripts/actualizar_admob_ids.js \
  "ca-app-pub-123456789~987654321" \
  "ca-app-pub-123456789~123456789" \
  "ca-app-pub-123456789/111111111" \
  "ca-app-pub-123456789/222222222" \
  "ca-app-pub-123456789/333333333"
```

---

## 🎉 ¡LISTO!

**Una vez actualizados los IDs:**

1. **Build de prueba**:
   ```bash
   npm run build
   npx cap sync
   npx cap run android
   npx cap run ios
   ```

2. **Verificar anuncios**:
   - Banner en la parte inferior
   - Interstitial entre navegaciones
   - Rewarded para funciones premium

---

## 💰 POTENCIAL DE INGRESOS

- **Mes 1-3**: €50-150/mes
- **Mes 4-6**: €300-800/mes
- **Mes 12+**: €1,000-2,500/mes

---

## 🆘 ¿PROBLEMAS?

### **Error en AdMob**
- Verifica que los IDs sean correctos
- Asegúrate de que las apps estén aprobadas
- Revisa las políticas de AdMob

### **Error en el script**
- Verifica el formato de los IDs
- Asegúrate de estar en el directorio correcto
- Revisa que Node.js esté instalado

### **Anuncios no aparecen**
- Verifica que `initializeForTesting: false`
- Espera unos minutos para que se propaguen
- Revisa la consola del dispositivo

---

## 📞 CONTACTO

Si tienes problemas, comparte:
1. **Los IDs que obtuviste**
2. **El error exacto**
3. **En qué paso te quedaste**

¡Vamos a monetizar esas apps! 🚀💰
