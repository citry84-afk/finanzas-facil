#!/usr/bin/env node

/**
 * Script para generar capturas de pantalla del App Store
 * Genera capturas en todos los tamaños requeridos por Apple y Google
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CAPTURAS_DIR = 'capturas-app-store';
const URL_BASE = 'https://finanzasmuyfaciles.netlify.app';

// Tamaños requeridos por Apple App Store
const TAMAÑOS_APPLE = [
  { nombre: 'iPhone-6.7-inch', width: 1290, height: 2796 }, // iPhone 14 Pro Max
  { nombre: 'iPhone-6.5-inch', width: 1242, height: 2688 }, // iPhone 11 Pro Max
  { nombre: 'iPhone-5.5-inch', width: 1242, height: 2208 }, // iPhone 8 Plus
  { nombre: 'iPad-Pro-12.9-inch', width: 2048, height: 2732 }, // iPad Pro
  { nombre: 'iPad-Pro-11-inch', width: 1668, height: 2388 }, // iPad Pro 11"
];

// Tamaños requeridos por Google Play Store
const TAMAÑOS_GOOGLE = [
  { nombre: 'Phone-1080x1920', width: 1080, height: 1920 },
  { nombre: 'Phone-1440x2560', width: 1440, height: 2560 },
  { nombre: 'Tablet-1200x1920', width: 1200, height: 1920 },
  { nombre: 'Tablet-1600x2560', width: 1600, height: 2560 },
];

// Páginas/screenshots a capturar
const PANTALLAS = [
  { nombre: 'home', url: '/', descripcion: 'Página principal con calculadoras' },
  { nombre: 'control-gastos', url: '/#control-gastos', descripcion: 'Control de gastos mensuales' },
  { nombre: 'calculadora-autonomo', url: '/#calculadora-autonomo', descripcion: 'Calculadora para autónomos' },
  { nombre: 'calculadora-inversion', url: '/#calculadora-inversion', descripcion: 'Calculadora de inversiones' },
  { nombre: 'calculadora-ahorro', url: '/#calculadora-ahorro', descripcion: 'Calculadora de ahorro' },
  { nombre: 'calculadora-hipoteca', url: '/#calculadora-hipoteca', descripcion: 'Calculadora de hipotecas' },
  { nombre: 'calculadora-pensiones', url: '/#calculadora-pensiones', descripcion: 'Calculadora de pensiones' },
];

console.log('📸 Generando capturas de pantalla para App Store...');

// Crear directorio de capturas
if (!fs.existsSync(CAPTURAS_DIR)) {
  fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
}

// Crear subdirectorios
fs.mkdirSync(`${CAPTURAS_DIR}/apple`, { recursive: true });
fs.mkdirSync(`${CAPTURAS_DIR}/google`, { recursive: true });

console.log('✅ Directorios creados');

// Función para generar capturas con Puppeteer
const generarCaptura = (pantalla, tamaño, plataforma) => {
  const { nombre: nombrePantalla, url } = pantalla;
  const { nombre: nombreTamaño, width, height } = tamaño;
  
  const archivo = `${CAPTURAS_DIR}/${plataforma}/${nombrePantalla}-${nombreTamaño}.png`;
  
  try {
    // Usar Puppeteer para capturar
    const scriptPuppeteer = `
      const puppeteer = require('puppeteer');
      
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.setViewport({ width: ${width}, height: ${height} });
        await page.goto('${URL_BASE}${url}', { waitUntil: 'networkidle0' });
        
        // Esperar a que se cargue completamente
        await page.waitForTimeout(3000);
        
        await page.screenshot({ 
          path: '${archivo}',
          fullPage: true 
        });
        
        await browser.close();
        console.log('✅ Captura generada: ${archivo}');
      })();
    `;
    
    fs.writeFileSync('temp-capture.js', scriptPuppeteer);
    execSync('node temp-capture.js', { stdio: 'inherit' });
    fs.unlinkSync('temp-capture.js');
    
  } catch (error) {
    console.error(`❌ Error generando ${archivo}:`, error.message);
  }
};

// Generar capturas para Apple
console.log('🍎 Generando capturas para Apple App Store...');
TAMAÑOS_APPLE.forEach(tamaño => {
  PANTALLAS.forEach(pantalla => {
    generarCaptura(pantalla, tamaño, 'apple');
  });
});

// Generar capturas para Google
console.log('🤖 Generando capturas para Google Play Store...');
TAMAÑOS_GOOGLE.forEach(tamaño => {
  PANTALLAS.forEach(pantalla => {
    generarCaptura(pantalla, tamaño, 'google');
  });
});

console.log('🎉 ¡Capturas generadas exitosamente!');
console.log(`📁 Ubicación: ${path.resolve(CAPTURAS_DIR)}`);
console.log('📋 Archivos generados:');
console.log('   - Apple App Store: capturas-app-store/apple/');
console.log('   - Google Play Store: capturas-app-store/google/');
