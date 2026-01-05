#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Ubicación: ios/App/ci_scripts/ci_pre_xcodebuild.sh

set -e  # Salir si cualquier comando falla

echo "=========================================="
echo "🔧 Xcode Cloud: Iniciando pre-build script"
echo "=========================================="
echo "📂 Directorio actual: $(pwd)"
echo "📂 Usuario: $(whoami)"
echo "📂 PATH: $PATH"

# El script se ejecuta desde la raíz del repositorio en Xcode Cloud
# Necesitamos navegar al directorio donde está el Podfile
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "📂 Directorio del script: $SCRIPT_DIR"
echo "📂 Raíz del repositorio: $REPO_ROOT"

# Navegar al directorio donde está el Podfile
cd "$REPO_ROOT/ios/App" || {
    echo "❌ Error: No se pudo cambiar al directorio ios/App"
    echo "📂 Directorio actual: $(pwd)"
    echo "📂 Contenido del directorio actual:"
    ls -la || true
    exit 1
}

echo "📂 Directorio de trabajo (después de cd): $(pwd)"

# Verificar que existe el Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile en $(pwd)"
    echo "📂 Contenido del directorio:"
    ls -la || true
    exit 1
fi

echo "✅ Podfile encontrado"

# Verificar que CocoaPods está instalado
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods no encontrado en PATH, intentando instalar..."
    # En Xcode Cloud, Ruby y gem pueden estar en ubicaciones específicas
    if command -v gem &> /dev/null; then
        echo "📦 Instalando CocoaPods con gem..."
        gem install cocoapods || {
            echo "❌ Error: No se pudo instalar CocoaPods con gem"
            exit 1
        }
    else
        echo "❌ Error: No se encontró 'gem' para instalar CocoaPods"
        echo "💡 Intentando usar pod directamente..."
        # En algunos casos, pod puede estar disponible pero no en PATH
        export PATH="/usr/local/bin:$PATH"
        if ! command -v pod &> /dev/null; then
            echo "❌ Error: CocoaPods no está disponible"
            exit 1
        fi
    fi
fi

echo "✅ CocoaPods encontrado: $(which pod)"
echo "📦 Versión de CocoaPods: $(pod --version || echo 'desconocida')"

# Limpiar instalación previa si existe (opcional, pero puede ayudar)
if [ -d "Pods" ]; then
    echo "🧹 Limpiando instalación previa de Pods..."
    rm -rf Pods
fi

# Instalar dependencias de CocoaPods
echo "=========================================="
echo "📦 Instalando dependencias de CocoaPods..."
echo "=========================================="

# Usar --repo-update para asegurar que los repos están actualizados
pod install --repo-update || {
    echo "❌ Error: 'pod install --repo-update' falló"
    echo "💡 Intentando sin --repo-update..."
    pod install || {
        echo "❌ Error: 'pod install' también falló"
        echo "📂 Contenido del directorio después del fallo:"
        ls -la || true
        exit 1
    }
}

echo "✅ Dependencias instaladas"

# Verificar que se crearon los archivos .xcconfig críticos
echo "=========================================="
echo "🔍 Verificando archivos generados..."
echo "=========================================="

RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
DEBUG_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Contenido de Pods/Target Support Files/Pods-App/:"
    ls -la "Pods/Target Support Files/Pods-App/" 2>/dev/null || echo "Directorio no existe"
    exit 1
fi

if [ ! -f "$DEBUG_CONFIG" ]; then
    echo "⚠️  Advertencia: No se generó $DEBUG_CONFIG (puede ser normal en algunos casos)"
else
    echo "✅ $DEBUG_CONFIG encontrado"
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "✅ Archivos .xcconfig verificados correctamente"

echo "=========================================="
echo "✅ Pre-build script completado exitosamente"
echo "=========================================="
