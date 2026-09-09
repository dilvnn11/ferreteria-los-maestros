const contenedor = document.getElementById("carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="mensaje-vacio">El carrito está vacío.</p>
            <a href="catalogo.html" class="btn">Ir al catálogo</a>
        `;
        return;
    }

    let total = 0;
    let html = `<div class="carrito-lista">`;

    carrito.forEach(function (item, indice) {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
            <article class="item-carrito">
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>Precio unitario: ${formatoPrecio(item.precio)}</p>
                    <p>Subtotal: <strong>${formatoPrecio(subtotal)}</strong></p>
                </div>
                <div class="item-acciones">
                    <div class="cantidad-control">
                        <button type="button" onclick="disminuir(${indice})" aria-label="Disminuir">−</button>
                        <span>${item.cantidad}</span>
                        <button type="button" onclick="aumentar(${indice})" aria-label="Aumentar">+</button>
                    </div>
                    <button type="button" class="btn-eliminar" onclick="eliminar(${indice})">Eliminar</button>
                </div>
            </article>
        `;
    });

    html += `</div>
        <div class="carrito-total">
            <h2>Total: ${formatoPrecio(total)}</h2>
            <div class="acciones-carrito">
                <button type="button" class="btn btn-secundario" onclick="vaciarCarrito()">Vaciar carrito</button>
                <button type="button" class="btn btn-principal" onclick="finalizarCompra()">Finalizar compra</button>
            </div>
        </div>
    `;

    contenedor.innerHTML = html;
}

function aumentar(indice) {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productos = obtenerProductos();
    const prod = productos.find(p => p.id === carrito[indice].id);

    if (prod && carrito[indice].cantidad < prod.stock) {
        carrito[indice].cantidad++;
        guardarCarrito();
        mostrarCarrito();
    } else {
        alert("No hay más stock disponible de este producto.");
    }
}

function disminuir(indice) {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
        guardarCarrito();
        mostrarCarrito();
    }
}

function eliminar(indice) {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1);
    guardarCarrito();
    mostrarCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Deseas vaciar todo el carrito?")) {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    }
}

function finalizarCompra() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const productos = obtenerProductos();

    // Verificar stock real
    for (const item of carrito) {
        const prod = productos.find(p => p.id === item.id);
        if (!prod || prod.stock < item.cantidad) {
            alert(`Stock insuficiente para "${item.nombre}". Disponible: ${prod ? prod.stock : 0}`);
            return;
        }
    }

    // Descontar stock
    carrito.forEach(item => {
        actualizarStock(item.id, item.cantidad);
    });

    // Limpiar carrito
    carrito = [];
    guardarCarrito();

    alert("¡Compra realizada con éxito! Gracias por preferir Ferretería Los Maestros.");
    window.location.href = "index.html";
}

// Inicializar
if (contenedor) {
    mostrarCarrito();
}
