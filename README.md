# Sistema de insignias para fidelizar y premiar usuarios

---
## Desarrollo FrontEnd

**Versión:** 0.1.0

---
**Tecnologías Principales:**

- Vue.js 3.2.13: Un framework progresivo de JavaScript para construir interfaces de usuario.
- Vue Router 4.2.4: Para la gestión de rutas y navegación en la aplicación.
- Axios 1.4.0: Para realizar solicitudes HTTP a un servidor.
- Chart.js 4.4.0 y ECharts 5.4.3: Bibliotecas para crear gráficos y visualizaciones de datos.
- Vue Chart.js 5.2.0: Integración de Chart.js con Vue.js.
- Vue Material Design Icons 5.2.0: Iconos de diseño material para la interfaz de usuario.
- Vue Pagination 0.3.3: Componente de paginación para Vue.js.
- Tailwind CSS 3.3.3: Un marco de diseño CSS utilitario.

**Estructura del Proyecto:**

- La estructura principal del proyecto se encuentra en el directorio "SistemaInsignias".
- El archivo principal de la aplicación es "App.vue", que define la estructura principal de la aplicación.
- El archivo "main.js" es el punto de entrada de la aplicación donde se crea la instancia de la aplicación Vue y se monta en el elemento con el id "app" en el archivo HTML.
- El enrutamiento se configura en "router/index.js" utilizando Vue Router. Se definen rutas para las diferentes páginas de la aplicación.
- Las páginas de resumen y estadísticas se encuentran en las carpetas "pages/master" como "cHome.vue", "fidelizacion.vue" y "usabilidad.vue".
- La página de administración se encuentra en "pages/administrador.vue".
- Se utilizan estilos CSS en línea en los componentes y también se importa un archivo de estilos global "assets/css/app.css".

**Características Principales:**

- La aplicación tiene un sistema de navegación con rutas para la página de inicio, páginas de resumen y estadísticas, así como la página de administración.
- Se utilizan estilos CSS para el diseño de la interfaz de usuario, incluyendo menús desplegables y elementos visuales.
- Se integran bibliotecas de gráficos como Chart.js y ECharts para mostrar estadísticas.
- Se utilizan iconos de diseño material para la interfaz de usuario.
- La página de administración está destinada a cargar contenido relacionado con la aplicación móvil, como insignias, actividades, publicidades y cupones.

---
**Instalaciones recomendadas**

1. Node JS
2. VSCode - Visual Studio Code
3. Google Chrome
4. Vue CLI

---
**Project Setup**

```shell
npm install
```
**Compilación**

```shell
npm run serve
```
