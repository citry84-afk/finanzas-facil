# ⚙️ Configurar API Key en Netlify

## 🎯 **PROBLEMA:**
Las variables de entorno del archivo `.env` NO se cargan automáticamente en Netlify.

---

## ✅ **SOLUCIÓN:**

### **PASO 1: Ve a Netlify**

1. Abre: https://app.netlify.com/
2. Selecciona tu sitio: **finanzasmuyfaciles**
3. Ve a: **Site configuration** > **Environment variables**

### **PASO 2: Agrega Variable**

1. Click en **"Add a variable"**
2. **Key:** `REACT_APP_YOUTUBE_API_KEY`
3. **Value:** `AIzaSyBO9ZHJMyxDkmvl-f4-RuObH_nWZTqjObI`
4. Click **"Save"**

### **PASO 3: Re-deploy**

Hay 2 opciones:

**Opción A: Re-deploy manual**
1. En la pestaña "Deploys"
2. Busca el último deploy
3. Click en los 3 puntos "..." 
4. Click "Clear cache and deploy site"

**Opción B: Trigger deploy (más fácil)**
1. Desde tu terminal:
```bash
cd /Users/papi/FinancasFacil
netlify deploy --prod --dir=dist
```

---

## ✅ **RESULTADO:**

Después del re-deploy, el slider mostrará tus videos.

---

**Nota:** Si después de 5 minutos sigue sin aparecer, revisa la consola del navegador para ver el error específico.
