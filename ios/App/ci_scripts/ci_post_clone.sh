#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

echo "=========================================="
echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "=========================================="

# Navegar a la raíz del repositorio
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "📂 Directorio del script: $SCRIPT_DIR"
echo "📂 Raíz del repositorio: $REPO_ROOT"

cd "$REPO_ROOT" || {
    echo "❌ Error: No se pudo navegar a la raíz del repositorio"
    exit 1
}

echo "📂 Directorio actual: $(pwd)"

# Instalar dependencias de npm primero (necesario para Capacitor)
echo "=========================================="
echo "📦 Instalando dependencias de npm..."
echo "=========================================="

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: npm no encontrado"
    exit 1
fi

npm install
NPM_EXIT=$?

if [ $NPM_EXIT -ne 0 ]; then
    echo "❌ Error: npm install falló con código $NPM_EXIT"
    exit 1
fi

echo "✅ npm install completado"

# Navegar al directorio del Podfile
echo "=========================================="
echo "📂 Navegando a ios/App..."
echo "=========================================="

cd ios/App || {
    echo "❌ Error: No se pudo navegar a ios/App"
    exit 1
}

echo "📂 Directorio actual: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile en $(pwd)"
    ls -la || true
    exit 1
fi

echo "✅ Podfile encontrado"

# Buscar pod
echo "=========================================="
echo "🔍 Buscando CocoaPods..."
echo "=========================================="

POD_CMD=""
if command -v pod >/dev/null 2>&1; then
    POD_CMD="pod"
    echo "✅ CocoaPods encontrado en PATH: $(which pod)"
elif [ -f "/usr/local/bin/pod" ]; then
    POD_CMD="/usr/local/bin/pod"
    echo "✅ CocoaPods encontrado en /usr/local/bin/pod"
elif [ -f "/opt/homebrew/bin/pod" ]; then
    POD_CMD="/opt/homebrew/bin/pod"
    echo "✅ CocoaPods encontrado en /opt/homebrew/bin/pod"
else
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    if command -v pod >/dev/null 2>&1; then
        POD_CMD="pod"
        echo "✅ CocoaPods encontrado después de actualizar PATH"
    else
        # Intentar instalar CocoaPods
        echo "⚠️  CocoaPods no encontrado, intentando instalar..."
        if command -v brew >/dev/null 2>&1; then
            echo "📦 Instalando CocoaPods con Homebrew..."
            brew install cocoapods
            POD_CMD="pod"
        elif command -v gem >/dev/null 2>&1; then
            echo "📦 Instalando CocoaPods con gem..."
            gem install cocoapods --no-document
            export PATH="$HOME/.gem/ruby/*/bin:$PATH"
            POD_CMD="pod"
        fi
    fi
fi

if [ -z "$POD_CMD" ] || ! command -v "$POD_CMD" >/dev/null 2>&1; then
    echo "❌ Error: CocoaPods no está disponible"
    echo "📂 PATH actual: $PATH"
    exit 1
fi

echo "✅ Usando CocoaPods: $(which $POD_CMD)"
echo "📦 Versión: $($POD_CMD --version 2>/dev/null || echo 'desconocida')"

# Limpiar instalación previa si existe
if [ -d "Pods" ]; then
    echo "🧹 Limpiando instalación previa de Pods..."
    rm -rf Pods
fi

# Ejecutar pod install
echo "=========================================="
echo "📦 Ejecutando pod install..."
echo "=========================================="

$POD_CMD install
POD_EXIT=$?

# Si falla, intentar con --repo-update
if [ $POD_EXIT -ne 0 ]; then
    echo "⚠️  pod install falló con código $POD_EXIT, reintentando con --repo-update..."
    $POD_CMD install --repo-update
    POD_EXIT=$?
fi

if [ $POD_EXIT -ne 0 ]; then
    echo "❌ Error: pod install falló con código $POD_EXIT"
    echo "📂 Contenido del directorio:"
    ls -la || true
    exit 1
fi

echo "✅ pod install completado"

# Verificar que se generaron los archivos .xcconfig críticos
echo "=========================================="
echo "🔍 Verificando archivos .xcconfig..."
echo "=========================================="

RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
DEBUG_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig"

if [ ! -d "Pods" ]; then
    echo "❌ Error: El directorio Pods no existe"
    exit 1
fi

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Verificando estructura de Pods:"
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

if [ ! -f "$DEBUG_CONFIG" ]; then
    echo "⚠️  Advertencia: No se generó $DEBUG_CONFIG (puede ser normal)"
else
    echo "✅ $DEBUG_CONFIG encontrado"
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "=========================================="
echo "✅ Post-clone script completado exitosamente"
echo "=========================================="

exit 0
