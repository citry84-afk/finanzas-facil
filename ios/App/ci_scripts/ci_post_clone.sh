#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

set +e  # No salir inmediatamente - queremos manejar errores manualmente

echo "=========================================="
echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "=========================================="

# Usar CI_WORKSPACE si está disponible
if [ -n "$CI_WORKSPACE" ]; then
    cd "$CI_WORKSPACE" || exit 1
else
    cd "$(dirname "$0")/../../.." || exit 1
fi

echo "📂 Directorio raíz: $(pwd)"

# Paso 1: npm install
echo "=========================================="
echo "📦 Paso 1: npm install"
echo "=========================================="

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

# Paso 2: npm run build (necesario para Capacitor)
echo "=========================================="
echo "🏗️  Paso 2: npm run build"
echo "=========================================="

npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error: npm run build falló"
    exit 1
fi
echo "✅ Build completado"

# Paso 3: cap sync ios
echo "=========================================="
echo "🔄 Paso 3: cap sync ios"
echo "=========================================="

if command -v npx >/dev/null 2>&1; then
    npx cap sync ios
    if [ $? -ne 0 ]; then
        echo "❌ Error: cap sync ios falló"
        exit 1
    fi
    echo "✅ Capacitor sincronizado"
else
    echo "❌ Error: npx no encontrado"
    exit 1
fi

# Paso 4: Navegar a ios/App
echo "=========================================="
echo "📂 Paso 4: Navegando a ios/App"
echo "=========================================="

cd ios/App || {
    echo "❌ Error: No se pudo navegar a ios/App"
    exit 1
}

echo "📂 Directorio actual: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile no encontrado"
    exit 1
fi

# Paso 5: Instalar/verificar CocoaPods
echo "=========================================="
echo "📦 Paso 5: Verificando CocoaPods"
echo "=========================================="

export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if ! command -v pod >/dev/null 2>&1; then
    echo "📦 Instalando CocoaPods..."
    if command -v brew >/dev/null 2>&1; then
        brew install cocoapods || exit 1
    elif command -v gem >/dev/null 2>&1; then
        gem install cocoapods --no-document || exit 1
    else
        echo "❌ Error: No se puede instalar CocoaPods"
        exit 1
    fi
fi

echo "✅ CocoaPods: $(which pod) ($(pod --version 2>/dev/null || echo 'versión desconocida'))"

# Paso 6: Limpiar Pods previos
if [ -d "Pods" ]; then
    echo "🧹 Limpiando Pods previos..."
    rm -rf Pods
fi

# Paso 7: pod install
echo "=========================================="
echo "📦 Paso 7: pod install"
echo "=========================================="

pod install
POD_EXIT=$?

if [ $POD_EXIT -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    pod install --repo-update
    POD_EXIT=$?
fi

if [ $POD_EXIT -ne 0 ]; then
    echo "❌ Error: pod install falló con código $POD_EXIT"
    echo "📂 Debug info:"
    echo "   - Directorio: $(pwd)"
    echo "   - Podfile existe: $([ -f Podfile ] && echo 'sí' || echo 'no')"
    echo "   - node_modules existe: $([ -d ../../node_modules ] && echo 'sí' || echo 'no')"
    ls -la ../../node_modules/@capacitor/ios 2>/dev/null | head -5 || echo "   - Capacitor iOS no encontrado"
    exit 1
fi

echo "✅ pod install completado"

# Paso 8: Verificar archivos .xcconfig
echo "=========================================="
echo "🔍 Paso 8: Verificando .xcconfig"
echo "=========================================="

RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: $RELEASE_CONFIG no existe"
    echo "📂 Estructura de Pods:"
    if [ -d "Pods" ]; then
        find Pods -name "*.xcconfig" -type f 2>/dev/null | head -10 || echo "   - No se encontraron archivos .xcconfig"
    else
        echo "   - Directorio Pods no existe"
    fi
    exit 1
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "=========================================="
echo "✅ Post-clone script completado exitosamente"
echo "=========================================="

exit 0
