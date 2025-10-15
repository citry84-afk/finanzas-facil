# 📋 GUIDELINES STORE COMPLIANCE 2024 - FINANZASFÁCIL

## 🎯 RESUMEN EJECUTIVO
Documento completo con todas las guidelines de Google Play Store y Apple App Store que debemos cumplir para evitar rechazos. Basado en las políticas actuales de 2024.

---

## 📱 GOOGLE PLAY STORE GUIDELINES

### ✅ **1. SEGURIDAD Y PRIVACIDAD**

#### **Política de Privacidad**
- ✅ **OBLIGATORIO**: Política de privacidad accesible desde la app y página de la tienda
- ✅ **URL válida**: Debe funcionar y estar actualizada
- ✅ **Contenido claro**: Explicar qué datos se recopilan y cómo se usan
- ✅ **GDPR compliance**: Para usuarios europeos

#### **Permisos**
- ✅ **Mínimos necesarios**: Solo solicitar permisos esenciales
- ✅ **Explicación clara**: Justificar cada permiso solicitado
- ✅ **Lista actual**: Revisar permisos en AndroidManifest.xml

#### **Datos del Usuario**
- ✅ **Recopilación mínima**: Solo datos necesarios
- ✅ **Consentimiento**: Obtener consentimiento explícito
- ✅ **Protección**: Cifrado de datos sensibles

### ✅ **2. CONTENIDO Y FUNCIONALIDAD**

#### **Contenido Apropiado**
- ✅ **Sin contenido prohibido**: Adultos, violencia, odio
- ✅ **Contenido educativo**: Finanzas y calculadoras están permitidas
- ✅ **Información precisa**: Cálculos financieros correctos

#### **Funcionalidad Completa**
- ✅ **Sin errores**: App completamente funcional
- ✅ **Sin placeholders**: Eliminar contenido temporal
- ✅ **Testing exhaustivo**: Probar en dispositivos reales

#### **Apps Financieras Específicas**
- ✅ **Precisión matemática**: Cálculos 100% correctos
- ✅ **Desclaimers**: "Solo para fines informativos"
- ✅ **No asesoramiento**: Clarificar que no es asesoramiento financiero

### ✅ **3. METADATOS Y PRESENTACIÓN**

#### **Descripción Precisa**
- ✅ **Funcionalidades reales**: Solo describir lo que hace la app
- ✅ **Keywords relevantes**: "calculadora", "finanzas", "autónomos"
- ✅ **Sin exageraciones**: Evitar "mejor app del mundo"

#### **Capturas de Pantalla**
- ✅ **Fieles a la realidad**: Mostrar funcionalidad real
- ✅ **Alta calidad**: Mínimo 1080p
- ✅ **Múltiples dispositivos**: Diferentes tamaños de pantalla

### ✅ **4. MONETIZACIÓN Y ANUNCIOS**

#### **AdMob Compliance**
- ✅ **Políticas AdMob**: Cumplir todas las políticas
- ✅ **Ubicación apropiada**: Anuncios que no molesten UX
- ✅ **Identificación clara**: Anuncios claramente identificados
- ✅ **No click fraud**: Prohibido hacer clic en tus propios anuncios

#### **Anuncios Apropiados**
- ✅ **Contenido relevante**: Anuncios relacionados con finanzas
- ✅ **No intrusivos**: No interrumpir funcionalidad principal
- ✅ **Frecuencia adecuada**: No saturar al usuario

---

## 🍎 APPLE APP STORE GUIDELINES

### ✅ **1. SEGURIDAD Y PRIVACIDAD**

#### **Política de Privacidad**
- ✅ **OBLIGATORIO**: Política de privacidad accesible
- ✅ **App Store Connect**: Incluir URL en metadatos
- ✅ **In-app**: Accesible desde configuración de la app

#### **Permisos iOS**
- ✅ **Info.plist**: Describir uso de cada permiso
- ✅ **Justificación**: Explicar por qué se necesita cada permiso
- ✅ **Mínimos**: Solo permisos esenciales

#### **App Tracking Transparency**
- ✅ **ATT Framework**: Implementar si se rastrea usuarios
- ✅ **Consentimiento**: Obtener antes de rastrear
- ✅ **Transparencia**: Explicar qué se rastrea

### ✅ **2. CONTENIDO Y FUNCIONALIDAD**

#### **Apps Financieras**
- ✅ **Precisión**: Cálculos matemáticos exactos
- ✅ **Disclaimers legales**: "Solo informativo, no asesoramiento"
- ✅ **Actualización**: Mantener cálculos actualizados
- ✅ **Fuentes confiables**: Usar datos oficiales

#### **Funcionalidad Nativa**
- ✅ **No web apps**: Debe ser app nativa
- ✅ **Funcionalidad real**: No solo mostrar web
- ✅ **Performance**: 60fps, sin lag

### ✅ **3. DISEÑO Y UX**

#### **Human Interface Guidelines**
- ✅ **Diseño iOS**: Seguir HIG de Apple
- ✅ **Navegación intuitiva**: Fácil de usar
- ✅ **Accesibilidad**: Soporte para VoiceOver
- ✅ **Responsive**: Funcionar en todos los tamaños

#### **Experiencia de Usuario**
- ✅ **Sin crashes**: App estable
- ✅ **Loading rápido**: Tiempo de carga < 3 segundos
- ✅ **Offline capability**: Funcionar sin internet básico

### ✅ **4. MONETIZACIÓN**

#### **AdMob iOS**
- ✅ **SDK actualizado**: Usar última versión
- ✅ **Políticas AdMob**: Cumplir todas las políticas
- ✅ **Testing**: Probar en dispositivos reales
- ✅ **No simulators**: AdMob no funciona en simuladores

