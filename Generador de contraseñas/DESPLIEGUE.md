# 🚀 Guía de Desarrollo y Despliegue

## Desarrollo Local

### Con Python (Recomendado)

#### Python 3.x:
```bash
# Navega a la carpeta del proyecto
cd "Generador de contraseñas"

# Inicia el servidor
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

#### Python 2.x:
```bash
python -m SimpleHTTPServer 8000
```

### Con Node.js

```bash
# Instala http-server globalmente
npm install -g http-server

# Navega a la carpeta
cd "Generador de contraseñas"

# Inicia el servidor
http-server -p 8000
```

### Con Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Con PHP

```bash
cd "Generador de contraseñas"
php -S localhost:8000
```

## Testing de PWA

### 1. Verificar Manifest
- Abre DevTools (F12)
- Ve a Application > Manifest
- Debe mostrar toda la información correctamente

### 2. Verificar Service Worker
- En DevTools > Application > Service Workers
- Debe estar "activated and running"
- Verifica el caché en Cache Storage

### 3. Probar Modo Offline
1. En DevTools > Application > Service Workers
2. Marca "Offline"
3. Recarga la página
4. La app debe funcionar normalmente

### 4. Instalar como PWA
- Abre la app en Chrome/Edge
- Haz clic en el ícono "Install" en la barra de direcciones
- O usa el menú de la app

## Despliegue

### En un Servidor Web

#### Requisitos:
- Servidor HTTP/HTTPS
- Soporte para GZIP
- Headers CORS correctos

#### Pasos:
1. Copia todos los archivos al servidor
2. Asegúrate de servir con HTTPS (requerido para PWA)
3. Configura headers correctos:
   ```
   Content-Type: application/json (para manifest.json)
   Content-Encoding: gzip (para compresión)
   Cache-Control Headers (para caché)
   ```

#### Con GitHub Pages

1. Crea un repositorio en GitHub
2. Sube los archivos
3. Ve a Settings > Pages
4. Selecciona "Deploy from a branch"
5. Tu PWA estará disponible en: `https://usuario.github.io/nombre-repo`

#### Con Netlify

1. Conecta tu repositorio a Netlify
2. Configuración automática
3. Despliega con un clic

#### Con Vercel

```bash
npm i -g vercel

cd "Generador de contraseñas"
vercel
```

## Optimizaciones

### Minificación
Para reducir tamaño de archivos:

```bash
# CSS
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# JavaScript
npm install -g terser
terser script.js -o script.min.js

# Actualiza los referencias en index.html
```

### Imágenes y Favicons
Los iconos actualmente se generan como SVG en base64 para evitar archivos adicionales.

Para agregar favor icons personalizados:
```html
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
```

## Monitoreo

### Lighthouse Audit
1. Abre DevTools
2. Ve a Lighthouse
3. Genera un reporte
4. Busca mejorar la puntuación

### Métricas de Performance
```javascript
// En console del navegador
performance.timing.loadEventEnd - performance.timing.navigationStart
```

## Actualizar Versión del Cache

Para actualizar el cache cuando haces cambios:

1. Edita `service-worker.js`
2. Cambia `CACHE_NAME` a una nueva versión:
   ```javascript
   const CACHE_NAME = 'password-generator-v2';
   ```
3. El nuevo cache se creará automáticamente

## Solución de Problemas

### La app no se ve bien
- Limpia el caché: DevTools > Application > Clear Storage
- Desinstala y reinstala la PWA

### Service Worker no funciona
- Verifica que HTTPS esté habilitado (si va en server)
- Revisa la consola de DevTools para errores
- Asegúrate de que los archivos estén en la ubicación correcta

### La instalación no aparece
- Abre la app con HTTPS en computadora
- En móvil, mantén abierta la app por 30 segundos
- Verifica que el manifest.json sea válido

### Historial se borra
- Revisa los ajustes de privacidad del navegador
- Algunos navegadores pueden limpiar localStorage al cerrar
- Los datos se guardan en localStorage, no en cookies

## Scripts Útiles

### Crear carpeta de distribución
```bash
mkdir dist
cp index.html dist/
cp styles.css dist/
cp script.js dist/
cp service-worker.js dist/
cp manifest.json dist/
cp .htaccess dist/
cp README.md dist/
```

### Verificar tamaño de archivos
```bash
# Windows
dir /s

# Linux/Mac
du -sh *
```

## Documentación Adicional

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)

---

**Nota**: Para máxima compatibilidad con PWA, siempre usa HTTPS en producción.
