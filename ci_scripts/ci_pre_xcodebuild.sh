#!/bin/sh

# Script de pre-build para Xcode Cloud
# Este script se ejecuta automáticamente antes de cada build en Xcode Cloud

set -e

echo "🔧 Xcode Cloud: Ejecutando pre-build script..."

# Navegar al directorio de iOS
cd ios/App

# Verificar que CocoaPods está instalado
if ! command -v pod &> /dev/null; then
    echo "⚠️  CocoaPods no encontrado, instalando..."
    gem install cocoapods
fi

# Instalar dependencias de CocoaPods
echo "📦 Instalando dependencias de CocoaPods..."
pod install --repo-update

echo "✅ Pre-build script completado exitosamente"
