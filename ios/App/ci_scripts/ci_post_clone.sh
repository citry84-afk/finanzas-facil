#!/bin/sh

# Script post-clone para Xcode Cloud
# Instala dependencias y prepara el proyecto para el build

set -e

echo "🔧 Xcode Cloud: Post-clone script"

# Navegar a la raíz del repositorio
cd "${CI_WORKSPACE:-$(dirname "$0")/../../..}"

echo "📂 Directorio: $(pwd)"

# Instalar npm dependencies
echo "📦 Instalando dependencias npm..."
npm install

# Build de la aplicación
echo "🏗️  Compilando aplicación..."
npm run build

# Sincronizar Capacitor
echo "🔄 Sincronizando Capacitor..."
npx cap sync ios

# Navegar a ios/App
cd ios/App

# Instalar CocoaPods si no está disponible
if ! command -v pod >/dev/null 2>&1; then
    echo "📦 Instalando CocoaPods..."
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    if command -v brew >/dev/null 2>&1; then
        brew install cocoapods
    else
        gem install cocoapods --no-document
    fi
fi

# Ejecutar pod install
echo "📦 Instalando Pods..."
pod install || pod install --repo-update

echo "✅ Post-clone completado"
