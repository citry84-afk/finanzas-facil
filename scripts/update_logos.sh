#!/bin/bash

# 🎨 Script para actualizar logos de FinanzasFácil
# Genera todos los assets necesarios para App Store, Google Play y Web

echo "🎨 Actualizando logos de FinanzasFácil..."

# Crear directorios si no existen
mkdir -p public/logos
mkdir -p public/icons
mkdir -p ios/App/App/Assets.xcassets/AppIcon.appiconset
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

echo "📁 Directorios creados"

# Función para redimensionar imágenes (requiere ImageMagick)
resize_image() {
    local input=$1
    local output=$2
    local size=$3
    
    if command -v convert &> /dev/null; then
        convert "$input" -resize "${size}x${size}" "$output"
        echo "✅ Creado: $output ($size x $size)"
    else
        echo "⚠️ ImageMagick no encontrado. Instala con: brew install imagemagick"
        echo "📋 Archivo requerido: $output ($size x $size)"
    fi
}

# Función para crear favicon
create_favicon() {
    local input=$1
    local output=$2
    
    if command -v convert &> /dev/null; then
        convert "$input" -resize 32x32 "$output"
        echo "✅ Favicon creado: $output"
    else
        echo "📋 Favicon requerido: $output (32x32)"
    fi
}

echo ""
echo "📋 INSTRUCCIONES:"
echo "1. Ve a Gemini Pro y usa el prompt del archivo abierto"
echo "2. Descarga los logos generados"
echo "3. Colócalos en la carpeta 'public/logos/' con estos nombres:"
echo ""
echo "   📱 LOGOS PRINCIPALES:"
echo "   - logo-principal.png (1024x1024)"
echo "   - logo-icono.png (1024x1024, solo icono)"
echo "   - logo-horizontal.png (512x256)"
echo "   - logo-vertical.png (256x512)"
echo ""
echo "4. Ejecuta este script de nuevo para generar todos los assets"
echo ""
echo "🎯 ARCHIVOS QUE SE GENERARÁN AUTOMÁTICAMENTE:"
echo ""

# Lista de tamaños requeridos
echo "📱 iOS App Store:"
echo "   - 1024x1024 (App Store Connect)"
echo "   - 180x180 (iPhone)"
echo "   - 167x167 (iPad Pro)"
echo "   - 152x152 (iPad)"
echo "   - 120x120 (iPhone legacy)"
echo ""

echo "🤖 Android Google Play:"
echo "   - 512x512 (Play Console)"
echo "   - 192x192 (Android)"
echo "   - 144x144 (Android legacy)"
echo "   - 96x96 (Android legacy)"
echo ""

echo "🌐 Web Assets:"
echo "   - 32x32 (Favicon)"
echo "   - 180x180 (Apple Touch Icon)"
echo "   - 192x192 (Android Chrome)"
echo "   - 512x512 (PWA Icon)"
echo ""

echo "🚀 Una vez que tengas los logos, ejecuta:"
echo "   ./scripts/update_logos.sh process"
echo ""

# Si se pasa el argumento 'process', procesar los logos
if [ "$1" = "process" ]; then
    echo "🔄 Procesando logos..."
    
    # Verificar que existan los archivos base
    if [ ! -f "public/logos/logo-principal.png" ]; then
        echo "❌ Error: No se encontró public/logos/logo-principal.png"
        echo "📋 Descarga los logos de Gemini Pro primero"
        exit 1
    fi
    
    # Procesar logos para iOS
    echo "📱 Generando assets para iOS..."
    resize_image "public/logos/logo-principal.png" "ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-1024.png" 1024
    resize_image "public/logos/logo-principal.png" "ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-180.png" 180
    resize_image "public/logos/logo-principal.png" "ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-167.png" 167
    resize_image "public/logos/logo-principal.png" "ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-152.png" 152
    resize_image "public/logos/logo-principal.png" "ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-120.png" 120
    
    # Procesar logos para Android
    echo "🤖 Generando assets para Android..."
    resize_image "public/logos/logo-principal.png" "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" 192
    resize_image "public/logos/logo-principal.png" "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png" 144
    resize_image "public/logos/logo-principal.png" "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png" 96
    resize_image "public/logos/logo-principal.png" "android/app/src/main/res/mipmap-hdpi/ic_launcher.png" 72
    resize_image "public/logos/logo-principal.png" "android/app/src/main/res/mipmap-mdpi/ic_launcher.png" 48
    
    # Procesar logos para Web
    echo "🌐 Generando assets para Web..."
    create_favicon "public/logos/logo-principal.png" "public/favicon.ico"
    resize_image "public/logos/logo-principal.png" "public/icons/icon-180.png" 180
    resize_image "public/logos/logo-principal.png" "public/icons/icon-192.png" 192
    resize_image "public/logos/logo-principal.png" "public/icons/icon-512.png" 512
    
    echo ""
    echo "🎉 ¡Logos actualizados exitosamente!"
    echo "📱 Assets generados para:"
    echo "   ✅ iOS App Store"
    echo "   ✅ Android Google Play"
    echo "   ✅ Web (PWA)"
    echo ""
    echo "🚀 Próximos pasos:"
    echo "   1. Revisar los logos generados"
    echo "   2. Hacer build de la app"
    echo "   3. Probar en dispositivos"
    echo "   4. ¡Enviar a las tiendas!"
fi

echo ""
echo "💡 TIP: Si no tienes ImageMagick, instálalo con:"
echo "   brew install imagemagick"
echo ""
echo "🎨 ¡Ve a Gemini Pro y crea logos espectaculares!"
