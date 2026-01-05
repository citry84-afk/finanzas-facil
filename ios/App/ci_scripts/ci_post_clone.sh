#!/bin/sh

# Script post-clone para Xcode Cloud
# Este script se ejecuta después de clonar el repositorio

set +e  # No salir inmediatamente en caso de error

echo "🔧 Xcode Cloud: Post-clone script"

# Navegar a la raíz del repositorio (3 niveles arriba desde ci_scripts)
cd "$(dirname "$0")/../../.." || exit 1

# Instalar dependencias de npm primero (necesario para Capacitor)
echo "📦 Instalando dependencias de npm..."
if command -v npm >/dev/null 2>&1; then
    npm install || echo "⚠️  npm install falló, continuando..."
else
    echo "⚠️  npm no encontrado, continuando..."
fi

# Navegar al directorio del Podfile
cd ios/App || exit 1

# Verificar Podfile
if [ ! -f "Podfile" ]; then
    echo "❌ Error: No se encontró Podfile"
    exit 1
fi

# Buscar pod
if ! command -v pod >/dev/null 2>&1; then
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    
    # Si aún no está, intentar instalar
    if ! command -v pod >/dev/null 2>&1; then
        if command -v brew >/dev/null 2>&1; then
            brew install cocoapods || true
        elif command -v gem >/dev/null 2>&1; then
            gem install cocoapods --no-document || true
            export PATH="$HOME/.gem/ruby/*/bin:$PATH"
        fi
    fi
fi

# Ejecutar pod install
echo "📦 Ejecutando pod install..."
pod install

# Si falla, intentar con --repo-update
if [ $? -ne 0 ]; then
    echo "⚠️  Reintentando con --repo-update..."
    pod install --repo-update
fi

# Verificar resultado
if [ $? -eq 0 ]; then
    echo "✅ Post-clone script completado"
    exit 0
else
    echo "⚠️  pod install falló, pero continuando..."
    # No salir con error, dejar que el build continúe
    exit 0
fi
