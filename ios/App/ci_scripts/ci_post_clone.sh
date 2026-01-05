#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

echo "🔧 Xcode Cloud: Post-clone script iniciado"

# Navegar a la raíz del repositorio
cd "$(dirname "$0")/../../.." || {
    echo "❌ Error: No se pudo navegar a la raíz del repositorio"
    exit 1
}

echo "📂 Directorio actual: $(pwd)"

# Instalar dependencias de npm primero (necesario para Capacitor)
echo "📦 Instalando dependencias de npm..."
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
cd ios/App || {
    echo "❌ Error: No se pudo navegar a ios/App"
    exit 1
}

echo "📂 Directorio actual: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile en $(pwd)"
    exit 1
fi

echo "✅ Podfile encontrado"

# Buscar pod
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
    else
        # Intentar instalar CocoaPods
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
    exit 1
fi

echo "✅ CocoaPods encontrado: $(which $POD_CMD)"

# Limpiar instalación previa si existe
if [ -d "Pods" ]; then
    echo "🧹 Limpiando instalación previa de Pods..."
    rm -rf Pods
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
$POD_CMD install

# Si falla, intentar con --repo-update
if [ $? -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    $POD_CMD install --repo-update
    if [ $? -ne 0 ]; then
        echo "❌ Error: pod install falló"
        exit 1
    fi
fi

# Verificar que se generaron los archivos .xcconfig críticos
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
DEBUG_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Verificando estructura de Pods:"
    ls -la "Pods/Target Support Files/" 2>/dev/null || echo "Directorio no existe"
    exit 1
fi

if [ ! -f "$DEBUG_CONFIG" ]; then
    echo "⚠️  Advertencia: No se generó $DEBUG_CONFIG"
fi

echo "✅ Archivos .xcconfig generados correctamente"
echo "✅ Post-clone script completado exitosamente"
exit 0
