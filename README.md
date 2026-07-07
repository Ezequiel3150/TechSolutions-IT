# TechSolutions IT - Consultoría Tecnológica

Este proyecto es una Landing Page corporativa desarrollada para la pre-entrega del curso **Talento Tech**. La web presenta a **TechSolutions IT**, una empresa dedicada a brindar soluciones de software e infraestructura de alto rendimiento, aplicando las mejores prácticas de maquetación moderna y desarrollo frontend dinámico.

## 🚀 Características Técnicas y Funcionalidades

El proyecto evolucionó de una maqueta estática a una aplicación web dinámica e interactiva:

*   **Renderizado Dinámico (Fetch API):** Los servicios ofrecidos ya no están hardcodeados en el HTML. Se generan dinámicamente consumiendo datos desde una API local (`servicios.json`) mediante Promesas (`async/await`).
*   **Carrito de Compras Funcional:**
    *   **Interactividad:** Los usuarios pueden agregar productos, modificar cantidades (sumar/restar) o eliminar ítems directamente desde un panel lateral (*Offcanvas*).
    *   **Cálculo en Tiempo Real:** El total de la compra y el contador del icono en la barra de navegación se actualizan automáticamente al interactuar con el carrito.
    *   **Persistencia de Datos:** Se implementó `localStorage` para garantizar que el estado del carrito (productos seleccionados) no se pierda si el usuario recarga o cierra la pestaña.
*   **Validación de Formulario:** Antes de enviar consultas vía **Formspree**, el sistema valida mediante JavaScript (DOM Manipulation) que no existan campos vacíos y comprueba el formato correcto del correo electrónico usando Expresiones Regulares (Regex). Las alertas de error se inyectan en pantalla sin recargar la página.
*   **Diseño Responsivo y Multimedia:**
    *   Uso de **Flexbox** y **CSS Grid** para organizar tarjetas de servicios y grillas de testimonios.
    *   Integración de un **Video Hero** reproduciéndose en segundo plano.
*   **SEO y Accesibilidad:** Implementación de etiquetas *meta* descriptivas para motores de búsqueda, atributos `aria-label` para botones interactivos sin texto visible (mejorando el uso de lectores de pantalla) e indicadores visuales de foco (`outline`) para garantizar una correcta navegación mediante teclado.

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Estructura y contenido semántico.
*   **CSS3:** Flexbox, Grid, transiciones y *offcanvas*.
*   **JavaScript (Vanilla JS):** Manipulación del DOM, Fetch API, LocalStorage y Event Delegation.
*   **Formspree:** Backend as a Service para procesamiento de correos.

## 📂 Estructura del Proyecto

*   `index.html`: Estructura principal de la landing page.
*   `style.css`: Hoja de estilos principal.
*   `script.js`: Archivo con toda la lógica interactiva, consumo de API y validaciones.
*   `servicios.json`: Base de datos simulada (API local) con la información de los productos.
*   `/servicios`: Imágenes correspondientes a las tarjetas de servicios IT.
*   `/clientes`: Fotografías de perfil para la sección de testimonios.

---
**Desarrollado por:** Ezequiel Acosta
**Ubicación:** Grand Bourg, Buenos Aires.