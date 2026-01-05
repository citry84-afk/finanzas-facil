#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build

echo "🔧 Xcode Cloud: Pre-build script"

# Navegar al directorio del Podfile
cd "$(dirname "$0")/.." || exit 1

# Verificar que los Pods están instalados
if [ ! -d "Pods" ]; then
    echo "⚠️  Pods no encontrados, ejecutando pod install..."
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    pod install || pod install --repo-update || {
        echo "❌ Error: No se pudieron instalar los Pods"
        exit 1
    }
fi

# Verificar archivo .xcconfig crítico
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: $RELEASE_CONFIG no existe"
    echo "📦 Reinstalando Pods..."
    rm -rf Pods
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    pod install || pod install --repo-update || {
        echo "❌ Error: No se pudieron instalar los Pods"
        exit 1
    }
    
    # Verificar nuevamente
    if [ ! -f "$RELEASE_CONFIG" ]; then
        echo "❌ Error: $RELEASE_CONFIG aún no existe después de reinstalar"
        exit 1
    fi
fi

echo "✅ Pre-build script completado"
exit 0
