# 📸 CÓMO HACER CAPTURAS EN TU SAMSUNG

## 🎯 MÉTODO MÁS FÁCIL (PALM SWIPE)

### **En tu Samsung:**
1. **Activa Palm Swipe** (si no lo está):
   - Configuración > Funciones avanzadas
   - Movimientos y gestos
   - Activar "Pasar la mano para capturar"

2. **Hacer captura**:
   - Desliza el borde de tu mano de derecha a izquierda sobre la pantalla
   - O viceversa (izquierda a derecha)
   - ✨ ¡Captura instantánea!

---

## 🎯 MÉTODO ALTERNATIVO (BOTONES)

**Presiona simultáneamente:**
- Botón **Encendido** + Botón **Bajar Volumen**
- Mantén 1 segundo
- Verás el flash de la captura

---

## 📱 CAPTURAS QUE NECESITAS (Google Play Store)

### **1. LANDING PAGE** 
- Abre FinanzasFácil
- Captura la pantalla principal
- Se debe ver: Logo, título, botones de calculadoras

### **2. CALCULADORA IRPF CON RESULTADOS**
- Toca "Calculadora IRPF"
- Introduce datos (ej: 30000€ bruto)
- Toca "Calcular"
- Captura cuando veas los resultados

### **3. CALCULADORA MILLONARIO CON GRÁFICO**
- Toca "Calculadora Millonario"
- Introduce datos (ej: 500€/mes, 7% retorno)
- Captura cuando veas el gráfico

### **4. CONTROL DE GASTOS**
- Toca "Control de Gastos"
- Captura la interfaz de gamificación
- Se debe ver: puntos, racha, categorías

### **5. ADMOB BANNER** (si aparece)
- Espera 1-2 minutos después de abrir
- Captura mostrando el banner en el footer

---

## 💾 TRANSFERIR CAPTURAS AL MAC

### **MÉTODO 1: ADB (MÁS RÁPIDO)**

```bash
# Desde tu Mac:
adb pull /sdcard/DCIM/Screenshots/ ~/Desktop/Screenshots-FinanzasFacil/
```

### **MÉTODO 2: CABLE USB**

1. Conecta el Samsung al Mac por USB
2. En el Samsung: Permitir transferencia de archivos
3. En el Mac: Abre Android File Transfer
4. Ve a: DCIM > Screenshots
5. Copia todas las capturas al Mac

### **MÉTODO 3: GOOGLE PHOTOS / DRIVE**

1. Sube las capturas a Google Photos
2. Descárgalas en el Mac

---

## 🎨 REQUISITOS GOOGLE PLAY STORE

### **CAPTURAS REQUERIDAS:**
- **Mínimo**: 2 capturas
- **Máximo**: 8 capturas
- **Recomendado**: 5-8 capturas

### **DIMENSIONES:**
- **Ancho mínimo**: 320px
- **Máximo**: 3840px
- **Proporción**: 16:9 o 9:16

### **FORMATO:**
- PNG o JPEG
- Máx 8MB por imagen

---

## ✅ CHECKLIST DE CAPTURAS

**Para Google Play Store:**
- [ ] 1. Landing page
- [ ] 2. Calculadora IRPF con resultados
- [ ] 3. Calculadora Millonario con gráfico
- [ ] 4. Calculadora Salario
- [ ] 5. Control de Gastos
- [ ] 6-8. Otras características

**Todas las capturas deben:**
- [ ] Estar en vertical (portrait)
- [ ] No mostrar barra de notificaciones (opcional)
- [ ] Tener buen contraste
- [ ] Mostrar funcionalidad real (no placeholder)

---

## 🚀 YO PUEDO AYUDARTE CON:

### **OPCIÓN A: SCRIPT DE TRANSFERENCIA**
```bash
# Ejecutar en Mac cuando termines las capturas
adb pull /sdcard/DCIM/Screenshots/ ~/Desktop/Screenshots-FinanzasFacil/
echo "✅ Capturas transferidas a: ~/Desktop/Screenshots-FinanzasFacil/"
```

### **OPCIÓN B: ORGANIZARLAS AUTOMÁTICAMENTE**
```bash
# Renombrar capturas con nombres descriptivos
mv screenshot_1.png 01-landing-page.png
mv screenshot_2.png 02-calculadora-irpf.png
mv screenshot_3.png 03-calculadora-millonario.png
# etc...
```

---

## 📱 CUÁNDO HACER LAS CAPTURAS

**MEJOR MOMENTO:**
1. ✅ **Después de que la app esté instalada**
2. ✅ **Con buena iluminación** (para ver bien la pantalla)
3. ✅ **Con datos reales** en las calculadoras
4. ✅ **Cuando AdMob haya cargado** (espera 1-2 min)

**EVITAR:**
- ❌ Capturas con pantalla en blanco
- ❌ Capturas con errores visibles
- ❌ Capturas con placeholder text
- ❌ Capturas borrosas

---

*Guía creada para simplificar el proceso de capturas*
*Dispositivo: Samsung R5CXA07F7QT*
