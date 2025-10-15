#!/usr/bin/env node

/**
 * Script para actualizar IDs de AdMob en el proyecto
 * Uso: node scripts/actualizar_admob_ids.js
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para leer archivo
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(`Error leyendo ${filePath}: ${error.message}`, 'red');
    return null;
  }
}

// Función para escribir archivo
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    log(`✅ Archivo actualizado: ${filePath}`, 'green');
    return true;
  } catch (error) {
    log(`Error escribiendo ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

// Función para actualizar archivo con nuevos IDs
function updateAdMobIds(config) {
  const { appIdAndroid, appIdIos, bannerId, interstitialId, rewardedId } = config;

  log('🚀 Actualizando IDs de AdMob...', 'blue');

  // 1. Actualizar src/config/admob.ts
  const admobConfigPath = path.join(__dirname, '..', 'src', 'config', 'admob.ts');
  let admobConfig = readFile(admobConfigPath);
  
  if (admobConfig) {
    // Reemplazar App IDs
    admobConfig = admobConfig.replace(
      /ANDROID: 'ca-app-pub-[\d~]+'/,
      `ANDROID: '${appIdAndroid}'`
    );
    admobConfig = admobConfig.replace(
      /IOS: 'ca-app-pub-[\d~]+'/,
      `IOS: '${appIdIos}'`
    );

    // Reemplazar Ad Unit IDs
    admobConfig = admobConfig.replace(
      /BANNER: 'ca-app-pub-[\d\/]+'/,
      `BANNER: '${bannerId}'`
    );
    admobConfig = admobConfig.replace(
      /INTERSTITIAL: 'ca-app-pub-[\d\/]+'/,
      `INTERSTITIAL: '${interstitialId}'`
    );
    admobConfig = admobConfig.replace(
      /REWARDED: 'ca-app-pub-[\d\/]+'/,
      `REWARDED: '${rewardedId}'`
    );

    // Cambiar testing a false
    admobConfig = admobConfig.replace(
      /ENABLED: true/,
      'ENABLED: false'
    );

    writeFile(admobConfigPath, admobConfig);
  }

  // 2. Actualizar capacitor.config.ts
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.ts');
  let capacitorConfig = readFile(capacitorConfigPath);
  
  if (capacitorConfig) {
    // Reemplazar App IDs en capacitor.config.ts
    capacitorConfig = capacitorConfig.replace(
      /appIdAndroid: 'ca-app-pub-[\d~]+'/,
      `appIdAndroid: '${appIdAndroid}'`
    );
    capacitorConfig = capacitorConfig.replace(
      /appIdIos: 'ca-app-pub-[\d~]+'/,
      `appIdIos: '${appIdIos}'`
    );

    // Cambiar initializeForTesting a false
    capacitorConfig = capacitorConfig.replace(
      /initializeForTesting: true/,
      'initializeForTesting: false'
    );

    writeFile(capacitorConfigPath, capacitorConfig);
  }

  log('🎉 ¡IDs de AdMob actualizados correctamente!', 'green');
  log('📱 Los anuncios ahora usarán tus IDs reales en lugar de los de prueba', 'yellow');
}

// Función principal
function main() {
  log('🎯 ACTUALIZADOR DE IDs DE ADMOB', 'blue');
  log('================================', 'blue');
  
  // Verificar si se pasaron argumentos
  const args = process.argv.slice(2);
  
  if (args.length < 5) {
    log('❌ Uso incorrecto. Necesitas proporcionar todos los IDs:', 'red');
    log('', 'reset');
    log('node scripts/actualizar_admob_ids.js <appIdAndroid> <appIdIos> <bannerId> <interstitialId> <rewardedId>', 'yellow');
    log('', 'reset');
    log('Ejemplo:', 'blue');
    log('node scripts/actualizar_admob_ids.js ca-app-pub-123~456 ca-app-pub-123~789 ca-app-pub-123/111 ca-app-pub-123/222 ca-app-pub-123/333', 'yellow');
    process.exit(1);
  }

  const config = {
    appIdAndroid: args[0],
    appIdIos: args[1],
    bannerId: args[2],
    interstitialId: args[3],
    rewardedId: args[4]
  };

  // Validar formato de IDs
  const idPattern = /^ca-app-pub-\d+[~\/]\d+$/;
  for (const [key, value] of Object.entries(config)) {
    if (!idPattern.test(value)) {
      log(`❌ ID inválido para ${key}: ${value}`, 'red');
      log('Los IDs deben tener el formato: ca-app-pub-XXXXXXXXXX~XXXXXXXXXX o ca-app-pub-XXXXXXXXXX/XXXXXXXXXX', 'yellow');
      process.exit(1);
    }
  }

  updateAdMobIds(config);
  
  log('', 'reset');
  log('✅ ¡Configuración completada!', 'green');
  log('📱 Ahora puedes hacer la build de prueba:', 'blue');
  log('   npm run build', 'yellow');
  log('   npx cap sync', 'yellow');
  log('   npx cap run android', 'yellow');
  log('   npx cap run ios', 'yellow');
}

// Ejecutar script
main();
