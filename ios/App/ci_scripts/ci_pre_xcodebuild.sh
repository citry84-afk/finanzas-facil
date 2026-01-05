#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud

# Desactivar salida inmediata en caso de error para mejor debugging
set +e

echo "🔧 Xcode Cloud: Iniciando pre-build script"

# Navegar al directorio del Podfile
cd "$(dirname "$0")/.." || {
    echo "❌ Error: No se pudo cambiar al directorio"
    exit 1
}

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile"
    exit 1
fi

# Buscar pod en ubicaciones estándar
if ! command -v pod >/dev/null 2>&1; then
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
pod install

# Si falla, intentar con --repo-update
if [ $? -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    pod install --repo-update
fi

# Verificar resultado final
if [ $? -eq 0 ]; then
    echo "✅ Pre-build script completado exitosamente"
    exit 0
else
    echo "❌ Error: pod install falló"
    exit 1
fi
