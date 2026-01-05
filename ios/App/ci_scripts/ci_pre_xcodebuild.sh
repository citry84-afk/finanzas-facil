#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Ubicación: ios/App/ci_scripts/ci_pre_xcodebuild.sh
# NOTA: Xcode Cloud ejecuta este script desde el directorio ci_scripts

# NO usar set -e aquí, queremos manejar errores manualmente
# set -e

echo "=========================================="
echo "🔧 Xcode Cloud: Iniciando pre-build script"
echo "=========================================="
echo "📂 Directorio actual (donde se ejecuta el script): $(pwd)"
echo "📂 Usuario: $(whoami)"
echo "📂 PATH: $PATH"

# Xcode Cloud ejecuta el script desde ci_scripts/
# Necesitamos navegar al directorio donde está el Podfile (un nivel arriba)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "📂 Directorio del script: $SCRIPT_DIR"

# El Podfile está en ios/App/, que es un nivel arriba de ci_scripts/
PODFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
echo "📂 Directorio del Podfile: $PODFILE_DIR"

# Cambiar al directorio donde está el Podfile
if ! cd "$PODFILE_DIR"; then
    echo "❌ Error: No se pudo cambiar al directorio $PODFILE_DIR"
    echo "📂 Directorio actual: $(pwd)"
    echo "📂 Contenido del directorio actual:"
    ls -la || true
    exit 1
fi

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
# En Xcode Cloud, CocoaPods puede estar preinstalado o necesitar instalación
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
    echo "⚠️  CocoaPods no encontrado, intentando instalar..."
    
    # Intentar instalar con gem
    if command -v gem >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods con gem..."
        if gem install cocoapods --no-document; then
            # Después de instalar, buscar pod
            if command -v pod >/dev/null 2>&1; then
                POD_CMD="pod"
            elif [ -f "$HOME/.gem/ruby/*/bin/pod" ]; then
                POD_CMD="$(find $HOME/.gem/ruby -name pod -type f 2>/dev/null | head -1)"
            else
                # Añadir gem bin al PATH
                export PATH="$HOME/.gem/ruby/*/bin:$PATH"
                if command -v pod >/dev/null 2>&1; then
                    POD_CMD="pod"
                fi
            fi
        else
            echo "❌ Error: No se pudo instalar CocoaPods con gem"
            exit 1
        fi
    else
        echo "❌ Error: No se encontró 'gem' para instalar CocoaPods"
        echo "💡 Xcode Cloud debería tener CocoaPods preinstalado"
        exit 1
    fi
fi

if [ -z "$POD_CMD" ]; then
    echo "❌ Error: No se pudo encontrar o instalar CocoaPods"
    exit 1
fi

echo "✅ Usando CocoaPods: $POD_CMD"
echo "📦 Versión de CocoaPods: $($POD_CMD --version 2>/dev/null || echo 'desconocida')"

# Limpiar instalación previa si existe (opcional, pero puede ayudar)
if [ -d "Pods" ]; then
    echo "🧹 Limpiando instalación previa de Pods..."
    rm -rf Pods
fi

# Instalar dependencias de CocoaPods
echo "=========================================="
echo "📦 Instalando dependencias de CocoaPods..."
echo "=========================================="

# Intentar pod install con diferentes opciones
INSTALL_SUCCESS=0

# Primero intentar con --repo-update
echo "💡 Intentando 'pod install --repo-update'..."
if $POD_CMD install --repo-update 2>&1; then
    INSTALL_SUCCESS=1
    echo "✅ 'pod install --repo-update' completado exitosamente"
else
    echo "⚠️  'pod install --repo-update' falló, intentando sin --repo-update..."
    # Intentar sin --repo-update
    if $POD_CMD install 2>&1; then
        INSTALL_SUCCESS=1
        echo "✅ 'pod install' completado exitosamente"
    else
        echo "❌ Error: 'pod install' también falló"
        echo "📂 Contenido del directorio después del fallo:"
        ls -la || true
        echo "📂 Verificando si existe Podfile.lock:"
        [ -f "Podfile.lock" ] && echo "✅ Podfile.lock existe" || echo "❌ Podfile.lock no existe"
        echo "📂 Verificando si existe directorio Pods:"
        [ -d "Pods" ] && echo "✅ Directorio Pods existe" || echo "❌ Directorio Pods no existe"
        exit 1
    fi
fi

if [ $INSTALL_SUCCESS -eq 0 ]; then
    echo "❌ Error: No se pudo instalar las dependencias de CocoaPods"
    exit 1
fi

echo "✅ Dependencias instaladas"

# Verificar que se crearon los archivos .xcconfig críticos
echo "=========================================="
echo "🔍 Verificando archivos generados..."
echo "=========================================="

RELEASE_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
DEBUG_CONFIG="Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig"

# Verificar que existe el directorio Pods
if [ ! -d "Pods" ]; then
    echo "❌ Error: El directorio Pods no fue creado"
    exit 1
fi

# Verificar archivo release (crítico)
if [ ! -f "$RELEASE_CONFIG" ]; then
    echo "❌ Error: No se generó $RELEASE_CONFIG"
    echo "📂 Contenido de Pods/Target Support Files/Pods-App/:"
    if [ -d "Pods/Target Support Files/Pods-App/" ]; then
        ls -la "Pods/Target Support Files/Pods-App/" || true
    else
        echo "Directorio no existe"
    fi
    echo "📂 Contenido de Pods/Target Support Files/:"
    if [ -d "Pods/Target Support Files/" ]; then
        ls -la "Pods/Target Support Files/" || true
    else
        echo "Directorio no existe"
    fi
    exit 1
fi

# Verificar archivo debug (no crítico, pero útil)
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

# Asegurarse de salir con código 0 (éxito)
exit 0
