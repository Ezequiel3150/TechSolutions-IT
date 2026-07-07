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
    
    const contenedorServicios = document.getElementById('contenedor-servicios');

    const obtenerServicios = async () => {
        try {
            const respuesta = await fetch('servicios.json');
            const servicios = await respuesta.json();

            servicios.forEach(servicio => {
                
                const tarjeta = document.createElement('article');
                
                tarjeta.innerHTML = `
                    <img src="${servicio.imagen}" alt="${servicio.titulo}">
                    <h3>${servicio.titulo}</h3>
                    <p>${servicio.descripcion}</p>
                    <p style="font-weight: bold; color: #00b4d8; font-size: 1.2rem; margin-bottom: 1rem;">
                        $${servicio.precio.toLocaleString('es-AR')}
                    </p>
                    <button class="btn-agregar" data-id="${servicio.id}" style="background-color: #00b4d8; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 80%; margin-bottom: 1rem;">
                        Añadir al carrito
                    </button>
                `;

                contenedorServicios.appendChild(tarjeta);
            });

        } catch (error) {
            console.error("Hubo un error al cargar los servicios:", error);
            contenedorServicios.innerHTML = '<p style="text-align:center;">Error al cargar los servicios disponibles.</p>';
        }
    };

    obtenerServicios();
    const botonAbrirCarrito = document.getElementById('abrir-carrito');
    const botonCerrarCarrito = document.getElementById('cerrar-carrito');
    const modalCarrito = document.getElementById('modal-carrito');

    
    botonAbrirCarrito.addEventListener('click', (e) => {
        e.preventDefault(); 
        modalCarrito.classList.add('carrito-abierto');
    });

    botonCerrarCarrito.addEventListener('click', () => {
        modalCarrito.classList.remove('carrito-abierto');
    });
    
    let carrito = JSON.parse(localStorage.getItem('carritoTechSolutions')) || [];
    
    const listaCarritoDOM = document.getElementById('lista-carrito');
    const contadorCarritoDOM = document.getElementById('contador-carrito');
    const precioTotalDOM = document.getElementById('precio-total');

    const actualizarCarrito = () => {
        listaCarritoDOM.innerHTML = ''; 

        if (carrito.length === 0) {
            listaCarritoDOM.innerHTML = '<p style="text-align: center; color: #777;">El carrito está vacío.</p>';
            contadorCarritoDOM.textContent = 0;
            precioTotalDOM.textContent = '0';
        } else {
            let totalAcumulado = 0;
            let cantidadTotal = 0;

            carrito.forEach((producto) => {
                totalAcumulado += producto.precio * producto.cantidad;
                cantidadTotal += producto.cantidad;

                const itemCarrito = document.createElement('div');
                itemCarrito.style.cssText = "display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;";
                
                itemCarrito.innerHTML = `
                    <div style="flex:1;">
                        <h4 style="font-size: 0.9rem; margin:0; color: #0a192f;">${producto.titulo}</h4>
                        <p style="margin:0; font-size: 0.8rem; color: #777;">$${producto.precio.toLocaleString('es-AR')}</p>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button class="btn-restar" data-id="${producto.id}" aria-label="Restar una unidad" style="padding: 2px 8px; cursor: pointer;">-</button>
                        <span style="font-weight:bold;">${producto.cantidad}</span>
                        <button class="btn-sumar" data-id="${producto.id}" aria-label="Sumar una unidad" style="padding: 2px 8px; cursor: pointer;">+</button>
                        <button class="btn-eliminar" data-id="${producto.id}" aria-label="Eliminar producto del carrito" style="background-color: #d9534f; color: white; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; margin-left: 10px;">X</button>
                    </div>
                `;
                listaCarritoDOM.appendChild(itemCarrito);
            });

            contadorCarritoDOM.textContent = cantidadTotal;
            precioTotalDOM.textContent = totalAcumulado.toLocaleString('es-AR');
        }

        localStorage.setItem('carritoTechSolutions', JSON.stringify(carrito));
    };

    contenedorServicios.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            const idServicioClickeado = parseInt(e.target.dataset.id);
            
            const respuesta = await fetch('servicios.json');
            const serviciosDB = await respuesta.json();
            const servicioEncontrado = serviciosDB.find(serv => serv.id === idServicioClickeado);

            const existeEnCarrito = carrito.find(item => item.id === idServicioClickeado);
            
            if (existeEnCarrito) {
                existeEnCarrito.cantidad++; 
            } else {
                carrito.push({
                    id: servicioEncontrado.id,
                    titulo: servicioEncontrado.titulo,
                    precio: servicioEncontrado.precio,
                    cantidad: 1
                });
            }
            
            alert(`¡Se añadió "${servicioEncontrado.titulo}" al carrito!`);
            actualizarCarrito();
        }
    });

    listaCarritoDOM.addEventListener('click', (e) => {
        const idProducto = parseInt(e.target.dataset.id);
        
        if (e.target.classList.contains('btn-sumar')) {
            const producto = carrito.find(item => item.id === idProducto);
            producto.cantidad++;
            actualizarCarrito();
        }

        if (e.target.classList.contains('btn-restar')) {
            const producto = carrito.find(item => item.id === idProducto);
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito = carrito.filter(item => item.id !== idProducto);
            }
            actualizarCarrito();
        }

        if (e.target.classList.contains('btn-eliminar')) {
            carrito = carrito.filter(item => item.id !== idProducto);
            actualizarCarrito();
        }
    });

    actualizarCarrito();

    const btnComprar = document.getElementById('btn-comprar');

    btnComprar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. ¡Agregá algún servicio primero!');
            return; 
        }
        alert('¡Compra finalizada con éxito! El servicio ya es tuyo.');

        carrito = [];

        actualizarCarrito();

        modalCarrito.classList.remove('carrito-abierto');
    });
});