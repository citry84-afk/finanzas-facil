#!/bin/bash

# Script de verificación para cambios de AdSense
# Verifica que todos los cambios estén aplicados correctamente

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║        🔍 VERIFICACIÓN DE CAMBIOS PARA ADSENSE              ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Verificar que el código está actualizado
echo "📦 1. Verificando código local..."
if grep -q "Botones de Autenticación - OCULTOS temporalmente" src/App.tsx; then
    echo "   ✅ Botones de login OCULTOS correctamente"
else
    echo "   ❌ ERROR: Botones de login NO están ocultos"
    exit 1
fi

# 2. Verificar que el build existe
echo ""
echo "🏗️  2. Verificando build..."
if [ -d "dist" ]; then
    echo "   ✅ Directorio dist/ existe"
    if [ -f "dist/index.html" ]; then
        echo "   ✅ Build generado correctamente"
    else
        echo "   ❌ ERROR: Build incompleto"
        exit 1
    fi
else
    echo "   ❌ ERROR: No hay build"
    exit 1
fi

# 3. Verificar APK Android
echo ""
echo "📱 3. Verificando APK Android..."
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(ls -lh "$APK_PATH" | awk '{print $5}')
    echo "   ✅ APK generado: $APK_SIZE"
else
    echo "   ⚠️  WARNING: APK no encontrado (ejecuta: ./gradlew assembleDebug)"
fi

# 4. Verificar documentación
echo ""
echo "📄 4. Verificando documentación..."
DOCS=(
    "README-ADSENSE-URGENTE.md"
    "RESUMEN-EJECUTIVO-CAMBIOS.md"
    "INSTRUCCIONES-FIREBASE-PUBLICO.txt"
    "docs/ADSENSE-APROBACION-PASOS-FINALES.md"
    "docs/FIREBASE-REGLAS-PUBLICAS.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✅ $doc"
    else
        echo "   ❌ Falta: $doc"
    fi
done

# 5. Verificar estado de Git
echo ""
echo "🔄 5. Verificando Git..."
if git diff-index --quiet HEAD --; then
    echo "   ✅ Sin cambios pendientes"
    LAST_COMMIT=$(git log -1 --pretty=format:"%s")
    echo "   📝 Último commit: $LAST_COMMIT"
else
    echo "   ⚠️  Hay cambios sin commitear"
fi

# 6. Verificar conexión a Internet
echo ""
echo "🌐 6. Verificando conectividad..."
if ping -c 1 google.com &> /dev/null; then
    echo "   ✅ Conexión a Internet OK"
    
    # Verificar si el sitio está accesible
    if curl -s -o /dev/null -w "%{http_code}" https://finanzasmuyfaciles.netlify.app | grep -q "200"; then
        echo "   ✅ Sitio web accesible"
    else
        echo "   ⚠️  Sitio web no responde (puede estar desplegándose)"
    fi
else
    echo "   ❌ Sin conexión a Internet"
fi

# Resumen final
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                     ✅ VERIFICACIÓN COMPLETA                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🎯 PRÓXIMOS PASOS:"
echo ""
echo "1. Actualizar Firebase Rules:"
echo "   👉 https://console.firebase.google.com/project/finanzas-facil-fe8eb/firestore/rules"
echo ""
echo "2. Verificar sitio web (en 5 minutos):"
echo "   👉 https://finanzasmuyfaciles.netlify.app"
echo ""
echo "3. Re-solicitar AdSense:"
echo "   👉 https://www.google.com/adsense/"
echo ""
echo "📚 Lee: README-ADSENSE-URGENTE.md para instrucciones completas"
echo ""

