document.addEventListener("DOMContentLoaded", function () {
    // Productos destacados en index
    const contDestacados = document.getElementById("productosDestacados");
    if (contDestacados) {
        const prods = obtenerProductos().slice(0, 3);
        contDestacados.innerHTML = prods.map(p => `
            <article class="producto-card">
                <img src="${p.imagen}" alt="${p.nombre}" onerror="this.onerror=null;this.src='img/placeholder.svg';">
                <div class="producto-info">
                    <h3>${p.nombre}</h3>
                    <p class="precio">${formatoPrecio(p.precio)}</p>
                    <a href="detalle.html?id=${p.id}" class="btn btn-secundario">Ver detalle</a>
                </div>
            </article>
        `).join("");
    }

    // Formulario de contacto
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", function (e) {
            e.preventDefault();
            const nombre = document.getElementById("nombreContacto").value.trim();
            const correo = document.getElementById("correoContacto").value.trim();
            const mensaje = document.getElementById("mensajeContacto").value.trim();

            if (!nombre || !correo || !mensaje) {
                alert("Por favor completa todos los campos del formulario.");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                alert("Ingresa un correo electrónico válido.");
                return;
            }

            alert("¡Gracias por tu consulta! Nos pondremos en contacto pronto.");
            formContacto.reset();
        });
    }

    // Mostrar usuario logueado en nav (si existe)
    const usuario = obtenerUsuarioActual();
    const spanUsuario = document.getElementById("usuarioNav");
    if (spanUsuario && usuario) {
        spanUsuario.innerHTML = `Hola, ${usuario.nombre} | <a href="#" id="cerrarSesion">Cerrar sesión</a>`;
        document.getElementById("cerrarSesion")?.addEventListener("click", function (e) {
            e.preventDefault();
            cerrarSesion();
            location.reload();
        });
    }
});
