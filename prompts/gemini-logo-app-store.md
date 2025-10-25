# 🍎 PROMPT ESPECÍFICO PARA APP STORE - GEMINI PRO

## 🎯 **Prompt optimizado para logos de App Store:**

```
Crea un logo PERFECTO para la app "FinanzasFácil" que cumpla EXACTAMENTE con los requisitos de Apple App Store y Google Play Store.

APP: FinanzasFácil
CATEGORÍA: Finanzas / Productividad
ESTILO: Profesional, confiable, moderno, accesible

REQUISITOS CRÍTICOS DE APP STORE:
- Tamaño: 1024x1024 píxeles (exacto)
- Formato: PNG con fondo transparente
- Estilo: Simple, reconocible, sin texto
- Colores: Máximo 3 colores principales
- Detalles: Visibles a 29x29 píxeles
- Sin elementos que puedan confundirse con otros iconos

REQUISITOS CRÍTICOS DE GOOGLE PLAY:
- Tamaño: 512x512 píxeles (exacto)
- Formato: PNG con fondo transparente
- Estilo: Material Design compatible
- Colores: Vibrantes pero profesionales

ELEMENTOS A EVITAR:
- Texto (Apple no lo permite en el icono)
- Elementos demasiado pequeños
- Colores que no contrasten
- Elementos que se confundan con otros iconos
- Diseños demasiado complejos

ELEMENTOS RECOMENDADOS:
- Calculadora moderna
- Gráfico de barras o líneas
- Moneda o símbolo de dinero
- Casa (representando patrimonio)
- Flecha hacia arriba (crecimiento)
- Círculo con elementos financieros

PALETA DE COLORES SUGERIDA:
- Azul principal: #2563EB (confianza)
- Verde secundario: #059669 (crecimiento)
- Dorado acento: #D97706 (riqueza)
- Gris neutro: #6B7280 (profesional)

ESTILO VISUAL:
- Minimalista pero memorable
- Iconografía clara y simple
- Gradientes sutiles
- Bordes redondeados (estilo iOS)
- Sombras suaves
- Compatible con modo oscuro

GENERA ESTOS ARCHIVOS:
1. logo-app-store.png (1024x1024, solo icono)
2. logo-google-play.png (512x512, solo icono)
3. logo-web.png (512x512, para PWA)
4. favicon.png (32x32, para web)
5. logo-completo.png (1024x512, con texto "FinanzasFácil")

VARIACIONES DE COLOR:
- Versión azul principal
- Versión verde alternativa
- Versión dorada premium
- Versión monocromática (para fondos)

QUE SEA:
- ✅ Reconocible instantáneamente
- ✅ Escalable a cualquier tamaño
- ✅ Único y memorable
- ✅ Profesional y confiable
- ✅ Compatible con ambas tiendas
- ✅ Moderno y atemporal

INSPIRACIÓN: Mint, YNAB, Personal Capital, pero ÚNICO para FinanzasFácil.

¡Crea algo ESPECTACULAR que destaque en las tiendas!
```

---

## 🚀 **Pasos para usar:**

1. **Copia el prompt completo** (arriba)
2. **Ve a Gemini Pro** (gemini.google.com)
3. **Pega el prompt**
4. **Descarga los logos generados**
5. **Colócalos en public/logos/**
6. **Ejecuta el script** para generar todos los assets

---

## 📋 **Archivos que necesitas descargar:**

```
public/logos/
├── logo-principal.png (1024x1024)
├── logo-icono.png (1024x1024, solo icono)
├── logo-horizontal.png (1024x512, con texto)
├── logo-vertical.png (512x1024, con texto)
└── favicon.png (32x32)
```

---

## 🎯 **Una vez descargados:**

```bash
# Ejecutar el script para generar todos los assets
./scripts/update_logos.sh process
```

¡Esto generará automáticamente todos los tamaños necesarios para iOS, Android y Web! 🚀
