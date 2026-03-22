# 📱 Portal PWA - Documentación

Portal centralizado para acceder a todas tus aplicaciones web progresivas desde un único lugar.

## 📂 Estructura

```
PWA/
├── index.html                          # Portal principal
├── styles.css                          # Estilos del portal
├── script.js                           # Lógica del portal
├── service-worker.js                   # Service Worker
├── Generador de contraseñas/           # Primera PWA
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── service-worker.js
│   ├── manifest.json
│   └── ...
└── [Próximas PWAs aquí]
```

## 🚀 Cómo Agregar una Nueva PWA

### Opción 1: Mediante el archivo script.js (Recomendado)

Edita `script.js` y localiza el array `APPS`:

```javascript
const APPS = [
    {
        id: 'password-generator',
        nombre: 'Generador de Contraseñas',
        descripcion: 'Crea contraseñas fuertes y seguras personalizadas',
        icon: 'L',  // Usa una letra o símbolo
        ruta: './Generador de contraseñas/index.html',
        disponible: true
    },
    {
        id: 'mi-app',
        nombre: 'Mi Nueva Aplicación',
        descripcion: 'Descripción breve de lo que hace',
        icon: 'A',  // Usa una letra o símbolo
        ruta: './mi-app/index.html',
        disponible: true
    }
];
```

### Opción 2: Mediante la consola del navegador

Abre la consola (F12) y ejecuta:

```javascript
agregarApp('todo-list', 'Gestor de Tareas', 'Organiza tu día con ease', 'T', './todo-list/index.html');
```

## 📋 Campos Requeridos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String | Identificador único de la app (sin espacios) |
| `nombre` | String | Nombre visible de la app |
| `descripcion` | String | Descripción corta (máx 80 caracteres) |
| `icon` | String | Un carácter, letra o símbolo que representa la app |
| `ruta` | String | Ruta relativa al index.html de la app |
| `disponible` | Boolean | true = visible en el portal, false = oculta |

## 💡 Recomendaciones de Iconos

En lugar de emoticonos, usa **letras** o **símbolos simples**:

- `P` para Generador de **P**assword
- `T` para gestor de **T**areas
- `C` para **C**alculadora
- `N` para **N**otas
- `D` para **D**ibujante
- `M` para **M**usic Player
- etc.

O símbolos como:
- `∞` para calculadora o herramientas
- `◊` para gráficos
- `§` para documentos
- `↻` para conversores
- etc.

## 🔧 Funciones Disponibles

### `renderApps()`
Renderiza todas las apps disponibles en el grid.

```javascript
renderApps();
```

### `agregarApp(id, nombre, descripcion, icon, ruta)`
Agrega una nueva app dinámicamente.

```javascript
agregarApp('calculadora', 'Calculadora', 'Calcula operaciones matemáticas', 'C', './calculadora/index.html');
```

### `actualizarDisponibilidad(id, disponible)`
Oculta o muestra una app sin eliminarla.

```javascript
actualizarDisponibilidad('password-generator', false); // Ocultar
actualizarDisponibilidad('password-generator', true);  // Mostrar
```

## 📱 Requisitos para Nueva PWA

Cada PWA que agregues debe tener:

1. **index.html** - Archivo raíz
2. **styles.css** - Estilos (recomendado)
3. **script.js** - Lógica (recomendado)
4. **service-worker.js** - Para funcionalidad offline
5. **manifest.json** - Metadatos de la PWA

## 🎨 Guía de Estilo

Para mantener coherencia visual en todas las PWAs:

### Colores
- **Primarios**: Oro frío (#CFB53B) y Blanco marfil (#FFFFF0)
- **Secundarios**: Gris (#808080) y Azul obsidiana (#1F2937)

### Tipografía
- **Títulos**: `Playfair Display` (serif elegante)
- **Cuerpo**: `Montserrat` (sans-serif moderna)

(Importadas desde Google Fonts)

### Layout
- Responsive (mobile first)
- Máximo 700-1000px de ancho
- Padding 20-50px según tamaño de pantalla

## 📊 Estructura Recomendada de una PWA

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción">
    <meta name="theme-color" content="#CFB53B">
    <title>Mi App</title>
    <link rel="manifest" href="manifest.json">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Tu contenido aquí -->
    <script src="script.js"></script>
</body>
</html>
```

## 🌐 Desplegar en Línea

El portal y todas las PWAs pueden desplegarse en:
- **GitHub Pages** (gratis)
- **Netlify** (gratis)
- **Vercel** (gratis)
- Tu propio servidor

## 🔒 Privacidad y Seguridad

- Todas las apps funcionan en el navegador del usuario
- No se envían datos a servidores (a menos que la app lo requiera)
- Cada PWA puede tener su propio localStorage
- Los datos persisten localmente en el dispositivo

## 📚 Próximas PWAs Sugeridas

1. **Gestor de Tareas** - Organiza tus pendientes
2. **Calculadora** - Operaciones matemáticas
3. **Bloc de Notas** - Toma notas rápidas
4. **Conversor de Unidades** - Convierte medidas
5. **Generador de Colores** - Paletas de color
6. **Pomodoro Timer** - Técnica Pomodoro
7. **QR Generator** - Genera códigos QR
8. **Divisor de Gastos** - Calcula gastos compartidos

## 🆘 Troubleshooting

### Las apps no se cargan
- Verifica que las rutas en `script.js` sean correctas
- Usa paths relativos: `./nombre-carpeta/index.html`

### El portal no funciona offline
- Asegúrate de tener Service Worker habilitado
- Revisa la consola (F12) para errores

### Los estilos no se ven bien
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Verifica que Google Fonts cargue correctamente

## 📝 Changelog

**v1.0** - Lanzamiento inicial
- Portal centralizado
- Soporte para múltiples PWAs
- Service Worker para offline
- Diseño responsive

---

**Versión**: 1.0  
**Última actualización**: Marzo 2026  
**Licencia**: MIT
