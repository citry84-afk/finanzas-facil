#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "📂 CI_WORKSPACE: ${CI_WORKSPACE:-no definido}"
echo "📂 Directorio inicial: $(pwd)"

# Usar CI_WORKSPACE si está disponible
if [ -n "$CI_WORKSPACE" ]; then
    echo "📂 Usando CI_WORKSPACE"
    cd "$CI_WORKSPACE" || exit 1
else
    echo "📂 Navegando desde script..."
    cd "$(dirname "$0")/../../.." || exit 1
fi

echo "📂 Directorio actual: $(pwd)"

# Instalar dependencias de npm
echo "=========================================="
echo "📦 Instalando npm dependencies..."
echo "=========================================="

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: npm no encontrado"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "❌ Error: npm install falló"
    exit 1
fi

echo "✅ npm install completado"

# Sincronizar Capacitor (esto prepara los archivos necesarios para pod install)
echo "=========================================="
echo "🔄 Sincronizando Capacitor..."
echo "=========================================="

if command -v npx >/dev/null 2>&1; then
    npx cap sync ios || echo "⚠️  cap sync ios falló, continuando..."
else
    echo "⚠️  npx no encontrado, saltando cap sync"
fi

# Navegar al directorio del Podfile
echo "=========================================="
echo "📂 Navegando a ios/App..."
echo "=========================================="

cd ios/App || exit 1
echo "📂 Directorio actual: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile no encontrado"
    ls -la || true
    exit 1
fi

echo "✅ Podfile encontrado"

# Buscar e instalar CocoaPods si es necesario
echo "=========================================="
echo "🔍 Buscando CocoaPods..."
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

echo "✅ CocoaPods encontrado: $(which pod)"

# Limpiar Pods previos
if [ -d "Pods" ]; then
    echo "🧹 Limpiando Pods previos..."
    rm -rf Pods
fi

# Ejecutar pod install
echo "=========================================="
echo "📦 Ejecutando pod install..."
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
    echo "📂 Contenido del directorio:"
    ls -la || true
    exit 1
fi

echo "✅ pod install completado"

# Verificar que se generaron los archivos .xcconfig
echo "=========================================="
echo "🔍 Verificando archivos .xcconfig..."
echo "=========================================="

RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -d "Pods" ]; then
    echo "❌ Error: Directorio Pods no existe"
    exit 1
fi

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Verificando estructura:"
    if [ -d "Pods/Target Support Files" ]; then
        echo "✅ Directorio 'Target Support Files' existe"
        ls -la "Pods/Target Support Files/" || true
        if [ -d "Pods/Target Support Files/Pods-App" ]; then
            echo "✅ Directorio 'Pods-App' existe"
            ls -la "Pods/Target Support Files/Pods-App/" || true
        else
            echo "❌ Directorio 'Pods-App' no existe"
        fi
    else
        echo "❌ Directorio 'Target Support Files' no existe"
    fi
    exit 1
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "=========================================="
echo "✅ Post-clone script completado exitosamente"
echo "=========================================="

exit 0
