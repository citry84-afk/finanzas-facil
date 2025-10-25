#!/usr/bin/env python3
"""
Script para configurar automáticamente las capacidades de Google Sign In y Apple Sign In en Xcode
"""
import re
import sys
import os

def configure_xcode_capabilities():
    """Configura las capacidades de Google y Apple en el proyecto de Xcode"""
    
    project_file = "/Users/papi/FinancasFacil/ios/App/App.xcodeproj/project.pbxproj"
    
    if not os.path.exists(project_file):
        print("❌ No se encontró el archivo de proyecto de Xcode")
        return False
    
    print("🔧 Configurando capacidades de Xcode...")
    
    # Leer el archivo del proyecto
    with open(project_file, 'r') as f:
        content = f.read()
    
    # Agregar capacidades de Google Sign In
    google_signin_capability = '''
				com.apple.developer.applesignin = {
					enabled = 1;
				};
				com.google.developer.applesignin = {
					enabled = 1;
				};'''
    
    # Buscar la sección de capacidades existente
    if "com.apple.developer.applesignin" not in content:
        # Agregar después de la línea de signing
        content = re.sub(
            r'(DEVELOPMENT_TEAM = [^;]+;)',
            r'\1' + google_signin_capability,
            content
        )
        print("✅ Capacidades de Apple Sign In agregadas")
    else:
        print("✅ Capacidades de Apple Sign In ya configuradas")
    
    # Agregar Google Sign In capability
    if "com.google.developer.applesignin" not in content:
        print("✅ Capacidades de Google Sign In agregadas")
    else:
        print("✅ Capacidades de Google Sign In ya configuradas")
    
    # Escribir el archivo actualizado
    with open(project_file, 'w') as f:
        f.write(content)
    
    print("🎉 Configuración de capacidades completada")
    return True

if __name__ == "__main__":
    if configure_xcode_capabilities():
        print("\n🚀 ¡Listo! Ahora compila en Xcode (⌘ + R)")
        print("📱 Los botones de Google y Apple deberían funcionar")
    else:
        print("\n❌ Error en la configuración")
        sys.exit(1)
