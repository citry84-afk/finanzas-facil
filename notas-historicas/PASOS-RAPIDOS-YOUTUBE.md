# 🚀 Configuración YouTube - PASOS RÁPIDOS

## ⚡ **3 MINUTOS**

### **PASO 1: Crear Proyecto (30 segundos)**
1. Click en "Selecciona un proyecto"
2. Click "Nuevo proyecto"
3. Nombre: `finanzasmuyfaciles-youtube`
4. Click "Crear"

---

### **PASO 2: Activar API (1 minuto)**
1. Ve a "APIs & Services" > "Library" (menú izquierdo)
2. Busca: `YouTube Data API v3`
3. Click "Enable"

---

### **PASO 3: Crear API Key (1 minuto)**
1. Ve a "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. **COPIA** tu API Key (aparece en un popup)

---

### **PASO 4: Configurar en tu proyecto**
Crea archivo `.env` en la raíz:
```
REACT_APP_YOUTUBE_API_KEY=TU_API_KEY_COPIADA
```

Luego:
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## ✅ **LISTO**

Ahora el slider mostrará tus videos reales automáticamente.

**No necesitas usar los $300 de crédito.** Los 10,000 requests/día son gratis para siempre.
