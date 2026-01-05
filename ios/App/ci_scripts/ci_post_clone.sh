#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio
# Apple recomienda instalar dependencias aquí, no en ci_pre_xcodebuild.sh

echo "🔧 Xcode Cloud: Iniciando post-clone script"

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
    
    # Si aún no está disponible, intentar instalar
    if ! command -v pod >/dev/null 2>&1; then
        if command -v brew >/dev/null 2>&1; then
            echo "📦 Instalando CocoaPods con Homebrew..."
            brew install cocoapods
        elif command -v gem >/dev/null 2>&1; then
            echo "📦 Instalando CocoaPods con gem..."
            gem install cocoapods --no-document
            export PATH="$HOME/.gem/ruby/*/bin:$PATH"
        fi
    fi
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
pod install || pod install --repo-update || {
    echo "❌ Error: pod install falló"
    exit 1
}

echo "✅ Post-clone script completado exitosamente"
exit 0
