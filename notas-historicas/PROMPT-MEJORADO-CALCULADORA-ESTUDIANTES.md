# 💡 PROMPT MEJORADO: Calculadora Presupuesto Estudiante Universitario

## 📋 **VERSIÓN OPTIMIZADA CON CONSIDERACIONES SEO:**

Crea calculadora interactiva presupuesto estudiante universitario React TypeScript TailwindCSS.

**CONTEXTO SEO:**
- URL: `/calculadora-presupuesto-estudiante-universitario.html` (landing page estática)
- Route React: `/?mode=presupuesto-estudiante`
- Keywords objetivo: "presupuesto estudiante universitario", "gastos estudiante universidad", "calculadora presupuesto estudiante"

**INPUTS:**
- Ingresos mensuales (number, 0-1500€, step 50)
- Ciudad (select): Madrid, Barcelona, Valencia, Sevilla, Salamanca, Otras
- Tipo alojamiento (select): Residencia pública, Residencia privada, Piso compartido 4+ personas, Piso compartido 2-3 personas, Vive con familia
- Trabajas mientras estudias (checkbox)
- Horas trabajo semanal si trabaja (number, 0-30, step 5)

**LÓGICA CÁLCULO:**
Regla 50/30/20:
- Necesidades 50%: alojamiento + alimentación + transporte
- Deseos 30%: ocio + ropa + cafés + suscripciones
- Ahorro 20%: fondo emergencia + inversión

Costes alojamiento por ciudad tipo:
Madrid: {publica: 230, privada: 580, compartido4: 250, compartido2: 400, familia: 0}
Barcelona: {publica: 210, privada: 520, compartido4: 270, compartido2: 380, familia: 0}
Valencia: {publica: 180, privada: 380, compartido4: 220, compartido2: 300, familia: 0}
Sevilla: {publica: 170, privada: 350, compartido4: 200, compartido2: 280, familia: 0}
Salamanca: {publica: 160, privada: 320, compartido4: 180, compartido2: 250, familia: 0}
Otras: {publica: 175, privada: 370, compartido4: 210, compartido2: 290, familia: 0}

Transporte por ciudad:
Madrid: 20, Barcelona: 13.33, Valencia: 20, Sevilla: 35.75, Otras: 30

Alimentación base: 80€ (cocina casa) o 187€ (come fuera mayoría)

**OUTPUTS MOSTRAR:**
1. Gráfico circular Recharts: 50% verde, 30% naranja, 20% dorado con labels porcentajes euros
2. Desglose detallado tabla:
   NECESIDADES (50%):
   - Alojamiento: X€
   - Alimentación: X€
   - Transporte: X€
   Total necesidades: X€
   
   DESEOS (30%):
   - Ocio salidas: X€
   - Ropa: X€
   - Cafés: X€
   - Suscripciones: X€
   - Gym: X€
   Total deseos: X€
   
   AHORRO (20%):
   - Fondo emergencia: X€
   - Inversión: X€
   Total ahorro: X€

3. Proyecciones:
   - Ahorro mensual: X€
   - Ahorro anual: X€
   - Patrimonio 4 años carrera: X€ (ahorro*48 + rentabilidad 7% anual inversión)
   - Fondo emergencia recomendado: necesidades*6

4. Alertas condicionales:
   - Si ingresos < gastos: "⚠️ DÉFICIT X€ mensuales insostenible. Reduce gastos o aumenta ingresos"
   - Si trabajo >20h semanal: "⚠️ Trabajar >20h impacta rendimiento académico -1.2 puntos nota media"
   - Si ahorro <15%: "⚠️ Ahorro bajo. Objetivo mínimo 15-20% ingresos"
   - Si ahorro >25%: "✅ Excelente! Ahorro superior promedio"

5. Botón "Descargar PDF presupuesto" genera PDF jsPDF con logo, datos, gráfico, recomendaciones

**DISEÑO:**
- Colores: Azul #2563EB, Naranja #F97316, Verde #10B981, Dorado #FCD34D
- Tipografía: Inter UI, Lora contenido
- Responsive mobile-first
- Accesibilidad WCAG AA
- Animaciones suaves inputs cambio

**COMPONENTES:**
- <PresupuestoCalculadora /> principal
- <InputSlider /> custom slider elegante
- <GraficoCircular /> Recharts PieChart
- <TablaDesglose /> tabla responsive
- <AlertaCondicional /> alerts coloridas
- <BotonDescargaPDF /> botón acción

**Stack:** React 18, TypeScript, TailwindCSS, Recharts, jsPDF, React Hook Form validación

---

## 🆕 **MEJORAS AÑADIDAS PARA SEO:**

### **1. Landing Page HTML Estática:**
Crear `/public/calculadora-presupuesto-estudiante-universitario.html` con:
- Title: "Calculadora Presupuesto Estudiante Universitario 2025 GRATIS | Gastos y Ahorro"
- Meta description optimizada
- FAQ Schema (5-7 preguntas sobre presupuesto estudiante)
- Contenido visible: 500+ palabras sobre presupuesto estudiantes
- Enlaces internos a calculadoras relacionadas
- Schema.org WebApplication

### **2. Integración con App.tsx:**
- Añadir `'presupuesto-estudiante'` al tipo `AppMode`
- Añadir ruta en `getInitialMode()` para `/calculadora-presupuesto-estudiante-universitario.html`
- Añadir entrada en sitemap.xml

### **3. Enlaces Internos:**
- Añadir link desde `/calculadoras.html` hacia la nueva calculadora
- Añadir link desde home page si tiene sentido
- Cross-linking con otras calculadoras (ej: si estudiante trabaja, link a calculadora autónomos)

### **4. Content Marketing:**
- Blog post: "Guía Presupuesto Estudiante Universitario 2025: Cómo Gestionar tus Finanzas"
- Blog post: "Gastos Reales de un Estudiante en Madrid, Barcelona, Valencia"
- FAQ page expandida sobre finanzas estudiantes

---

## ⏰ **TIMING RECOMENDADO:**

**OPCIÓN A (Recomendada): Después de AdSense (Febrero 2026)**
- ✅ Enfoque actual en consolidar SEO autónomos
- ✅ Aplicar a AdSense finales de enero
- ✅ Implementar en febrero/marzo cuando haya más tráfico base

**OPCIÓN B: Ahora si hay tráfico de YouTube**
- ✅ Si el video tiene views y genera interés inmediato
- ✅ Puede ayudar a diversificar contenido
- ⚠️ Considerar si distrae de objetivo AdSense

---

## 📊 **POTENCIAL SEO:**

**Keywords objetivo:**
- "presupuesto estudiante universitario" (1,200 búsquedas/mes)
- "gastos estudiante universidad" (800 búsquedas/mes)
- "calculadora presupuesto estudiante" (400 búsquedas/mes)
- "cuánto cuesta estudiar en madrid" (600 búsquedas/mes)
- "gastos estudiante barcelona" (500 búsquedas/mes)

**Competencia:** Media-Alta (muchos sitios universitarios, pero pocos tienen calculadora interactiva)

**Oportunidad:** Baja competencia para queries con "calculadora" + "presupuesto estudiante"

---

## ✅ **DECISIÓN FINAL:**

**Mi recomendación:** Esperar a Febrero 2026 después de consolidar AdSense, PERO guardar este prompt y el video puede servir como validación de demanda antes de implementar.
