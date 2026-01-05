#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio
# Ubicación: ios/App/ci_scripts/ci_post_clone.sh
# NOTA: Xcode Cloud ejecuta este script desde el directorio ci_scripts

echo "=========================================="
echo "🔧 Xcode Cloud: Iniciando post-clone script"
echo "=========================================="
echo "📂 Directorio actual: $(pwd)"

# Xcode Cloud ejecuta el script desde ci_scripts/
# Necesitamos navegar al directorio donde está el Podfile (un nivel arriba)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PODFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📂 Directorio del script: $SCRIPT_DIR"
echo "📂 Directorio del Podfile: $PODFILE_DIR"

# Cambiar al directorio donde está el Podfile
cd "$PODFILE_DIR" || {
    echo "❌ Error: No se pudo cambiar al directorio $PODFILE_DIR"
    exit 1
}

echo "📂 Directorio de trabajo: $(pwd)"

# Verificar que CocoaPods está instalado
# En Xcode Cloud, CocoaPods puede estar preinstalado
POD_CMD=""
if command -v pod >/dev/null 2>&1; then
    POD_CMD="pod"
    echo "✅ CocoaPods ya está instalado: $(which pod)"
    echo "📦 Versión: $(pod --version)"
elif [ -f "/usr/local/bin/pod" ]; then
    POD_CMD="/usr/local/bin/pod"
    echo "✅ CocoaPods encontrado en /usr/local/bin/pod"
elif [ -f "/opt/homebrew/bin/pod" ]; then
    POD_CMD="/opt/homebrew/bin/pod"
    echo "✅ CocoaPods encontrado en /opt/homebrew/bin/pod"
else
    echo "⚠️  CocoaPods no encontrado, instalando..."
    
    # Intentar instalar con Homebrew (método recomendado por Apple)
    if command -v brew >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods con Homebrew..."
        brew install cocoapods
        POD_CMD="pod"
    # Si Homebrew no está disponible, intentar con gem
    elif command -v gem >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods con gem..."
        gem install cocoapods --no-document
        # Añadir gem bin al PATH
        export PATH="$HOME/.gem/ruby/*/bin:$PATH"
        POD_CMD="pod"
    else
        echo "❌ Error: No se encontró 'brew' ni 'gem' para instalar CocoaPods"
        exit 1
    fi
fi

if [ -z "$POD_CMD" ] || ! command -v "$POD_CMD" >/dev/null 2>&1; then
    echo "❌ Error: No se pudo encontrar o instalar CocoaPods"
    exit 1
fi

echo "✅ CocoaPods disponible: $(which $POD_CMD)"
echo "📦 Versión: $($POD_CMD --version)"

echo "=========================================="
echo "✅ Post-clone script completado exitosamente"
echo "=========================================="

exit 0
