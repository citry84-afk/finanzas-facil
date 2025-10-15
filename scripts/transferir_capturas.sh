#!/bin/bash

# Script para transferir capturas del Samsung al Mac automáticamente
# Uso: ./scripts/transferir_capturas.sh

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📱 TRANSFERENCIA DE CAPTURAS - FINANZASFÁCIL${NC}"
echo -e "${BLUE}============================================${NC}"

# Verificar que el Samsung esté conectado
echo -e "\n${YELLOW}Verificando dispositivo...${NC}"
DEVICE=$(adb devices | grep "R5CXA07F7QT" | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo -e "${YELLOW}⚠️  Samsung no detectado${NC}"
    echo -e "${YELLOW}Por favor:${NC}"
    echo -e "  1. Conecta el Samsung por USB"
    echo -e "  2. Activa 'Depuración USB' en el Samsung"
    echo -e "  3. Acepta el permiso en el Samsung"
    echo -e "  4. Ejecuta este script de nuevo"
    exit 1
fi

echo -e "${GREEN}✅ Samsung detectado: $DEVICE${NC}"

# Crear carpeta de destino
DEST_DIR="$HOME/Desktop/Screenshots-FinanzasFacil"
mkdir -p "$DEST_DIR"
echo -e "${GREEN}✅ Carpeta creada: $DEST_DIR${NC}"

# Listar capturas disponibles
echo -e "\n${YELLOW}Buscando capturas en el Samsung...${NC}"
SCREENSHOT_COUNT=$(adb shell "ls /sdcard/DCIM/Screenshots/*.png 2>/dev/null | wc -l" | tr -d ' ')

if [ "$SCREENSHOT_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}⚠️  No se encontraron capturas${NC}"
    echo -e "${YELLOW}¿Has hecho capturas en el Samsung?${NC}"
    echo -e "  - Desliza el borde de tu mano sobre la pantalla"
    echo -e "  - O presiona Encendido + Bajar Volumen"
    exit 1
fi

echo -e "${GREEN}✅ Se encontraron $SCREENSHOT_COUNT capturas${NC}"

# Transferir capturas
echo -e "\n${YELLOW}Transfiriendo capturas...${NC}"
adb pull /sdcard/DCIM/Screenshots/ "$DEST_DIR/" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Capturas transferidas exitosamente${NC}"
    echo -e "\n${GREEN}📁 Ubicación:${NC} $DEST_DIR"
    
    # Contar archivos transferidos
    LOCAL_COUNT=$(ls "$DEST_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${GREEN}📸 Total de capturas:${NC} $LOCAL_COUNT archivos"
    
    # Abrir carpeta en Finder
    open "$DEST_DIR"
    echo -e "\n${GREEN}✅ Carpeta abierta en Finder${NC}"
else
    echo -e "${YELLOW}⚠️  Error al transferir capturas${NC}"
    exit 1
fi

# Preguntar si renombrar
echo -e "\n${BLUE}¿Quieres renombrar las capturas con nombres descriptivos? (s/n)${NC}"
read -r RESPONSE

if [[ "$RESPONSE" =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Renombrando capturas...${NC}"
    
    cd "$DEST_DIR" || exit
    
    # Renombrar automáticamente basado en timestamp
    counter=1
    for file in *.png; do
        if [ -f "$file" ]; then
            new_name=$(printf "screenshot-%02d.png" $counter)
            mv "$file" "$new_name"
            echo -e "${GREEN}  ✓${NC} $file → $new_name"
            ((counter++))
        fi
    done
    
    echo -e "\n${GREEN}✅ Capturas renombradas${NC}"
    echo -e "${YELLOW}Ahora puedes renombrarlas manualmente:${NC}"
    echo -e "  screenshot-01.png → 01-landing-page.png"
    echo -e "  screenshot-02.png → 02-calculadora-irpf.png"
    echo -e "  screenshot-03.png → 03-calculadora-millonario.png"
    echo -e "  etc..."
fi

echo -e "\n${GREEN}🎉 ¡Proceso completado!${NC}"
echo -e "${BLUE}Próximo paso: Sube las capturas a Google Play Store${NC}"
