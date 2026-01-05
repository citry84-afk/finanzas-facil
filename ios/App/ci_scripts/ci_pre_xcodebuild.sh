#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Ubicación: ios/App/ci_scripts/ci_pre_xcodebuild.sh

echo "=========================================="
echo "🔧 Xcode Cloud: Iniciando pre-build script"
echo "=========================================="

# Xcode Cloud ejecuta el script desde ci_scripts/
# Necesitamos navegar al directorio donde está el Podfile (un nivel arriba)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PODFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📂 Navegando a: $PODFILE_DIR"
cd "$PODFILE_DIR" || {
    echo "❌ Error: No se pudo cambiar al directorio"
    exit 1
}

# Verificar que existe el Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile"
    exit 1
fi

echo "✅ Podfile encontrado"

# Buscar CocoaPods en ubicaciones comunes
POD_CMD=""
if command -v pod >/dev/null 2>&1; then
    POD_CMD="pod"
elif [ -f "/usr/local/bin/pod" ]; then
    POD_CMD="/usr/local/bin/pod"
elif [ -f "/opt/homebrew/bin/pod" ]; then
    POD_CMD="/opt/homebrew/bin/pod"
else
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    if command -v pod >/dev/null 2>&1; then
        POD_CMD="pod"
    fi
fi

if [ -z "$POD_CMD" ]; then
    echo "❌ Error: CocoaPods no está disponible"
    exit 1
fi

echo "✅ Usando CocoaPods: $POD_CMD"

# Instalar dependencias de CocoaPods
echo "=========================================="
echo "📦 Instalando dependencias de CocoaPods..."
echo "=========================================="

# Ejecutar pod install (sin --repo-update primero para ser más rápido)
if $POD_CMD install; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "⚠️  'pod install' falló, intentando con --repo-update..."
    if $POD_CMD install --repo-update; then
        echo "✅ Dependencias instaladas correctamente"
    else
        echo "❌ Error: 'pod install' falló"
        exit 1
    fi
fi

# Verificar que se creó el archivo .xcconfig crítico
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    exit 1
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "✅ Pre-build script completado exitosamente"
echo "=========================================="

exit 0
