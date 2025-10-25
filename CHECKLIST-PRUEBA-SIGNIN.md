# ✅ CHECKLIST DE PRUEBA: Google & Apple Sign In

## 📱 **PREPARACIÓN:**

- ✅ iPhone conectado
- ✅ App compilando/instalando
- ✅ Código actualizado con logs
- ✅ Firebase configurado

---

## 🧪 **PRUEBAS A REALIZAR:**

### **1. Verificar que aparezcan los botones:**
- [ ] Abrir app "FinanzasFácil"
- [ ] Ir a "Registrarse" o "Iniciar Sesión"
- [ ] ✅ Verificar que aparezca **"Continuar con Apple"** (botón negro)
- [ ] ✅ Verificar que aparezca **"Continuar con Google"** (botón blanco)
- [ ] ✅ Verificar que aparezca **botón "Volver"** (flecha arriba izquierda)

### **2. Probar "Continuar con Apple":**
- [ ] Tocar el botón **"Continuar con Apple"**
- [ ] **Anotar qué pasa:**
  - [ ] ¿Aparece ventana de Apple?
  - [ ] ¿Pide Face ID / Touch ID?
  - [ ] ¿Se cierra sin hacer nada?
  - [ ] ¿Muestra mensaje de error?

### **3. Probar "Continuar con Google":**
- [ ] Tocar el botón **"Continuar con Google"**
- [ ] **Anotar qué pasa:**
  - [ ] ¿Aparece ventana de Google?
  - [ ] ¿Muestra lista de cuentas?
  - [ ] ¿Se cierra sin hacer nada?
  - [ ] ¿Muestra mensaje de error?

### **4. Revisar logs en Safari (OPCIONAL):**
- [ ] Abrir Safari en Mac
- [ ] Ir a: **Develop** → **[iPhone de Luis]** → **[FinanzasFácil]**
- [ ] Ver pestaña **"Console"**
- [ ] **Anotar logs que aparezcan:**
  ```
  Iniciando sesión con Apple...
  Iniciando sesión con Google...
  Error en Apple sign in: [...]
  Error en Google sign in: [...]
  ```

---

## 📝 **FORMATO DE REPORTE:**

Copia y pega esto después de probar:

```
🍎 APPLE SIGN IN:
- ¿Botón aparece? SÍ / NO
- ¿Al tocar pasa algo? SÍ / NO
- ¿Qué pasa exactamente? [describe]
- ¿Mensaje de error? [copia aquí]

🔵 GOOGLE SIGN IN:
- ¿Botón aparece? SÍ / NO
- ¿Al tocar pasa algo? SÍ / NO
- ¿Qué pasa exactamente? [describe]
- ¿Mensaje de error? [copia aquí]

📊 LOGS EN SAFARI:
[pega logs aquí si los revisaste]
```

---

## 🎯 **POSIBLES RESULTADOS:**

### **Resultado A: ✅ FUNCIONA**
- Aparecen las ventanas de Google/Apple
- Puedes seleccionar cuenta e iniciar sesión
- **¡CELEBRA!** 🎉

### **Resultado B: ❌ NO HACE NADA**
- Los botones no responden
- No aparece ninguna ventana
- **Necesitamos ver los logs**

### **Resultado C: ⚠️ MUESTRA ERROR**
- Aparece mensaje de error específico
- **El mensaje nos dirá qué falta**

---

## 🔧 **PRÓXIMOS PASOS SEGÚN RESULTADO:**

### **Si funciona:**
- ✅ ¡Listo! Ya tienes Google & Apple Sign In

### **Si no funciona:**
1. Revisar logs en Safari Console
2. Agregar capacidad "Sign in with Apple" en Xcode
3. Verificar configuración de Firebase Console
4. Probar con cuenta diferente

---

**¡ESPERA A QUE TERMINE LA INSTALACIÓN Y PRUEBA!** ⏳📱
