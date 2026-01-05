#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

set -e  # Salir inmediatamente si cualquier comando falla

echo "🔧 Xcode Cloud: Post-clone script iniciado"

# Usar CI_WORKSPACE si está disponible
if [ -n "$CI_WORKSPACE" ]; then
    cd "$CI_WORKSPACE"
else
    cd "$(dirname "$0")/../../.."
fi

echo "📂 Directorio raíz: $(pwd)"

# Paso 1: npm install
echo "📦 npm install"
npm install
echo "✅ npm install completado"

# Paso 2: npm run build
echo "🏗️  npm run build"
npm run build
echo "✅ Build completado"

# Paso 3: cap sync ios
echo "🔄 cap sync ios"
npx cap sync ios
echo "✅ Capacitor sincronizado"

# Paso 4: Navegar a ios/App
cd ios/App
echo "📂 Directorio: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile no encontrado"
    exit 1
fi

# Paso 5: Verificar/instalar CocoaPods
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

# Paso 6: Limpiar Pods previos
if [ -d "Pods" ]; then
    echo "🧹 Limpiando Pods previos..."
    rm -rf Pods
fi

# Paso 7: pod install
echo "📦 pod install"
pod install || pod install --repo-update
echo "✅ pod install completado"

# Paso 8: Verificar .xcconfig
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: $RELEASE_CONFIG no existe"
    echo "📂 Debug:"
    find Pods -name "*.xcconfig" 2>/dev/null | head -5 || echo "  - No se encontraron .xcconfig"
    exit 1
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "✅ Post-clone script completado exitosamente"
exit 0
