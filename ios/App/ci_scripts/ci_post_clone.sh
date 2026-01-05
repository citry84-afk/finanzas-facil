#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "📂 CI_WORKSPACE: ${CI_WORKSPACE:-no definido}"

# Usar CI_WORKSPACE si está disponible
if [ -n "$CI_WORKSPACE" ]; then
    cd "$CI_WORKSPACE" || exit 1
else
    cd "$(dirname "$0")/../../.." || exit 1
fi

echo "📂 Directorio actual: $(pwd)"

# Instalar dependencias de npm
echo "📦 Instalando npm dependencies..."
if command -v npm >/dev/null 2>&1; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: npm install falló"
        exit 1
    fi
    echo "✅ npm install completado"
else
    echo "❌ Error: npm no encontrado"
    exit 1
fi

# Navegar al directorio del Podfile
cd ios/App || exit 1
echo "📂 Directorio Podfile: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile no encontrado"
    exit 1
fi

# Buscar e instalar CocoaPods si es necesario
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if ! command -v pod >/dev/null 2>&1; then
    echo "📦 Instalando CocoaPods..."
    if command -v brew >/dev/null 2>&1; then
        brew install cocoapods
    elif command -v gem >/dev/null 2>&1; then
        gem install cocoapods --no-document
    else
        echo "❌ Error: No se puede instalar CocoaPods"
        exit 1
    fi
fi

# Limpiar Pods previos
if [ -d "Pods" ]; then
    echo "🧹 Limpiando Pods previos..."
    rm -rf Pods
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
pod install

if [ $? -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    pod install --repo-update
    if [ $? -ne 0 ]; then
        echo "❌ Error: pod install falló"
        exit 1
    fi
fi

# Verificar que se generaron los archivos .xcconfig
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Verificando estructura:"
    ls -la "Pods/Target Support Files/" 2>/dev/null || echo "Directorio no existe"
    exit 1
fi

echo "✅ Post-clone script completado exitosamente"
exit 0
