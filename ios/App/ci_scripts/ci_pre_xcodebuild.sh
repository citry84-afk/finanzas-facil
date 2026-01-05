#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Ubicación: ios/App/ci_scripts/ci_pre_xcodebuild.sh

set -e  # Salir inmediatamente si cualquier comando falla

echo "=========================================="
echo "🔧 Xcode Cloud: Iniciando pre-build script"
echo "=========================================="

# Xcode Cloud ejecuta el script desde ci_scripts/
# Necesitamos navegar al directorio donde está el Podfile (un nivel arriba)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PODFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "📂 Navegando a: $PODFILE_DIR"
cd "$PODFILE_DIR"

# Verificar que existe el Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile en $(pwd)"
    exit 1
fi

echo "✅ Podfile encontrado"

# Buscar CocoaPods en ubicaciones comunes
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
    fi
fi

if [ -z "$POD_CMD" ]; then
    echo "❌ Error: CocoaPods no está disponible"
    echo "💡 Verifica que ci_post_clone.sh instaló CocoaPods correctamente"
    exit 1
fi

echo "✅ Usando CocoaPods: $POD_CMD"

# Instalar dependencias de CocoaPods
echo "=========================================="
echo "📦 Instalando dependencias de CocoaPods..."
echo "=========================================="

# Ejecutar pod install con manejo de errores explícito
# Desactivar set -e temporalmente para manejar el error manualmente
set +e
$POD_CMD install
POD_EXIT_CODE=$?
set -e

if [ $POD_EXIT_CODE -ne 0 ]; then
    echo "⚠️  'pod install' falló con código $POD_EXIT_CODE, intentando con --repo-update..."
    set +e
    $POD_CMD install --repo-update
    POD_EXIT_CODE=$?
    set -e
    
    if [ $POD_EXIT_CODE -ne 0 ]; then
        echo "❌ Error: 'pod install' falló con código $POD_EXIT_CODE"
        echo "📂 Directorio actual: $(pwd)"
        echo "📂 Verificando contenido del directorio:"
        ls -la || true
        exit 1
    fi
fi

echo "✅ Dependencias instaladas correctamente"

# Verificar que se creó el archivo .xcconfig crítico
RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"

if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Verificando estructura de Pods:"
    if [ -d "Pods" ]; then
        echo "✅ Directorio Pods existe"
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
    else
        echo "❌ Directorio Pods no existe"
    fi
    exit 1
fi

echo "✅ $RELEASE_CONFIG encontrado"
echo "=========================================="
echo "✅ Pre-build script completado exitosamente"
echo "=========================================="

exit 0
