# Web educativa sobre ética profesional

Este proyecto es una web educativa que enseña sobre la ética profesional. La web tiene dos tipos de usuarios: profesor y alumno. El alumno tiene que pasar los módulos y completar las diferentes pruebas que le sumarán puntos. El profesor tiene la capacidad de ver el progreso de todos sus alumnos, el puntaje que llevan y la cantidad de módulos que han completado. El objetivo de este proyecto es ofrecer una plataforma interactiva y dinámica para aprender sobre la ética profesional de forma divertida y eficaz.

## Tecnologías usadas

Este proyecto está desarrollado con las siguientes tecnologías:

- Node.js: entorno de ejecución para JavaScript que permite crear aplicaciones web del lado del servidor.
- Express: framework para Node.js que facilita la creación de servidores web y el manejo de rutas, peticiones y respuestas.
- JQuery: biblioteca multiplataforma de JavaScript que simplifica la interacción con documentos HTML, manipulación del árbol DOM, manejo de eventos, desarrollo de animaciones y agregado de interacción con AJAX a páginas web.
- MySQL: sistema de gestión de bases de datos relacionales que almacena y organiza la información de la web.
- BulmaCSS: framework CSS que provee componentes y estilos para crear interfaces web responsivas y modernas.

## Instalación y configuración

Para instalar y configurar este proyecto, se deben seguir los siguientes pasos:

1. Clonar o descargar el repositorio desde github.
2. Instalar Node.js y MySQL en el sistema operativo.
3. Crear una base de datos llamada "db_etica" en MySQL y ejecutar el script "db.sql" que se encuentra en la carpeta "database" del proyecto.
4. Instalar las dependencias del proyecto con el comando `npm install` en la terminal desde la carpeta raíz del proyecto.
5. Crear un archivo ".env" en la carpeta raíz del proyecto y agregar las variables de entorno necesarias para la conexión con la base de datos y el servidor, como por ejemplo:

`DB_HOST=localhost`  

`DB_USER=root`  

`DB_PASSWORD=1234`  

`DB_NAME=db_etica`

6. Iniciar el servidor con el comando `npm start` en la terminal desde la carpeta raíz del proyecto.
7. Abrir un navegador web y acceder a la dirección "http://localhost:3000" o la que se haya configurado para abrir el servidor de nodejs.

## Uso de la web

La web tiene dos tipos de usuarios: profesor y alumno. Cada uno tiene un rol diferente y puede acceder a distintas funcionalidades.

### Profesor

El profesor puede registrarse e iniciar sesión con su correo electrónico y contraseña. Una vez dentro, puede ver una lista de todos sus alumnos, con su nombre, correo electrónico, puntaje total y módulos completados. También puede ver el detalle de cada alumno, con las pruebas que ha realizado y los puntos que ha obtenido. El profesor puede crear tantas clases como quiera y eliminarlas cuando ya no las necesite.

### Alumno

El alumno puede registrarse e iniciar sesión con su correo electrónico y contraseña. Una vez dentro, puede ver una lista de los módulos disponibles, con su nombre, descripción y estado (bloqueado o desbloqueado). Para desbloquear un módulo, el alumno debe completar el módulo anterior. Cada módulo consta de una lección teórica y una prueba práctica. La lección teórica contiene información sobre aspectos de la ética profesional. La prueba práctica contiene preguntas sobre la lección, con opciones múltiples o verdadero/falso. El alumno debe responder todas las preguntas para completar el módulo y obtener puntos. El alumno puede ver su puntaje total y su progreso desde el menú de inicio.

## Objetivos y motivaciones

El objetivo principal de este proyecto es crear una web educativa que enseñe sobre la ética profesional, un tema muy importante para el desarrollo personal y profesional de las personas. La ética profesional se refiere al conjunto de normas, valores y principios que guían el comportamiento de los profesionales en su ámbito laboral, respetando los derechos, intereses y bienestar de los demás. La web ofrece una plataforma interactiva y dinámica para aprender sobre la ética profesional, mediante módulos que combinan teoría y práctica, con ejemplos y casos reales. La web también motiva a los alumnos a aprender y mejorar su puntaje, mediante un sistema de gamificación que les otorga puntos por cada prueba que completan. Así, la web contribuye a la formación de profesionales éticos, responsables y comprometidos con la sociedad. Además, este proyecto me ha servido para aprender sobre nodejs, conexión a base de datos y aumentar mis habilidades en el desarrollo web, lo cual es otro objetivo personal que me he propuesto.

## Desafíos y dificultades

Algunos de los desafíos y dificultades que enfrenté al desarrollar este proyecto fueron:

- Crear un servidor web con Node.js y Express que manejara las peticiones y respuestas de la web, así como la conexión con la base de datos.
- Implementar un sistema de autenticación y autorización para los usuarios, usando sesiones y cookies.
- Crear el contenido de los módulos, las lecciones y las pruebas, investigando sobre el tema de la ética profesional y buscando ejemplos y casos reales.
- Implementar un sistema de gamificación que otorgara puntos a los alumnos por cada prueba que completaran y que mostrara su progreso y puntaje.
- Realizar pruebas y depuración del código para asegurar el correcto funcionamiento de la web.

## Créditos y agradecimientos

Quiero agradecer a las siguientes fuentes y recursos que me ayudaron a desarrollar este proyecto:

- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- JQuery: https://jquery.com/
- MySQL: https://www.mysql.com/
- BulmaCSS: https://bulma.io/
