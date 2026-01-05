#!/bin/sh

# Script post-clone para Xcode Cloud
# Instala dependencias y prepara el proyecto para el build

set -e

echo "🔧 Xcode Cloud: Post-clone script iniciado"
echo "📋 Shell: $SHELL"
echo "📋 PATH inicial: $PATH"

# Configurar PATH para incluir Node.js y herramientas comunes
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

# Verificar que command está disponible
if ! command -v command >/dev/null 2>&1; then
    echo "⚠️  Advertencia: command no disponible, continuando..."
fi

# Navegar a la raíz del repositorio
WORKSPACE="${CI_WORKSPACE:-$(dirname "$0")/../../..}"
cd "$WORKSPACE"
echo "📂 Directorio de trabajo: $(pwd)"

# Verificar y localizar Node.js
echo "🔍 Buscando Node.js..."

# Buscar Node.js en rutas comunes de Xcode Cloud
NODE_FOUND=0
for node_path in /usr/local/bin/node /opt/homebrew/bin/node /usr/bin/node; do
    if [ -x "$node_path" ] 2>/dev/null; then
        NODE_DIR=$(dirname "$node_path")
        export PATH="$NODE_DIR:$PATH"
        echo "✅ Node.js encontrado en: $node_path"
        NODE_FOUND=1
        break
    fi
done

# Si no se encontró en rutas absolutas, verificar PATH
if [ "$NODE_FOUND" -eq 0 ]; then
    if command -v node >/dev/null 2>&1; then
        echo "✅ Node.js encontrado en PATH"
        NODE_FOUND=1
    fi
fi

# Si aún no se encontró, intentar instalar
if [ "$NODE_FOUND" -eq 0 ]; then
    echo "⚠️  Node.js no encontrado, intentando instalar..."
    if command -v brew >/dev/null 2>&1; then
        brew install node
        export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    else
        echo "❌ Error: Node.js no disponible y Homebrew no instalado"
        echo "📋 PATH actual: $PATH"
        exit 127
    fi
fi

# Verificar npm
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: npm no encontrado en PATH"
    echo "📋 PATH actual: $PATH"
    echo "🔍 Buscando npm en ubicaciones comunes..."
    which npm || find /usr -name npm 2>/dev/null | head -1 || true
    exit 127
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

# Instalar dependencias npm
echo "📦 Instalando dependencias npm..."
npm install

# Build de la aplicación
echo "🏗️  Compilando aplicación..."
npm run build

# Verificar npx
if ! command -v npx >/dev/null 2>&1; then
    echo "❌ Error: npx no encontrado"
    exit 127
fi

# Sincronizar Capacitor
echo "🔄 Sincronizando Capacitor..."
npx cap sync ios

# Navegar a ios/App
cd ios/App
echo "📂 Directorio iOS: $(pwd)"

# Instalar CocoaPods si no está disponible
if ! command -v pod >/dev/null 2>&1; then
    echo "📦 CocoaPods no encontrado, instalando..."
    export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
    
    if command -v brew >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods via Homebrew..."
        brew install cocoapods
    elif command -v gem >/dev/null 2>&1; then
        echo "📦 Instalando CocoaPods via gem..."
        gem install cocoapods --no-document
    else
        echo "❌ Error: No se puede instalar CocoaPods (brew/gem no disponibles)"
        exit 1
    fi
fi

echo "✅ CocoaPods: $(pod --version)"

# Ejecutar pod install
echo "📦 Instalando Pods..."
pod install || pod install --repo-update

echo "✅ Post-clone script completado exitosamente"
