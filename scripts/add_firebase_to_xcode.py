#!/usr/bin/env python3
"""
Script para agregar GoogleService-Info.plist al proyecto de Xcode de forma segura
"""

import sys
import re
import uuid

def generate_uuid():
    """Genera un UUID compatible con Xcode (24 caracteres hex)"""
    return uuid.uuid4().hex[:24].upper()

def add_google_service_info(project_path):
    """Agrega GoogleService-Info.plist al proyecto de Xcode"""
    
    try:
        # Leer el archivo del proyecto
        with open(project_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar si ya está incluido
        if 'GoogleService-Info.plist' in content:
            print("✅ GoogleService-Info.plist ya está incluido en el proyecto")
            return True
        
        print("📝 Agregando GoogleService-Info.plist al proyecto...")
        
        # Generar UUIDs únicos
        file_ref_uuid = generate_uuid()
        build_file_uuid = generate_uuid()
        
        # 1. Agregar PBXBuildFile
        build_file_section = re.search(r'/\* Begin PBXBuildFile section \*/(.*?)/\* End PBXBuildFile section \*/', content, re.DOTALL)
        if build_file_section:
            build_files = build_file_section.group(1)
            new_build_file = f"\t\t{build_file_uuid} /* GoogleService-Info.plist in Resources */ = {{isa = PBXBuildFile; fileRef = {file_ref_uuid} /* GoogleService-Info.plist */; }};\n"
            content = content.replace(
                '/* End PBXBuildFile section */',
                new_build_file + '/* End PBXBuildFile section */'
            )
            print("✅ PBXBuildFile agregado")
        
        # 2. Agregar PBXFileReference
        file_ref_section = re.search(r'/\* Begin PBXFileReference section \*/(.*?)/\* End PBXFileReference section \*/', content, re.DOTALL)
        if file_ref_section:
            new_file_ref = f"\t\t{file_ref_uuid} /* GoogleService-Info.plist */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = \"GoogleService-Info.plist\"; sourceTree = \"<group>\"; }};\n"
            content = content.replace(
                '/* End PBXFileReference section */',
                new_file_ref + '/* End PBXFileReference section */'
            )
            print("✅ PBXFileReference agregado")
        
        # 3. Agregar a PBXResourcesBuildPhase
        resources_section = re.search(r'(504EC3021FED79650016851F /\* Resources \*/ = \{[^}]*files = \()(.*?)(\);)', content, re.DOTALL)
        if resources_section:
            files_list = resources_section.group(2)
            new_resource = f"\n\t\t\t\t{build_file_uuid} /* GoogleService-Info.plist in Resources */,"
            content = content.replace(
                resources_section.group(0),
                resources_section.group(1) + files_list + new_resource + resources_section.group(3)
            )
            print("✅ Agregado a PBXResourcesBuildPhase")
        
        # 4. Agregar al grupo de archivos de App
        app_group = re.search(r'(504EC3061FED79650016851F /\* App \*/ = \{[^}]*children = \()(.*?)(\);)', content, re.DOTALL)
        if app_group:
            children_list = app_group.group(2)
            new_child = f"\n\t\t\t\t{file_ref_uuid} /* GoogleService-Info.plist */,"
            content = content.replace(
                app_group.group(0),
                app_group.group(1) + children_list + new_child + app_group.group(3)
            )
            print("✅ Agregado al grupo de archivos")
        
        # Escribir el archivo actualizado
        with open(project_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ GoogleService-Info.plist agregado exitosamente al proyecto")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    project_path = "ios/App/App.xcodeproj/project.pbxproj"
    success = add_google_service_info(project_path)
    sys.exit(0 if success else 1)

