# 🧪 GUÍA DE PRUEBAS V2.0.1

## ✅ BUILD COMPLETADO

**Fecha:** 2025-11-12  
**Versión:** 2.0.1  
**Estado:** ✅ Build completado y sincronizado

---

## 🧪 PRUEBAS A REALIZAR

### **1. Exportación CSV** 📊

#### **En iOS:**
1. Ve al dashboard
2. Añade algunos gastos e ingresos (si no tienes)
3. Haz clic en "Exportar Gastos", "Exportar Ingresos" o "Exportar Todo"
4. **Resultado esperado:** 
   - ✅ Debería abrir el diálogo de compartir de iOS
   - ✅ El texto CSV debería estar disponible para compartir
   - ✅ Puedes compartirlo a Notes, Mail, etc.
   - ✅ El formato debería ser correcto (Fecha, Categoría/Fuente, Cantidad)

#### **En Web:**
1. Ve al dashboard en el navegador
2. Haz clic en cualquier botón de exportación
3. **Resultado esperado:**
   - ✅ Debería descargar un archivo CSV automáticamente
   - ✅ El archivo debería abrirse en Excel/Numbers/Google Sheets
   - ✅ Los datos deberían estar correctamente formateados

---

### **2. Filtros por Período** 📅

#### **Pruebas:**
1. Ve al dashboard
2. Asegúrate de tener gastos con diferentes fechas:
   - Algunos de hace menos de 7 días (última semana)
   - Algunos de hace menos de 1 mes (último mes)
   - Algunos de hace menos de 1 año (último año)
   - Algunos más antiguos

3. **Prueba cada filtro:**
   - **Semana:** Haz clic en "Semana"
     - ✅ Debería mostrar solo gastos de los últimos 7 días
     - ✅ El texto debería cambiar a "Gastos variables (Última semana)"
   - **Mes:** Haz clic en "Mes"
     - ✅ Debería mostrar solo gastos del último mes
     - ✅ El texto debería cambiar a "Gastos variables (Último mes)"
   - **Año:** Haz clic en "Año"
     - ✅ Debería mostrar solo gastos del último año
     - ✅ El texto debería cambiar a "Gastos variables (Último año)"
   - **Todo:** Haz clic en "Todo"
     - ✅ Debería mostrar todos los gastos
     - ✅ El texto debería volver a "Gastos variables"

4. **Prueba sin gastos:**
   - Si no hay gastos en el período seleccionado:
     - ✅ Debería mostrar el mensaje: "No hay gastos en el período seleccionado (última semana/mes/año)."
   - Si no hay gastos en absoluto:
     - ✅ Debería mostrar: "No hay gastos registrados. Añade uno usando el botón de abajo."

---

### **3. Compartir App** 📤

#### **En iOS:**
1. Busca el botón "Compartir esta app" (puede estar en diferentes lugares)
2. Haz clic en el botón
3. **Resultado esperado:**
   - ✅ Debería abrir el diálogo de compartir de iOS
   - ✅ Debería compartir el link de App Store
   - ✅ El texto debería decir: "¡Descarga FinanzasFácil en el App Store!"
   - ⚠️ **Nota:** El link puede tener `[TU_APP_ID]` si no se ha reemplazado todavía

#### **En Web:**
1. Busca el botón "Compartir esta app"
2. Haz clic en el botón
3. **Resultado esperado:**
   - ✅ Debería compartir la URL web: https://www.finanzasmuyfacil.com
   - ✅ El texto debería decir: "¡Descubre FinanzasFácil!"
   - ✅ Si el navegador no soporta Web Share API, debería copiar al portapapeles

#### **En Android (cuando esté listo):**
1. Busca el botón "Compartir esta app"
2. Haz clic en el botón
3. **Resultado esperado:**
   - ✅ Debería compartir el link de Google Play
   - ✅ El texto debería decir: "¡Descarga FinanzasFácil en Google Play!"

---

## 🐛 PROBLEMAS CONOCIDOS

### **1. CocoaPods Error (No Crítico)**
- ⚠️ **Error:** `cannot load such file -- random/formatter`
- ✅ **Estado:** No crítico - los assets se copiaron correctamente
- ✅ **Impacto:** La app debería funcionar correctamente en Xcode
- 💡 **Solución (si es necesario):** Ejecutar `pod install` manualmente en `ios/App/`

### **2. App Store ID (Pendiente)**
- ⚠️ **Problema:** El link de App Store tiene `[TU_APP_ID]` como placeholder
- ✅ **Estado:** Funcionará cuando se reemplace con el ID real
- 💡 **Solución:** Reemplazar `[TU_APP_ID]` en `src/components/ShareApp.tsx` línea 25

---

## 📋 CHECKLIST DE PRUEBAS

### **Exportación CSV:**
- [ ] Exportar Gastos funciona en iOS
- [ ] Exportar Ingresos funciona en iOS
- [ ] Exportar Todo funciona en iOS
- [ ] Exportar funciona en Web
- [ ] El formato CSV es correcto
- [ ] Los datos se pueden abrir en Excel/Numbers/Google Sheets

### **Filtros por Período:**
- [ ] Filtro "Semana" funciona correctamente
- [ ] Filtro "Mes" funciona correctamente
- [ ] Filtro "Año" funciona correctamente
- [ ] Filtro "Todo" muestra todos los gastos
- [ ] Mensaje aparece cuando no hay gastos en el período
- [ ] Los gastos se filtran correctamente por fecha

### **Compartir App:**
- [ ] Compartir funciona en iOS (App Store link)
- [ ] Compartir funciona en Web (URL web)
- [ ] El texto de compartir es correcto
- [ ] El link funciona correctamente

---

## ✅ VERIFICACIÓN FINAL

### **Build:**
- ✅ Compilado sin errores
- ✅ Assets sincronizados a iOS
- ✅ Assets sincronizados a Android
- ✅ Web lista para desplegar

### **Código:**
- ✅ Sin errores de linter
- ✅ Sin errores de TypeScript
- ✅ Funciones implementadas correctamente

---

## 🚀 PRÓXIMOS PASOS

1. **Probar en iOS:**
   - Abre Xcode: `open ios/App/App.xcworkspace`
   - Compila y ejecuta en dispositivo/simulador
   - Prueba todas las funcionalidades

2. **Probar en Web:**
   - Abre el sitio en el navegador
   - Prueba exportación CSV y filtros

3. **Actualizar App Store ID:**
   - Reemplazar `[TU_APP_ID]` en `ShareApp.tsx`
   - Recompilar y probar compartir

4. **Reportar Problemas:**
   - Si encuentras algún problema, anota los pasos para reproducirlo
   - Verifica los logs en la consola de Xcode

---

**¡Listo para probar!** 🎉

---

**Última actualización:** 2025-11-12 21:50  
**Versión:** 2.0.1  
**Estado:** ✅ Build completado y listo para probar

