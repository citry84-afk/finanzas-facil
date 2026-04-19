# 📱 INSTRUCCIONES: VINCULAR ADMOB CON APP STORE CONNECT

## 🎯 OBJETIVO
Vincular tu app de iOS en AdMob con App Store Connect para que AdMob pueda aprobar la app y comenzar a mostrar anuncios reales.

---

## 📋 INFORMACIÓN QUE TIENES DE APP STORE CONNECT

Según la imagen de App Store Connect:
- **Bundle ID**: `com.lipastudios.finanzasfacil`
- **Apple ID**: `6754602748`
- **Nombre de la app**: `FinanzasFacil`
- **Versión**: `1.0 Listo para distribución`
- **Categorías**: Finanzas y Educación

---

## 🔧 PASOS PARA VINCULAR EN ADMOB

### Paso 1: Acceder a la Configuración de la App en AdMob

1. Ve a: **https://admob.google.com/**
2. En el menú izquierdo, haz clic en **"Aplicaciones"**
3. Selecciona **"FinanzasFácil iOS"**
4. Haz clic en **"Configuración de la aplicación"** (Application settings)

### Paso 2: Añadir Detalles de la Tienda de Aplicaciones

1. En la sección **"Detalles de la tienda de aplicaciones"** (App store details)
2. Haz clic en el botón **"Añadir"** (Add)
3. Se abrirá un formulario donde debes ingresar:

#### **Información a ingresar:**

**Tipo de tienda:**
- Selecciona: **"App Store (iOS)"**

**URL de la app (opcional pero recomendado):**
- Si la app ya está publicada en App Store:
  - URL: `https://apps.apple.com/app/id6754602748`
  - O busca tu app en App Store y copia la URL

**Si la app NO está publicada aún (solo en TestFlight):**
- Puedes dejar este campo vacío por ahora
- Una vez que publiques en App Store, actualiza esta URL

**Bundle ID:**
- Ingresa: `com.lipastudios.finanzasfacil`
- Este debe coincidir exactamente con el Bundle ID de App Store Connect

**Nombre de la app:**
- Ingresa: `FinanzasFacil`
- O el nombre exacto que aparece en App Store Connect

### Paso 3: Guardar los Cambios

1. Haz clic en **"Guardar"** o **"Save"**
2. AdMob verificará la información
3. Puede tomar unos minutos en procesarse

### Paso 4: Verificar el Estado

1. Después de guardar, el estado de aprobación debería cambiar
2. Puede tomar 24-48 horas para que AdMob revise y apruebe
3. Mientras tanto, puedes verificar que:
   - Los Ad Units estén activos
   - Los IDs sean correctos
   - La app esté funcionando correctamente

---

## ⚠️ IMPORTANTE: Estados de Aprobación en AdMob

### **"Debe revisarse" (Must be reviewed)**
- ✅ **Normal**: Todas las apps nuevas pasan por esto
- ⏰ **Tiempo**: 24-48 horas típicamente
- 📱 **Requisito**: La app debe estar publicada o en TestFlight

### **"Aprobada" (Approved)**
- ✅ **Significado**: AdMob ha revisado y aprobado la app
- 🎉 **Resultado**: Anuncios reales se mostrarán con fill rate completo
- 💰 **Monetización**: Comienza a generar ingresos reales

### **"Rechazada" (Rejected)**
- ❌ **Significado**: AdMob encontró algún problema
- 📧 **Acción**: Revisar el email de AdMob para ver el motivo
- 🔧 **Solución**: Corregir el problema y volver a solicitar revisión

---

## 📱 SI LA APP NO ESTÁ PUBLICADA AÚN

### Opción 1: Publicar en TestFlight (Recomendado)

1. **En App Store Connect:**
   - Ve a **"TestFlight"**
   - Añade testers internos o externos
   - Sube un build para TestFlight

2. **En AdMob:**
   - Puedes vincular la app aunque no esté en App Store público
   - AdMob acepta apps en TestFlight para revisión
   - Una vez aprobada, los anuncios funcionarán en TestFlight

### Opción 2: Esperar a Publicar en App Store

- Si prefieres esperar hasta publicar en App Store:
  - AdMob puede revisar la app después de publicarla
  - Pero es mejor vincularla antes para acelerar el proceso

---

## 🎯 INFORMACIÓN ESPECÍFICA PARA TU APP

### **Bundle ID:**
```
com.lipastudios.finanzasfacil
```

### **Apple ID:**
```
6754602748
```

### **URL de App Store (cuando esté publicada):**
```
https://apps.apple.com/app/id6754602748
```

### **Nombre de la app:**
```
FinanzasFacil
```

### **Categorías:**
- Finanzas
- Educación

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de vincular, verifica que:

- [ ] El Bundle ID en AdMob coincide con App Store Connect
- [ ] El nombre de la app es correcto
- [ ] Los Ad Unit IDs están configurados correctamente
- [ ] La app está en TestFlight o App Store
- [ ] Los IDs de AdMob en el código son correctos
- [ ] La política de privacidad está actualizada
- [ ] Los permisos de la app son correctos (ATT, etc.)

---

## 🚀 DESPUÉS DE VINCULAR

### 1. Esperar Revisión (24-48 horas)
- AdMob revisará la app automáticamente
- Recibirás un email cuando se complete la revisión

### 2. Verificar Estado
- Ve a AdMob → Aplicaciones → Tu app
- Verifica que el estado cambie a "Aprobada"

### 3. Monitorear Métricas
- Ve a AdMob → Informes
- Verifica impresiones, clics, eCPM
- Los datos pueden tardar 24-48 horas en aparecer

### 4. Optimizar (Opcional)
- Ajusta la frecuencia de anuncios
- Activa interstitials si es necesario
- Optimiza ubicaciones de anuncios

---

## 📞 SOPORTE

Si tienes problemas:

1. **AdMob Help Center**: https://support.google.com/admob
2. **App Store Connect Help**: https://help.apple.com/app-store-connect/
3. **Revisar logs**: Verifica que no haya errores en los logs de la app

---

## 🎉 CONCLUSIÓN

**Una vez que vincules la app en AdMob:**
- ✅ AdMob podrá revisar la app
- ✅ El estado cambiará de "Debe revisarse" a "Aprobada"
- ✅ Los anuncios reales comenzarán a mostrarse
- ✅ Comenzarás a monetizar la app

**Tiempo estimado:**
- Vincular: 5 minutos
- Revisión de AdMob: 24-48 horas
- Monetización activa: Después de la aprobación

---

**Última actualización**: 2025-01-10

