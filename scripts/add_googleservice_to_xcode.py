#!/usr/bin/env python3
"""
Script para agregar GoogleService-Info.plist al proyecto de Xcode de forma segura
"""
import os
import sys

def add_googleservice_to_xcode():
    """Agrega GoogleService-Info.plist al proyecto de Xcode"""
    
    project_file = "/Users/papi/FinancasFacil/ios/App/App.xcodeproj/project.pbxproj"
    
    if not os.path.exists(project_file):
        print("❌ No se encontró el archivo de proyecto de Xcode")
        return False
    
    print("🔧 Agregando GoogleService-Info.plist al proyecto de Xcode...")
    
    # Leer el archivo del proyecto
    with open(project_file, 'r') as f:
        content = f.read()
    
    # Verificar si ya está agregado
    if 'GoogleService-Info.plist' in content:
        print("✅ GoogleService-Info.plist ya está en el proyecto")
        return True
    
    # Generar UUIDs únicos
    import uuid
    file_ref_uuid = str(uuid.uuid4()).replace('-', '')[:24].upper()
    build_file_uuid = str(uuid.uuid4()).replace('-', '')[:24].upper()
    
    # 1. Agregar PBXFileReference
    file_reference = f'\t\t{file_ref_uuid} /* GoogleService-Info.plist */ = {{isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; path = "GoogleService-Info.plist"; sourceTree = "<group>"; }};\n'
    
    # Buscar la sección PBXFileReference y agregar
    pbx_file_ref_marker = '/* Begin PBXFileReference section */'
    content = content.replace(
        pbx_file_ref_marker,
        pbx_file_ref_marker + '\n' + file_reference
    )
    
    # 2. Agregar PBXBuildFile
    build_file = f'\t\t{build_file_uuid} /* GoogleService-Info.plist in Resources */ = {{isa = PBXBuildFile; fileRef = {file_ref_uuid} /* GoogleService-Info.plist */; }};\n'
    
    # Buscar la sección PBXBuildFile y agregar
    pbx_build_file_marker = '/* Begin PBXBuildFile section */'
    content = content.replace(
        pbx_build_file_marker,
        pbx_build_file_marker + '\n' + build_file
    )
    
    # 3. Agregar a PBXResourcesBuildPhase
    # Buscar la sección de Resources del target App
    resources_marker = 'files = (\n'
    resource_entry = f'\t\t\t\t{build_file_uuid} /* GoogleService-Info.plist in Resources */,\n'
    
    # Agregar al inicio de la lista de archivos
    content = content.replace(
        resources_marker,
        resources_marker + resource_entry,
        1  # Solo la primera ocurrencia
    )
    
    # 4. Agregar a PBXGroup (grupo "App")
    # Buscar el grupo App y agregar el archivo
    app_group_marker = '/* App */ = {\n\t\t\tisa = PBXGroup;\n\t\t\tchildren = (\n'
    group_entry = f'\t\t\t\t{file_ref_uuid} /* GoogleService-Info.plist */,\n'
    
    content = content.replace(
        app_group_marker,
        app_group_marker + group_entry,
        1  # Solo la primera ocurrencia
    )
    
    # Escribir el archivo actualizado
    with open(project_file, 'w') as f:
        f.write(content)
    
    print("✅ GoogleService-Info.plist agregado al proyecto de Xcode")
    print(f"   FileRef UUID: {file_ref_uuid}")
    print(f"   BuildFile UUID: {build_file_uuid}")
    return True

if __name__ == "__main__":
    if add_googleservice_to_xcode():
        print("\n🎉 ¡Listo! Ahora compila de nuevo en Xcode")
    else:
        print("\n❌ Error al agregar el archivo")
        sys.exit(1)

