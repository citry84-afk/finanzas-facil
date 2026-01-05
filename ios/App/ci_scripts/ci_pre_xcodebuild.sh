#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Ubicación: ios/App/ci_scripts/ci_pre_xcodebuild.sh

echo "🔧 Xcode Cloud: Iniciando pre-build script"

# Xcode Cloud ejecuta el script desde ci_scripts/
# Necesitamos navegar al directorio donde está el Podfile (un nivel arriba)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PODFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PODFILE_DIR" || exit 1

# Verificar que existe el Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile"
    exit 1
fi

# Buscar CocoaPods
POD_CMD=""
if command -v pod >/dev/null 2>&1; then
    POD_CMD="pod"
elif [ -f "/usr/local/bin/pod" ]; then
    POD_CMD="/usr/local/bin/pod"
elif [ -f "/opt/homebrew/bin/pod" ]; then
    POD_CMD="/opt/homebrew/bin/pod"
else
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    POD_CMD="pod"
fi

# Instalar dependencias de CocoaPods
echo "📦 Instalando dependencias de CocoaPods..."
$POD_CMD install || $POD_CMD install --repo-update || {
    echo "❌ Error: 'pod install' falló"
    exit 1
}

echo "✅ Pre-build script completado exitosamente"
exit 0
