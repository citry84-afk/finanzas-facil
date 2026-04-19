# 📺 Cómo Configurar el Slider de YouTube

## 🎯 **PROBLEMA:**
El slider no muestra videos porque necesita tu API Key de YouTube.

---

## ✅ **SOLUCIÓN: 3 PASOS**

### **1. Obtén tu API Key de Google**

1. Ve a: https://console.cloud.google.com/
2. Crea un proyecto o selecciona uno existente
3. Ve a "APIs & Services" > "Library"
4. Busca "YouTube Data API v3" y haz clic en "Enable"
5. Ve a "APIs & Services" > "Credentials"
6. Haz clic en "Create Credentials" > "API Key"
7. Copia tu API Key

### **2. Configura la API Key en tu proyecto**

Crea un archivo `.env` en la raíz del proyecto:

```bash
REACT_APP_YOUTUBE_API_KEY=TU_API_KEY_AQUI
```

### **3. Re-deploy**

```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 🔒 **SEGURIDAD (Importante):**

### **Restringe tu API Key:**

1. En Google Cloud Console, haz clic en tu API Key
2. En "Application restrictions" selecciona "HTTP referrers"
3. Agrega: `https://finanzasmuyfaciles.netlify.app/*`
4. Guarda cambios

**Esto evita que otros usen tu API Key**

---

## 📊 **LÍMITES:**

- **10,000 unidades/día** gratis
- **Carga de 6 videos** ≈ 600 unidades
- **~16,000 cargas/día** posibles

---

## ✅ **RESULTADO:**

Cuando subas un video nuevo a tu canal, aparecerá automáticamente en tu web.

---

**¿Preguntas?** El archivo `SLIDER-YOUTUBE-AUTOMATICO.md` tiene más detalles.