#### **In-App Purchases**
- ✅ **Apple Pay**: Si hay compras, usar IAP
- ✅ **No external payments**: Prohibido dirigir a pagos externos
- ✅ **Restore purchases**: Permitir restaurar compras

---

## 🔧 REQUISITOS TÉCNICOS ESPECÍFICOS

### ✅ **ANDROID**

#### **AndroidManifest.xml**
```xml
<!-- Permisos mínimos -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- App ID AdMob -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-4837743291717475~5262527045"/>

<!-- Target SDK -->
<uses-sdk android:targetSdkVersion="34" />
```

#### **Play Console Requirements**
- ✅ **Target SDK 34**: Android 14
- ✅ **64-bit support**: ARM64
- ✅ **App Bundle**: Usar .aab, no .apk
- ✅ **Signing**: Firma digital correcta

### ✅ **iOS**

#### **Info.plist**
```xml
<!-- App ID AdMob -->
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-4837743291717475~3521575123</string>

<!-- Permisos con descripción -->
<key>NSUserTrackingUsageDescription</key>
<string>Esta app utiliza datos de seguimiento para mostrar anuncios personalizados</string>
```

#### **App Store Connect**
- ✅ **iOS 17+**: Target mínimo iOS 17
- ✅ **64-bit**: Solo arquitecturas 64-bit
- ✅ **App Store Review**: Preparar para revisión

---

## 📄 DOCUMENTOS NECESARIOS

### ✅ **1. Política de Privacidad**
- ✅ **URL funcional**: https://finanzasmuyfaciles.netlify.app/privacy
- ✅ **Contenido completo**: Qué datos recopilamos
- ✅ **Contacto**: Email de contacto
- ✅ **Actualizada**: Revisar y actualizar

### ✅ **2. Términos de Servicio**
- ✅ **URL funcional**: https://finanzasmuyfaciles.netlify.app/terms
- ✅ **Disclaimers**: Solo informativo, no asesoramiento
- ✅ **Limitaciones**: Clarificar limitaciones de responsabilidad

### ✅ **3. Descripción de la App**
```
FinanzasFácil - Calculadoras Financieras Gratuitas

📊 Calculadoras financieras profesionales para autónomos y empleados en España.

✨ CARACTERÍSTICAS:
• Calculadora salario neto 2025
• Calculadora IRPF autónomos
• Cuota Seguridad Social
• Control de gastos personal
• Gastos deducibles autónomos
• ¿Cuándo seré millonario?

🎯 IDEAL PARA:
• Autónomos y freelancers
• Empleados por cuenta ajena
• Estudiantes de economía
• Cualquier persona interesada en finanzas

📱 FUNCIONES:
• Cálculos precisos y actualizados
• Interfaz intuitiva y fácil de usar
• Sin registro necesario
• Completamente gratuito

⚖️ DISCLAIMER:
Esta aplicación es solo para fines informativos. No constituye asesoramiento financiero, fiscal o legal profesional. Consulte siempre con un profesional cualificado.

🔒 PRIVACIDAD:
No recopilamos datos personales. Todos los cálculos se realizan localmente en su dispositivo.
```

---

## 🚨 CHECKLIST FINAL PRE-BUILD

### ✅ **GOOGLE PLAY STORE**
- [ ] Política de privacidad actualizada y accesible
- [ ] Permisos mínimos en AndroidManifest.xml
- [ ] App ID AdMob correcto
- [ ] Target SDK 34
- [ ] Testing en dispositivos reales
- [ ] Sin errores ni crashes
- [ ] Capturas de pantalla preparadas
- [ ] Descripción precisa sin exageraciones
- [ ] Anuncios AdMob funcionando correctamente
- [ ] Sin contenido placeholder

### ✅ **APPLE APP STORE**
- [ ] Política de privacidad en App Store Connect
- [ ] Info.plist con descripciones de permisos
- [ ] App ID AdMob iOS correcto
- [ ] Target iOS 17+
- [ ] ATT framework implementado si necesario
- [ ] Testing en dispositivos iOS reales
- [ ] Sin errores ni crashes
- [ ] Diseño siguiendo HIG
- [ ] Capturas de pantalla para diferentes dispositivos
- [ ] Descripción precisa sin exageraciones

### ✅ **GENERAL**
- [ ] Cálculos financieros 100% precisos
- [ ] Disclaimers legales incluidos
- [ ] Fuentes de datos oficiales
- [ ] App completamente funcional
- [ ] Sin enlaces rotos
- [ ] Contacto de soporte disponible
- [ ] Términos de servicio actualizados

---

## 💡 RECOMENDACIONES ADICIONALES

### **Para Evitar Rechazos**
1. **Testing exhaustivo**: Mínimo 1 semana de testing
2. **Documentación completa**: Preparar para preguntas de revisores
3. **Cuentas de prueba**: Si hay login, crear cuenta demo
4. **Soporte rápido**: Responder a revisores en < 24h
5. **Versión estable**: No enviar versiones beta

### **Optimización para Aprobación**
1. **Funcionalidad única**: Destacar qué hace diferente
2. **Calidad visual**: Diseño profesional
3. **Performance**: App rápida y fluida
4. **Usabilidad**: Fácil de usar para cualquier usuario
5. **Estabilidad**: Sin crashes reportados

---

## 🎯 PRÓXIMOS PASOS

1. **Revisar checklist completo**
2. **Actualizar documentos legales**
3. **Testing exhaustivo en dispositivos reales**
4. **Preparar metadatos de tienda**
5. **Build de producción**
6. **Envío a tiendas**

---

*Documento creado: $(date)*
*Última actualización: Guidelines 2024*
*Estado: ✅ LISTO PARA REVISIÓN PRE-BUILD*
