document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.querySelector('.formulario-contacto');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let errores = [];

        if (nombre === '') {
            errores.push('El nombre es obligatorio.');
        }
        
        if (!regexEmail.test(email)) {
            errores.push('Por favor, ingresá un correo electrónico válido.');
        }

        if (servicio === '') {
            errores.push('Debés seleccionar un servicio de interés.');
        }

        if (mensaje === '') {
            errores.push('El mensaje no puede estar vacío.');
        }

        let contenedorMensajes = document.getElementById('form-mensajes');
        if (!contenedorMensajes) {
            contenedorMensajes = document.createElement('div');
            contenedorMensajes.id = 'form-mensajes';
            formulario.insertBefore(contenedorMensajes, formulario.firstChild);
        }

        if (errores.length > 0) {
            contenedorMensajes.innerHTML = `
                <div style="background-color: #ffe6e6; border-left: 4px solid #d9534f; padding: 10px; margin-bottom: 15px;">
                    <ul style="color: #d9534f; list-style: none; margin: 0; padding: 0;">
                        ${errores.map(error => `<li>⚠️ ${error}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            contenedorMensajes.innerHTML = `
                <div style="background-color: #e6f9e6; border-left: 4px solid #5cb85c; padding: 10px; margin-bottom: 15px;">
                    <p style="color: #5cb85c; margin: 0; font-weight: bold;">¡Todo correcto! Redirigiendo tu consulta...</p>
                </div>
            `;
            
            setTimeout(() => {
                formulario.submit();
            }, 1500);
        }
    });
});