#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud
# Debe estar en: ios/App/ci_scripts/ci_pre_xcodebuild.sh

set -e

echo "🔧 Xcode Cloud: Ejecutando pre-build script..."
echo "📂 Directorio actual: $(pwd)"

# El script se ejecuta desde la raíz del repositorio
# Necesitamos navegar al directorio donde está el Podfile
cd ios/App

echo "📂 Directorio de trabajo: $(pwd)"

# Verificar que CocoaPods está instalado
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods no encontrado, instalando..."
    gem install cocoapods
fi

# Verificar que existe el Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile en $(pwd)"
    exit 1
fi

echo "✅ Podfile encontrado"

# Instalar dependencias de CocoaPods
echo "📦 Instalando dependencias de CocoaPods..."
pod install --repo-update

# Verificar que se crearon los archivos .xcconfig
if [ ! -f "Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig" ]; then
    echo "❌ Error: No se generó Pods-App.release.xcconfig"
    exit 1
fi

if [ ! -f "Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig" ]; then
    echo "❌ Error: No se generó Pods-App.debug.xcconfig"
    exit 1
fi

echo "✅ Archivos .xcconfig generados correctamente"
echo "✅ Pre-build script completado exitosamente"
