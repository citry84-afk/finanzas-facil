#!/usr/bin/env node

/**
 * Script para optimizar assets para App Store y Google Play Store
 * Genera todos los tamaños requeridos automáticamente
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'assets-tiendas';
const ICON_ORIGINAL = 'resources/icon.png'; // Icono original de 1024x1024

console.log('🎨 Optimizando assets para tiendas...');

// Crear directorio de assets
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Crear subdirectorios
fs.mkdirSync(`${ASSETS_DIR}/apple`, { recursive: true });
fs.mkdirSync(`${ASSETS_DIR}/google`, { recursive: true });
fs.mkdirSync(`${ASSETS_DIR}/screenshots`, { recursive: true });

console.log('✅ Directorios creados');

// Tamaños requeridos por Apple App Store
const ICONOS_APPLE = [
  { size: 1024, nombre: 'AppStore.png' },
  { size: 180, nombre: 'Icon-60@3x.png' },
  { size: 120, nombre: 'Icon-60@2x.png' },
  { size: 87, nombre: 'Icon-29@3x.png' },
  { size: 58, nombre: 'Icon-29@2x.png' },
  { size: 40, nombre: 'Icon-20@2x.png' },
  { size: 20, nombre: 'Icon-20.png' },
];

// Tamaños requeridos por Google Play Store
const ICONOS_GOOGLE = [
  { size: 512, nombre: 'app-icon.png' },
  { size: 192, nombre: 'app-icon-192.png' },
  { size: 144, nombre: 'app-icon-144.png' },
  { size: 96, nombre: 'app-icon-96.png' },
  { size: 72, nombre: 'app-icon-72.png' },
  { size: 48, nombre: 'app-icon-48.png' },
];

// Función para redimensionar iconos usando ImageMagick
const redimensionarIcono = (tamaño, nombre, plataforma) => {
  const archivo = `${ASSETS_DIR}/${plataforma}/${nombre}`;
  
  try {
    execSync(`convert ${ICON_ORIGINAL} -resize ${tamaño}x${tamaño} ${archivo}`, { stdio: 'inherit' });
    console.log(`✅ Icono generado: ${archivo}`);
  } catch (error) {
    console.error(`❌ Error generando ${archivo}:`, error.message);
  }
};

// Función para crear feature graphic de Google Play
const crearFeatureGraphic = () => {
  const archivo = `${ASSETS_DIR}/google/feature-graphic.png`;
  
  try {
    // Crear feature graphic 1024x500px
    execSync(`convert -size 1024x500 xc:white ${archivo}`, { stdio: 'inherit' });
    
    // Agregar texto y elementos
    execSync(`convert ${archivo} -gravity center -font Arial-Bold -pointsize 48 -fill "#1a365d" -annotate +0-50 "FinanzasFácil" -pointsize 24 -fill "#4a5568" -annotate +0+20 "Calculadoras Financieras Profesionales" ${archivo}`, { stdio: 'inherit' });
    
    console.log(`✅ Feature graphic generado: ${archivo}`);
  } catch (error) {
    console.error(`❌ Error generando feature graphic:`, error.message);
  }
};

// Función para crear TV banner
const crearTVBanner = () => {
  const archivo = `${ASSETS_DIR}/google/tv-banner.png`;
  
  try {
    // Crear TV banner 1280x720px
    execSync(`convert -size 1280x720 xc:white ${archivo}`, { stdio: 'inherit' });
    
    // Agregar contenido
    execSync(`convert ${archivo} -gravity center -font Arial-Bold -pointsize 72 -fill "#1a365d" -annotate +0-100 "FinanzasFácil" -pointsize 36 -fill "#4a5568" -annotate +0+50 "Calculadoras Financieras" ${archivo}`, { stdio: 'inherit' });
    
    console.log(`✅ TV banner generado: ${archivo}`);
  } catch (error) {
    console.error(`❌ Error generando TV banner:`, error.message);
  }
};

// Verificar si ImageMagick está instalado
try {
  execSync('convert -version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ ImageMagick no está instalado. Instálalo con: brew install imagemagick');
  process.exit(1);
}

// Verificar si el icono original existe
if (!fs.existsSync(ICON_ORIGINAL)) {
  console.error(`❌ Icono original no encontrado: ${ICON_ORIGINAL}`);
  console.log('💡 Asegúrate de tener un icono de 1024x1024px en resources/icon.png');
  process.exit(1);
}

// Generar iconos para Apple
console.log('🍎 Generando iconos para Apple App Store...');
ICONOS_APPLE.forEach(icono => {
  redimensionarIcono(icono.size, icono.nombre, 'apple');
});

// Generar iconos para Google
console.log('🤖 Generando iconos para Google Play Store...');
ICONOS_GOOGLE.forEach(icono => {
  redimensionarIcono(icono.size, icono.nombre, 'google');
});

// Generar feature graphic y TV banner
console.log('🎨 Generando gráficos promocionales...');
crearFeatureGraphic();
crearTVBanner();

// Crear archivo README con instrucciones
const readme = `# 📱 Assets para Tiendas

## 🍎 Apple App Store

### Iconos:
- \`AppStore.png\` (1024x1024) - Para App Store Connect
- \`Icon-*.png\` - Para Xcode project

### Screenshots:
- iPhone 6.7" (1290x2796px)
- iPhone 6.5" (1242x2688px)  
- iPhone 5.5" (1242x2208px)
- iPad Pro 12.9" (2048x2732px)
- iPad Pro 11" (1668x2388px)

## 🤖 Google Play Store

### Iconos:
- \`app-icon.png\` (512x512) - Icono principal
- \`app-icon-*.png\` - Varios tamaños

### Gráficos:
- \`feature-graphic.png\` (1024x500) - Banner promocional
- \`tv-banner.png\` (1280x720) - Para Android TV

## 📸 Screenshots

Los screenshots se generan automáticamente usando el script:
\`node scripts/generar_capturas_app_store.js\`

## 🚀 Uso

1. Sube los iconos a las respectivas tiendas
2. Usa los screenshots generados
3. Configura metadatos según \`docs/DESCRIPCION-APP-STORE.md\`
`;

fs.writeFileSync(`${ASSETS_DIR}/README.md`, readme);

console.log('🎉 ¡Assets optimizados exitosamente!');
console.log(`📁 Ubicación: ${path.resolve(ASSETS_DIR)}`);
console.log('📋 Archivos generados:');
console.log('   - Apple App Store: assets-tiendas/apple/');
console.log('   - Google Play Store: assets-tiendas/google/');
console.log('   - Screenshots: assets-tiendas/screenshots/');
console.log('📖 Lee assets-tiendas/README.md para instrucciones');
