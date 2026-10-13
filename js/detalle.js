const contenedor = document.getElementById("detalleProducto");

const parametros = new URLSearchParams(window.location.search);

const idProducto = parametros.get("id");

// Obtenemos todos los productos
const listaProductos = obtenerProductos();

// Buscamos el producto seleccionado
const producto = listaProductos.find(function(p) {
    return p.id === idProducto;
});

if (producto) {

    const sinStock = producto.stock <= 0;

    contenedor.innerHTML = `
        <article class="detalle-producto">

            <div class="detalle-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="this.onerror=null;this.src='img/placeholder.svg';"
                >

            </div>

            <div class="detalle-info">

                <h2>${producto.nombre}</h2>

                <p>
                    <strong>Código:</strong>
                    ${producto.id}
                </p>

                <p>
                    <strong>Categoría:</strong>
                    ${producto.categoria}
                </p>

                <p>
                    <strong>Subcategoría:</strong>
                    ${producto.subcategoria}
                </p>

                <p>
                    <strong>Marca:</strong>
                    ${producto.marca}
                </p>

                <p>
                    <strong>Unidad:</strong>
                    ${producto.unidad}
                </p>

                <p>
                    <strong>Precio:</strong>
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${producto.stock}
                </p>

                <p>
                    <strong>Descripción:</strong>
                    ${producto.descripcion}
                </p>

                ${
                    !sinStock
                    ? `
                        <label for="cantidad">
                            Cantidad:
                        </label>

                        <input
                            type="number"
                            id="cantidad"
                            value="1"
                            min="1"
                            max="${producto.stock}"
                        >

                        <br><br>

                        <button
                            type="button"
                            id="agregarCarrito"
                        >
                            Agregar al carrito
                        </button>
                    `
                    : `
                        <p>
                            Producto agotado.
                        </p>
                    `
                }

            </div>

        </article>
    `;


    const botonCarrito =
        document.getElementById("agregarCarrito");


    if (botonCarrito) {

        botonCarrito.addEventListener(
            "click",
            function() {

                const cantidad =
                    Number(
                        document.getElementById("cantidad").value
                    );


                if (cantidad < 1) {

                    alert(
                        "La cantidad debe ser mayor a 0."
                    );

                    return;
                }


                if (cantidad > producto.stock) {

                    alert(
                        "No hay suficiente stock."
                    );

                    return;
                }


                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                const productoExistente =
                    carrito.find(function(item) {

                        return item.id === producto.id;

                    });


                if (productoExistente) {

                    if (
                        productoExistente.cantidad + cantidad
                        > producto.stock
                    ) {

                        alert(
                            "No puedes agregar más unidades de este producto."
                        );

                        return;
                    }


                    productoExistente.cantidad += cantidad;

                } else {

                    carrito.push({

                        id: producto.id,

                        nombre: producto.nombre,

                        precio: producto.precio,

                        cantidad: cantidad

                    });

                }


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );


                alert(
                    "Producto agregado al carrito."
                );

            }
        );

    }

} else {

    contenedor.innerHTML = `

        <h2>Producto no encontrado</h2>

        <p>
            El producto que estás buscando no existe.
        </p>

        <a href="catalogo.html">
            Volver al catálogo
        </a>

    `;

}