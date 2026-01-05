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

# Verificar si CocoaPods ya está instalado
if command -v pod >/dev/null 2>&1; then
    echo "✅ CocoaPods ya está instalado: $(which pod)"
    echo "📦 Versión: $(pod --version)"
    exit 0
fi

# Buscar en ubicaciones comunes
if [ -f "/usr/local/bin/pod" ] || [ -f "/opt/homebrew/bin/pod" ]; then
    echo "✅ CocoaPods encontrado en ubicación estándar"
    exit 0
fi

echo "⚠️  CocoaPods no encontrado, instalando..."

# Intentar instalar con Homebrew (método recomendado por Apple)
if command -v brew >/dev/null 2>&1; then
    echo "📦 Instalando CocoaPods con Homebrew..."
    if brew install cocoapods; then
        echo "✅ CocoaPods instalado con Homebrew"
        exit 0
    else
        echo "⚠️  Homebrew falló, intentando con gem..."
    fi
fi

# Si Homebrew no está disponible o falló, intentar con gem
if command -v gem >/dev/null 2>&1; then
    echo "📦 Instalando CocoaPods con gem..."
    if gem install cocoapods --no-document; then
        echo "✅ CocoaPods instalado con gem"
        # Añadir gem bin al PATH
        export PATH="$HOME/.gem/ruby/*/bin:$PATH"
        exit 0
    else
        echo "❌ Error: No se pudo instalar CocoaPods con gem"
        exit 1
    fi
else
    echo "❌ Error: No se encontró 'brew' ni 'gem' para instalar CocoaPods"
    echo "💡 Xcode Cloud debería tener CocoaPods preinstalado o herramientas de instalación"
    exit 1
fi
