#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

# NO usar set -e, queremos controlar los errores manualmente
set +e

echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "📂 Directorio inicial: $(pwd)"

# Navegar a la raíz del repositorio
# El script se ejecuta desde ios/App/ci_scripts/
# Necesitamos ir 3 niveles arriba
cd "$(dirname "$0")/../../.." 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Error: No se pudo navegar a la raíz"
    exit 1
fi

echo "📂 Raíz del repositorio: $(pwd)"

# Instalar dependencias de npm
echo "📦 Instalando npm dependencies..."
if command -v npm >/dev/null 2>&1; then
    npm install 2>&1
    if [ $? -ne 0 ]; then
        echo "⚠️  npm install falló, pero continuando..."
    else
        echo "✅ npm install completado"
    fi
else
    echo "⚠️  npm no encontrado, continuando..."
fi

# Navegar al directorio del Podfile
cd ios/App 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Error: No se pudo navegar a ios/App"
    exit 1
fi

echo "📂 Directorio Podfile: $(pwd)"

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: Podfile no encontrado"
    exit 1
fi

# Buscar pod
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if ! command -v pod >/dev/null 2>&1; then
    if command -v brew >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods..."
        brew install cocoapods 2>&1 || true
    elif command -v gem >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods con gem..."
        gem install cocoapods --no-document 2>&1 || true
    fi
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
pod install 2>&1

if [ $? -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    pod install --repo-update 2>&1
fi

# Verificar resultado final
if [ $? -eq 0 ]; then
    echo "✅ Post-clone script completado"
    exit 0
else
    echo "⚠️  pod install falló, pero continuando..."
    # No fallar el build, dejar que continúe
    exit 0
fi
