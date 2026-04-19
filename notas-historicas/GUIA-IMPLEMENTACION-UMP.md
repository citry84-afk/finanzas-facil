# 🚀 Guía: Implementación UMP SDK (Consent Message)

## ✅ ESTADO ACTUAL

**Mensaje de consentimiento:** ✅ **Publicado en AdMob Console**
- **App:** FinanzasFacil (iOS)
- **Estado:** Publicado y activo
- **Idioma:** Inglés (en)
- **Última modificación:** 12 nov 2025

---

## 📋 CÓMO FUNCIONA UMP SDK

### **1. Inicialización Automática**

El **UMP SDK** (User Messaging Platform) se incluye automáticamente con el SDK de AdMob. Cuando AdMob se inicializa:

1. **El SDK detecta la ubicación del usuario**
   - Si el usuario está en EEA, UK, o Switzerland → Consentimiento requerido
   - Si el usuario está fuera de estas regiones → Consentimiento no requerido

2. **El SDK verifica si hay un mensaje publicado en AdMob Console**
   - Si hay un mensaje publicado → Lo muestra automáticamente
   - Si no hay mensaje → Continúa sin mostrar mensaje

3. **El mensaje aparece automáticamente**
   - La primera vez que el usuario abre la app
   - Si el usuario cambia su consentimiento
   - Si el mensaje se actualiza en AdMob Console

### **2. Flujo de Consentimiento**

```
Usuario abre app
    ↓
AdMob se inicializa
    ↓
UMP SDK detecta ubicación
    ↓
¿Usuario en EEA/UK/CH?
    ├─ NO → Mostrar anuncios (sin consentimiento)
    └─ SÍ → Mostrar mensaje de consentimiento
            ↓
        ¿Usuario consiente?
            ├─ SÍ → Anuncios personalizados
            └─ NO → Anuncios no personalizados
```

---

## 🔧 IMPLEMENTACIÓN ACTUAL

### **1. Archivos Creados:**

- ✅ **`src/utils/ump.ts`** - Utilidades para UMP SDK
- ✅ **`src/utils/att.ts`** - Actualizado para integrar UMP

### **2. Integración en App.tsx:**

El código actual ya inicializa UMP cuando se inicializa AdMob:

```typescript
// En App.tsx, cuando se inicializa ATT:
const { requestTrackingPermission, initializeTrackingServices } = await import('./utils/att');

// initializeTrackingServices ahora incluye UMP:
// 1. Inicializa UMP SDK
// 2. Inicializa AdMob (que mostrará el mensaje automáticamente)
// 3. Inicializa Firebase Analytics
```

### **3. Cómo Funciona:**

1. **Usuario abre la app**
2. **ATT se solicita** (para iOS 14.5+)
3. **UMP se inicializa** (para GDPR consent)
4. **AdMob se inicializa** (el mensaje aparece automáticamente si es necesario)
5. **Anuncios se muestran** (según el consentimiento del usuario)

---

## ⚠️ IMPORTANTE: Plugin de Capacitor AdMob

### **El plugin `@capacitor-community/admob` incluye UMP SDK automáticamente**

Cuando usas `@capacitor-community/admob`, el SDK de AdMob incluye el UMP SDK. Esto significa:

1. **No necesitas instalar UMP SDK por separado**
2. **El mensaje aparecerá automáticamente** cuando AdMob se inicialice
3. **El consentimiento se maneja automáticamente** por el SDK

### **Verificación:**

Para verificar que UMP está funcionando:

1. **Abre la app en un dispositivo iOS**
2. **Usa una VPN para simular estar en EEA (España, Francia, etc.)**
3. **El mensaje de consentimiento debería aparecer automáticamente**
4. **Después de dar consentimiento, los anuncios se mostrarán**

---

## 🎯 PRÓXIMOS PASOS

### **1. Probar el Mensaje de Consentimiento**

Para probar que el mensaje funciona:

1. **Abre la app en un dispositivo iOS real**
2. **Usa una VPN para simular estar en España (EEA)**
3. **El mensaje debería aparecer automáticamente** cuando AdMob se inicialice
4. **Verifica que puedes dar consentimiento o rechazarlo**
5. **Verifica que los anuncios se muestran según el consentimiento**

### **2. Verificar en AdMob Console**

1. **Ve a AdMob Console → Privacidad y mensajes**
2. **Revisa las métricas:**
   - **Mensajes mostrados:** Debería aumentar cuando los usuarios ven el mensaje
   - **Tasa de aceptación:** Debería mostrar cuántos usuarios consienten

### **3. Monitorear el Rendimiento**

1. **Revisa las métricas en AdMob Console**
2. **Verifica que los anuncios se están mostrando**
3. **Revisa la tasa de aceptación de consentimiento**
4. **Ajusta el mensaje si es necesario**

---

## 📝 NOTAS IMPORTANTES

### **1. El Mensaje Aparece Automáticamente**

- ✅ **No necesitas código adicional** para mostrar el mensaje
- ✅ **El SDK lo maneja automáticamente** cuando AdMob se inicializa
- ✅ **Solo aparece a usuarios en EEA, UK, o Switzerland**

### **2. El Mensaje Solo Aparece Una Vez**

- El mensaje aparece **la primera vez** que el usuario abre la app
- Después, el consentimiento se guarda y no vuelve a aparecer
- Si el usuario quiere cambiar su consentimiento, puede hacerlo desde la configuración de la app

### **3. Anuncios Personalizados vs No Personalizados**

- **Con consentimiento:** Anuncios personalizados (mayores ingresos)
- **Sin consentimiento:** Anuncios no personalizados (menores ingresos)
- **Fuera de EEA/UK/CH:** Anuncios personalizados (sin necesidad de consentimiento)

---

## 🚀 RESUMEN

### **✅ Lo que está hecho:**

1. ✅ Mensaje de consentimiento publicado en AdMob Console
2. ✅ Código de UMP SDK implementado
3. ✅ Integración con ATT y AdMob
4. ✅ Plugin de AdMob instalado (`@capacitor-community/admob`)

### **⏳ Lo que falta:**

1. ⏳ **Probar el mensaje** en un dispositivo real con VPN (simulando EEA)
2. ⏳ **Verificar que el mensaje aparece** automáticamente
3. ⏳ **Monitorear las métricas** en AdMob Console
4. ⏳ **Ajustar el mensaje** si es necesario

---

## 🎯 ACCIÓN INMEDIATA

**Próximo paso:** Probar el mensaje de consentimiento en un dispositivo iOS real:

1. **Abre la app en un iPhone/iPad**
2. **Usa una VPN para simular estar en España (EEA)**
3. **Verifica que el mensaje aparece automáticamente**
4. **Prueba dar consentimiento y rechazarlo**
5. **Verifica que los anuncios se muestran correctamente**

---

**¡El mensaje de consentimiento está configurado y debería funcionar automáticamente! Solo necesitas probarlo en un dispositivo real.**

---

**Última actualización:** 2025-11-12 16:00  
**Estado:** ✅ Mensaje publicado, código implementado  
**Próximo paso:** Probar en dispositivo real con VPN

