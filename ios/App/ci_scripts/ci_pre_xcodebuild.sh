#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build

echo "🔧 Xcode Cloud: Pre-build script"

# Navegar al directorio del Podfile
cd "$(dirname "$0")/.." || exit 1

# Verificar que los Pods están instalados
if [ ! -d "Pods" ]; then
    echo "⚠️  Pods no encontrados, ejecutando pod install..."
    if command -v pod >/dev/null 2>&1; then
        pod install || pod install --repo-update || true
    else
        export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
        pod install || pod install --repo-update || true
    fi
fi

echo "✅ Pre-build script completado"
exit 0
