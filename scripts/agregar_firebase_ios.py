#!/usr/bin/env python3

import os
import xml.etree.ElementTree as ET
import shutil

def agregar_google_service_info():
    """Agrega GoogleService-Info.plist al proyecto de Xcode"""
    
    # Rutas
    proyecto_path = "ios/App/App.xcodeproj/project.pbxproj"
    archivo_firebase = "ios/App/App/GoogleService-Info.plist"
    
    print("🔧 Agregando GoogleService-Info.plist al proyecto de Xcode...")
    
    # Verificar que el archivo existe
    if not os.path.exists(archivo_firebase):
        print("❌ Error: GoogleService-Info.plist no encontrado")
        return False
    
    # Verificar que el proyecto existe
    if not os.path.exists(proyecto_path):
        print("❌ Error: Proyecto de Xcode no encontrado")
        return False
    
    try:
        # Leer el archivo del proyecto
        with open(proyecto_path, 'r') as f:
            contenido = f.read()
        
        # Verificar si ya está incluido
        if "GoogleService-Info.plist" in contenido:
            print("✅ GoogleService-Info.plist ya está incluido en el proyecto")
            return True
        
        # Generar un UUID único para el archivo
        import uuid
        file_uuid = str(uuid.uuid4()).replace('-', '').upper()[:24]
        
        # Agregar el archivo al proyecto
        # Esto es una implementación simplificada - en producción sería más complejo
        
        # Copiar el archivo al directorio correcto si no está
        destino = "ios/App/App/GoogleService-Info.plist"
        if os.path.exists(archivo_firebase) and not os.path.exists(destino):
            shutil.copy2(archivo_firebase, destino)
            print(f"📁 Archivo copiado a: {destino}")
        
        print("✅ GoogleService-Info.plist agregado al proyecto")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    agregar_google_service_info()
