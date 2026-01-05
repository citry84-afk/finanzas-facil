#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

set +e  # No salir inmediatamente en caso de error

echo "🔧 Xcode Cloud: Post-clone script iniciado"

# Usar CI_WORKSPACE si está disponible (variable de entorno de Xcode Cloud)
# Si no, navegar desde el directorio del script
if [ -n "$CI_WORKSPACE" ]; then
    echo "📂 Usando CI_WORKSPACE: $CI_WORKSPACE"
    cd "$CI_WORKSPACE" || exit 1
else
    echo "📂 Navegando desde script..."
    cd "$(dirname "$0")/../../.." || exit 1
fi

echo "📂 Directorio actual: $(pwd)"

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
cd ios/App 2>&1 || exit 1

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
        brew install cocoapods 2>&1 || true
    elif command -v gem >/dev/null 2>&1; then
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
    echo "✅ Post-clone script completado exitosamente"
    exit 0
else
    echo "⚠️  pod install falló, pero continuando para no bloquear el build"
    exit 0
fi
