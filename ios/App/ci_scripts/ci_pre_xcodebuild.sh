#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build
# NOTA: pod install ya se ejecutó en ci_post_clone.sh

echo "🔧 Xcode Cloud: Pre-build script (verificación)"

# Navegar al directorio del Podfile
cd "$(dirname "$0")/.." || exit 1

# Verificar que los Pods están instalados
if [ ! -d "Pods" ]; then
    echo "⚠️  Advertencia: Directorio Pods no existe, ejecutando pod install..."
    pod install || exit 1
fi

echo "✅ Pre-build script completado"
exit 0
