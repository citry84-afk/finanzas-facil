# 🔍 VERIFICAR PUBLISHER ID EN ADMOB

## 📋 PASO 1: Encontrar tu Publisher ID en AdMob

1. **Ve a:** https://admob.google.com/
2. **Haz clic en:** Tu perfil (arriba a la derecha, icono de usuario)
3. **Busca:** "Publisher ID" o "ID de editor" o "Account ID"
4. **Copia el Publisher ID** (debe ser algo como: `pub-4837743291717475`)

---

## 📋 PASO 2: Comparar con app-ads.txt

**Abre el archivo:**
```
https://finanzasmuyfacil.com/app-ads.txt
```

**Debe mostrar:**
```
google.com, pub-4837743291717475, DIRECT, f08c47fec0942fa0
```

**Compara:**
- Publisher ID en AdMob: `pub-XXXXX`
- Publisher ID en app-ads.txt: `pub-4837743291717475`

**Si NO coinciden:**
- Necesitas actualizar el archivo `app-ads.txt` con el Publisher ID correcto

---

## 📋 PASO 3: Si el Publisher ID no coincide, actualizar

1. **Edita:** `public/app-ads.txt`
2. **Reemplaza:** `pub-4837743291717475` con tu Publisher ID real
3. **Guarda** el archivo
4. **Haz deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## 📋 PASO 4: Configurar URL del Sitio Web en AdMob

**Este es CRÍTICO.** AdMob necesita saber en qué dominio buscar el archivo.

1. **Ve a:** https://admob.google.com/
2. **Navega a:** Aplicaciones → FinanzasFácil iOS → Configuración
3. **Busca:** "Detalles de la tienda de aplicaciones" (App store details)
4. **Haz clic en:** "Editar" (si ya existe) o "Añadir" (si no existe)
5. **Configura:**
   - **URL del sitio web:** `https://finanzasmuyfacil.com` ⚠️ MUY IMPORTANTE
   - **Dominio del desarrollador:** `finanzasmuyfacil.com`
6. **Guarda** los cambios
7. **Espera 5-10 minutos**
8. **Haz clic en:** "Buscar actualizaciones"

---

## 🎯 RESUMEN

1. **Verifica tu Publisher ID en AdMob**
2. **Compara con el de app-ads.txt**
3. **Si no coincide, actualiza el archivo y haz deploy**
4. **Configura la URL del sitio web en AdMob:** `https://finanzasmuyfacil.com`
5. **Espera 5-10 minutos**
6. **Haz clic en "Buscar actualizaciones"**

---

**¿Cuál es tu Publisher ID en AdMob?** Compártelo para verificar si coincide con el del archivo.

