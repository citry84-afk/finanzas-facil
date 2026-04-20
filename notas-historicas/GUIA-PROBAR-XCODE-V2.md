# 🍎 GUÍA: PROBAR V2.0 EN XCODE

## 🎯 PASOS PARA PROBAR

### **1. Xcode ya está abierto** ✅
- ✅ Proyecto abierto: `ios/App/App.xcworkspace`
- ✅ Assets sincronizados desde `dist/`
- ✅ Configuración actualizada

---

## 🚀 PRÓXIMOS PASOS EN XCODE

### **1. Seleccionar Dispositivo**
- **Simulador iOS:** Selecciona un simulador (iPhone 14 Pro, iPhone 15, etc.)
- **Dispositivo físico:** Conecta tu iPhone/iPad y seleccionalo
- **Destino:** "Any iOS Device" para compilar para App Store

### **2. Compilar y Ejecutar**
- **Clic en "Run" (▶️)** o presiona `⌘ + R`
- **Espera** a que compile (puede tardar 1-3 minutos la primera vez)
- **La app se abrirá** en el simulador o dispositivo

### **3. Probar las Nuevas Características**

#### **✅ Exportación a CSV:**
1. Ve al dashboard
2. Busca los botones "Exportar Gastos", "Exportar Ingresos", "Exportar Todo"
3. Haz clic en uno de ellos
4. Verifica que se descarga el archivo CSV

#### **✅ Presupuestos por Categorías:**
1. Ve al dashboard
2. Busca el botón "💰 Presupuesto" en la sección de gastos
3. Haz clic y establece un presupuesto para una categoría
4. Añade gastos en esa categoría
5. Verifica que aparece la barra de progreso
6. Verifica que los colores cambian según el porcentaje

#### **✅ Vista por Período:**
1. Ve al dashboard
2. Busca los filtros "Semana", "Mes", "Año", "Todo"
3. Selecciona un período diferente
4. Verifica que los gastos se filtran correctamente
5. Verifica que los gráficos se actualizan

#### **✅ Metas de Ahorro Visuales:**
1. Ve al dashboard
2. Busca la sección "Disponible"
3. Verifica que aparece la barra de progreso de meta de ahorro
4. Verifica que muestra el porcentaje
5. Verifica que los colores cambian según el progreso

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **1. Error de CocoaPods:**
Si ves errores relacionados con CocoaPods:

```bash
cd ios/App
pod install
```

Luego vuelve a abrir Xcode.

### **2. Error de Compilación:**
Si ves errores de compilación:

1. **Limpia el proyecto:**
   - Product → Clean Build Folder (⇧⌘K)

2. **Cierra y vuelve a abrir Xcode**

3. **Sincroniza de nuevo:**
   ```bash
   npm run build:all
   ```

### **3. Error de Firebase:**
Si ves errores relacionados con Firebase:

1. **Verifica que `GoogleService-Info.plist` esté en el proyecto**
2. **Verifica que esté incluido en el target "App"**
3. **Verifica que los frameworks de Firebase estén instalados**

### **4. Error de AdMob:**
Si ves errores relacionados con AdMob:

1. **Verifica que los plugins de Capacitor estén instalados**
2. **Verifica que `Info.plist` tenga `GADApplicationIdentifier`**
3. **Verifica que los App IDs estén correctos**

---

## 📋 VERIFICACIÓN DE CAMBIOS

### **Verificar que los cambios están en la app:**
1. **Dashboard:** Debe tener los botones de exportación
2. **Filtros:** Debe tener los filtros de período
3. **Presupuestos:** Debe tener el botón de presupuesto
4. **Metas:** Debe tener la barra de progreso de meta de ahorro

### **Verificar que funciona correctamente:**
1. **Exportación CSV:** Debe descargar archivos CSV
2. **Presupuestos:** Debe mostrar barras de progreso
3. **Filtros:** Debe filtrar los gastos correctamente
4. **Metas:** Debe mostrar el progreso de ahorro

---

## 🎯 PRÓXIMOS PASOS

### **1. Probar las Nuevas Características:**
- ✅ Exportación a CSV
- ✅ Presupuestos por categorías
- ✅ Vista por período
- ✅ Metas de ahorro visuales

### **2. Verificar que Todo Funciona:**
- ✅ No hay errores en la consola
- ✅ Las características funcionan correctamente
- ✅ La experiencia del usuario es buena

### **3. Compilar para App Store:**
1. Selecciona "Any iOS Device" como destino
2. Product → Archive
3. Espera a que compile (5-10 minutos)
4. Organizer se abrirá automáticamente
5. Clic en "Distribute App"
6. Selecciona "App Store Connect"
7. Sigue el asistente
8. Sube el build

### **4. Actualizar en App Store Connect:**
1. Ve a App Store Connect
2. Selecciona tu app "FinanzasFacil"
3. Ve a "App Store" → "Versiones"
4. Crea una nueva versión o edita la existente
5. Añade las notas de la versión:
   ```
   Versión 2.0.0
   
   Nuevas características:
   - Exportación de datos a CSV
   - Presupuestos por categorías con barras de progreso
   - Vista de gastos por período (semana, mes, año)
   - Metas de ahorro visuales con barras de progreso
   - Mejoras en la experiencia del usuario
   ```
6. Guarda los cambios
7. Envía para revisión

---

## ✅ RESUMEN

### **✅ Completado:**
- ✅ Xcode abierto
- ✅ Assets sincronizados
- ✅ Configuración actualizada
- ✅ Nuevas características V2.0 listas para probar

### **🎯 Próximos pasos:**
- 🍎 Probar en Xcode (dispositivo o simulador)
- ✅ Verificar que las nuevas características funcionan
- 📦 Compilar para App Store
- 🚀 Actualizar en App Store Connect

---

**¡Xcode está abierto! Ahora puedes probar las nuevas características V2.0.**

---

**Última actualización:** 2025-11-12 21:36  
**Versión:** 2.0.0  
**Estado:** ✅ Xcode abierto y listo para probar

