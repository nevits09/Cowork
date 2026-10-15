# CoworkSpace Express — Sistema de Reserva en Vivo

Aplicación web interactiva para la gestión y reserva de salas de coworking en tiempo real, con algoritmo de detección dinámica de solapamientos horarios y visualización interactiva de disponibilidad.

---

## Estructura del Proyecto

El proyecto está desacoplado en tres capas modulares siguiendo las mejores prácticas de desarrollo web:

```text
SRUM/
├── index.html        # Estructura semántica (HTML5)
├── front.css         # Estilos, sistema de diseño, tema oscuro y diseño responsivo
├── funciones.js      # Lógica de negocio, validaciones y reactividad del DOM
└── README.md         # Documentación técnica y guía de despliegue
```

---

## Características Principales

1. **Detección Dinámica de Solapamientos**:
   - Implementa la condición de choque horario:
     $$\text{nuevo\_inicio} < \text{reserva\_fin} \quad \land \quad \text{nuevo\_fin} > \text{reserva\_inicio}$$
   - Identifica con precisión cuál es la reserva existente en conflicto.

2. **Validación de Reglas de Negocio**:
   - Rango horario hábil restringido de **08:00 a 18:00**.
   - Verificación de que la hora de inicio sea estrictamente menor a la hora de fin.
   - Prevención de valores nulos o no numéricos.

3. **Línea de Tiempo Visual en Tiempo Real**:
   - Gráfico de disponibilidad hora por hora (8:00 a 18:00).
   - Indicador dinámico de bloques ocupados (*rojo*) y disponibles (*gris azulado*).
   - Lista actualizada de reservas registradas mediante chips identificadores.

4. **Interfaz Moderna y Responsiva**:
   - Paleta de colores en modo oscuro con efecto *glassmorphism*.
   - Tipografía moderna (*Plus Jakarta Sans*).
   - Adaptable a dispositivos móviles y escritorios.

5. **Soporte Multi-Aula**:
   - Selector dinámico de espacios (**Sala Focus A**, **Aula Innovación B** y **Aula Creativa C**).
   - Horarios, validación de solapamientos y cronograma visual independientes por cada aula.

---

## Ejecución Local

Al ser una aplicación web estática (Vanilla HTML/CSS/JS), **no requiere instalación previa de dependencias ni compilación**.

### Opción 1: Apertura directa
1. Haz doble clic en el archivo `index.html`.
2. Se abrirá automáticamente en tu navegador web predeterminado (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, etc.).

### Opción 2: Con servidor local de desarrollo (Live Server / Python / Node)
Si prefieres servirla mediante un servidor HTTP local:

* **Con Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Accede en tu navegador a: `http://localhost:8000`

* **Con Node.js (npx):**
  ```bash
  npx serve .
  ```

* **Con VS Code / Antigravity IDE:**
  - Clic derecho sobre `index.html` → **Open with Live Server**.

---

## Guía de Despliegue en Producción

Dado que el proyecto está compuesto por archivos estáticos, su despliegue es rápido, económico o 100% gratuito en cualquier proveedor de hosting moderno:

### 1. Despliegue en GitHub Pages (Recomendado - Gratuito)
1. Inicializa un repositorio Git y sube los archivos a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: CoworkSpace Express inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, entra en tu repositorio y ve a **Settings** → pestaña **Pages**.
3. En **Branch**, selecciona `main` y la carpeta `/(root)`.
4. Haz clic en **Save**. En un par de minutos tu sitio estará en vivo en:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

---

### 2. Despliegue en Netlify (Instantáneo por Drag & Drop)
1. Inicia sesión en [Netlify](https://www.netlify.com/).
2. Dirígete a la sección **Sites** y arrastra la carpeta `SRUM` completa directamente sobre el recuadro **"Drag and drop your site folder here"**.
3. En segundos, Netlify generará una URL pública HTTPS lista para compartir.

---

### 3. Despliegue en Vercel
1. Instala el CLI de Vercel si no lo tienes:
   ```bash
   npm i -g vercel
   ```
2. En la raíz de la carpeta `SRUM`, ejecuta:
   ```bash
   vercel
   ```
3. Sigue las instrucciones interactivas (presiona `Enter` para aceptar las configuraciones por defecto) y obtendrás tu URL pública instantánea.

---

### 4. Despliegue en un Hosting Tradicional / Servidor Web (Apache / Nginx / cPanel)
1. Conéctate a tu servidor vía FTP/SFTP o ingresa al Administrador de Archivos de cPanel.
2. Sube los archivos `index.html`, `front.css` y `funciones.js` a la carpeta raíz pública (usualmente `public_html` o `/var/www/html/`).
3. Comprueba los permisos de lectura (`644` para archivos). El sitio quedará disponible bajo tu dominio propio.

---

## Tecnologías Empleadas

- **HTML5:** Estructura semántica, accesibilidad y etiquetas meta viewport.
- **CSS3:** Flexbox, CSS Grid, variables personalizadas (`:root`), animaciones y media queries.
- **JavaScript (ES6+):** Manipulación del DOM, métodos de arrays (`.some()`, `.find()`, `.forEach()`), desestructuración y plantillas literales.
