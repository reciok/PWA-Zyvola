# 🔐 Generador de Contraseñas PWA

Una aplicación web progresiva (PWA) moderna para generar contraseñas seguras y personalizadas.

## ✨ Características

- **Generación Rápida**: Crea contraseñas fuertes al instante
- **Personalizable**: Elige la longitud y tipos de caracteres
- **Indicador de Fortaleza**: Visualiza la seguridad en tiempo real
- **Historial Local**: Mantiene un registro de tus últimas 10 contraseñas
- **Soporte Offline**: Funciona completamente sin conexión a internet
- **Responsive**: Diseño adaptado para móviles, tablets y escritorio
- **Instalable**: Instálala como una aplicación nativa en tu dispositivo
- **Privacidad**: Las contraseñas se generan localmente, nunca se envían a servidores

## 🎨 Paleta de Colores

- **Primarios**: Oro Frío (#CFB53B) y Blanco Marfil (#FFFFF0)
- **Secundarios**: Gris (#808080) y Azul Obsidiana (#1F2937)
- **Indicadores**: Verde Éxito, Rojo Débil, Amarillo Medio

## 🚀 Cómo Usar

### En el Navegador
1. Abre `index.html` en tu navegador
2. Configura las opciones deseadas
3. Haz clic en "Generar Contraseña"
4. Copia la contraseña con el botón de copiar

### Como PWA Instalada

#### Desde Chrome/Edge (Desktop)
1. Abre `index.html`
2. Haz clic en el ícono de instalación en la barra de direcciones
3. ¡Listo! La app se abrirá como una aplicación independiente

#### Desde Navegadores Móviles
1. Abre `index.html` en tu navegador
2. Toca el ícono de menú
3. Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"

## ⚙️ Opciones de Configuración

### Longitud de Contraseña
- Rango: 8 a 32 caracteres
- Por defecto: 16 caracteres

### Tipos de Caracteres
- **Mayúsculas (A-Z)**: Activado por defecto
- **Minúsculas (a-z)**: Activado por defecto
- **Números (0-9)**: Activado por defecto
- **Símbolos (!@#$%^&*)**: Activado por defecto

## 📊 Indicador de Fortaleza

- 🔴 **Muy débil**: Menos de 30 puntos
- 🟠 **Débil**: 30-50 puntos
- 🟡 **Media**: 50-70 puntos
- 🟢 **Fuerte**: 70-85 puntos
- 🟢 **Muy fuerte**: Más de 85 puntos

## 🔒 Seguridad

- Las contraseñas se generan directamente en tu navegador
- No se envía información a ningún servidor
- El historial se almacena localmente en tu dispositivo
- Puedes limpiar el historial en cualquier momento
- Compatible con políticas de privacidad más estrictas

## 📱 Compatibilidad

- **Navegadores**: Chrome, Edge, Firefox, Safari (versiones recientes)
- **Sistemas Operativos**: Windows, macOS, Linux, iOS, Android
- **Requisitos**: Soporte para Web Workers y localStorage

## 🔧 Archivos Incluidos

```
Generador de contraseñas/
├── index.html           # Estructura HTML
├── styles.css           # Estilos y diseño
├── script.js            # Lógica de la aplicación
├── service-worker.js    # Soporte offline
├── manifest.json        # Configuración PWA
└── README.md           # Esta documentación
```

## ⌨️ Atajos de Teclado

- **Ctrl+C / Cmd+C**: Copia la contraseña actual
- **Enter**: Genera nueva contraseña (en navegadores soportados)

## 💾 Almacenamiento

El historial de contraseñas se almacena en `localStorage` del navegador:
- Máximo: 10 contraseñas
- Persiste entre sesiones
- Se borra solo si limpias los datos del navegador

## 🌙 Modo Oscuro

La aplicación detecta automáticamente tu preferencia de tema:
- Si tu sistema está en modo oscuro, la app se adaptará
- Los colores se invertirán manteniendo la legibilidad

## 📊 Fórmula de Cálculo de Fortaleza

```
Longitud:
- 8+ caracteres: +20 puntos
- 12+ caracteres: +20 puntos
- 16+ caracteres: +20 puntos

Complejidad (cada tipo presente):
- Mayúsculas: +10 puntos
- Minúsculas: +10 puntos
- Números: +10 puntos
- Símbolos: +10 puntos

Total máximo: 80 puntos
```

## 🎯 Próximas Características

- [ ] Soporte para temas personalizados
- [ ] Generador de frases de contraseña
- [ ] Exportar contraseñas a archivo
- [ ] Sincronización entre dispositivos
- [ ] Análisis de contraseña comprometida

## 📝 Notas

- Siempre verifica que tu navegador soporte PWA para versión instalada
- Para máxima seguridad, genera nuevas contraseñas para cada servicio
- Un buen gestor de contraseñas complementa esta herramienta
- No reutilices contraseñas entre diferentes plataformas

## 🌐 Funcionamiento Offline

Una vez instalada, la aplicación:
- Funciona sin conexión a internet
- Carga rápidamente desde el caché
- Sincroniza en segundo plano cuando hay conexión
- Mantiene tu historial seguro localmente

## ❓ Preguntas Frecuentes

**¿Dónde se guardan mis contraseñas?**
Solo en tu navegador, en tu dispositivo. Nunca se envían a servidores.

**¿Puedo usar esto en mi móvil?**
Sí, es completamente responsivo y funcionará en cualquier dispositivo.

**¿Es gratis?**
Completamente gratis y de código abierto.

**¿Es seguro?**
Sí, la generación es aleatoria y local. No hay conexiones externas.

---

**Versión**: 1.0  
**Última actualización**: Marzo 2026  
**Licencia**: MIT
