const contenedor = document.getElementById("productos");
const selectCategoria = document.getElementById("categoria");
const inputPrecio = document.getElementById("precio");
const botonFiltrar = document.getElementById("filtrar");
const botonLimpiar = document.getElementById("limpiar");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>No se encontraron productos con esos filtros.</p>";
        return;
    }

    lista.forEach(function (producto) {
        const sinStock = producto.stock <= 0;
        contenedor.innerHTML += `
            <article class="producto-card ${sinStock ? 'sin-stock' : ''}">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy"
                     onerror="this.onerror=null;this.src='img/placeholder.svg';">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="categoria">${producto.categoria}</p>
                    <p class="marca">Marca: ${producto.marca}</p>
                    <p class="precio">${formatoPrecio(producto.precio)}</p>
                    <p class="stock ${sinStock ? 'agotado' : ''}">
                        ${sinStock ? "Sin stock" : `Stock: ${producto.stock}`}
                    </p>
                    <div class="acciones-producto">
                        <a href="detalle.html?id=${producto.id}" class="btn btn-secundario">Ver detalle</a>
                        ${!sinStock ? `
                            <button type="button" class="btn btn-principal" onclick="agregarDesdeCatalogo('${producto.id}')">
                                Agregar al carrito
                            </button>
                        ` : ""}
                    </div>
                </div>
            </article>
        `;
    });
}

function agregarDesdeCatalogo(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);

    if (!producto || producto.stock <= 0) {
        alert("Producto sin stock disponible.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(item => item.id === id);

    if (existente) {
        if (existente.cantidad + 1 > producto.stock) {
            alert("No hay suficiente stock disponible.");
            return;
        }
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`"${producto.nombre}" agregado al carrito.`);
}

function aplicarFiltros() {
    const productos = obtenerProductos();
    const cat = selectCategoria.value;
    const precioMax = inputPrecio.value !== "" ? Number(inputPrecio.value) : null;

    const filtrados = productos.filter(function (p) {
        const okCat = cat === "todas" || p.categoria === cat;
        const okPrecio = precioMax === null || p.precio <= precioMax;
        return okCat && okPrecio;
    });

    mostrarProductos(filtrados);
}

// Llenar categorías dinámicamente
function llenarCategorias() {
    const productos = obtenerProductos();
    const categorias = [...new Set(productos.map(p => p.categoria))];
    selectCategoria.innerHTML = '<option value="todas">Todas</option>';
    categorias.forEach(cat => {
        selectCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// Eventos
if (botonFiltrar) {
    botonFiltrar.addEventListener("click", aplicarFiltros);
}

if (botonLimpiar) {
    botonLimpiar.addEventListener("click", function () {
        selectCategoria.value = "todas";
        inputPrecio.value = "";
        mostrarProductos(obtenerProductos());
    });
}

// Inicializar
if (contenedor) {
    llenarCategorias();
    mostrarProductos(obtenerProductos());
}
