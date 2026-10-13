const productosBase = [

    {
        id: "MC001",
        nombre: "Cemento Polpaico gris 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Cementos",
        marca: "Polpaico",
        unidad: "Saco",
        precio: 5990,
        stock: 80,
        stockMinimo: 20,
        descripcion: "Cemento gris para trabajos generales de construcción.",
        imagen: "img/MC001.png"
    },

    {
        id: "MC002",
        nombre: "Cemento Melón blanco 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Cementos",
        marca: "Melón",
        unidad: "Saco",
        precio: 7490,
        stock: 40,
        stockMinimo: 10,
        descripcion: "Cemento blanco para trabajos de construcción y terminaciones.",
        imagen: "img/MC002.jpg"
    },

    {
        id: "MC003",
        nombre: "Mortero cola cerámica 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Morteros",
        marca: "Volcán",
        unidad: "Saco",
        precio: 5200,
        stock: 50,
        stockMinimo: 15,
        descripcion: "Mortero adhesivo para instalación de cerámicas.",
        imagen: "img/MC003.jfif"
    },

    {
        id: "MC004",
        nombre: "Mortero nivelador piso 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Morteros",
        marca: "Weber",
        unidad: "Saco",
        precio: 6490,
        stock: 30,
        stockMinimo: 10,
        descripcion: "Mortero para nivelar superficies antes de instalar pisos.",
        imagen: "img/MC004.jfif"
    },

    {
        id: "MC005",
        nombre: "Arena fina construcción 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Áridos",
        marca: "Granel",
        unidad: "Saco",
        precio: 1800,
        stock: 60,
        stockMinimo: 20,
        descripcion: "Arena fina para mezclas y trabajos generales de construcción.",
        imagen: "img/MC005.jfif"
    },

    {
        id: "MC006",
        nombre: "Ripio 25 kg",
        categoria: "Mat. Construcción",
        subcategoria: "Áridos",
        marca: "Granel",
        unidad: "Saco",
        precio: 1500,
        stock: 60,
        stockMinimo: 20,
        descripcion: "Ripio para preparación de hormigón y trabajos de construcción.",
        imagen: "img/MC006.jpg"
    },

    {
        id: "MC007",
        nombre: "Ladrillo fiscal N°5",
        categoria: "Mat. Construcción",
        subcategoria: "Ladrillos",
        marca: "Local",
        unidad: "Unidad",
        precio: 380,
        stock: 500,
        stockMinimo: 100,
        descripcion: "Ladrillo fiscal tradicional para muros y tabiques.",
        imagen: "img/MC007.jpg"
    },

    {
        id: "MC008",
        nombre: "Ladrillo prensado 6x14x29 cm",
        categoria: "Mat. Construcción",
        subcategoria: "Ladrillos",
        marca: "Melón",
        unidad: "Unidad",
        precio: 550,
        stock: 300,
        stockMinimo: 80,
        descripcion: "Ladrillo prensado de alta resistencia.",
        imagen: "img/MC008.jfif"
    },

    {
        id: "MC009",
        nombre: "Bloque de hormigón 19x19x39 cm",
        categoria: "Mat. Construcción",
        subcategoria: "Bloques",
        marca: "Volcán",
        unidad: "Unidad",
        precio: 1200,
        stock: 200,
        stockMinimo: 50,
        descripcion: "Bloque de hormigón para muros estructurales.",
        imagen: "img/MC009.jfif"
    },

    {
        id: "MC010",
        nombre: "Bloque liviano 10x20x40 cm",
        categoria: "Mat. Construcción",
        subcategoria: "Bloques",
        marca: "Ytong",
        unidad: "Unidad",
        precio: 1690,
        stock: 100,
        stockMinimo: 30,
        descripcion: "Bloque liviano ideal para tabiques.",
        imagen: "img/MC010.jfif"
    },

    {
        id: "PT001",
        nombre: "Pintura látex interior 1 galón blanco",
        categoria: "Pinturas",
        subcategoria: "Látex",
        marca: "Sipa",
        unidad: "Galón",
        precio: 9990,
        stock: 40,
        stockMinimo: 10,
        descripcion: "Pintura látex lavable para interiores.",
        imagen: "img/PT001.jpg"
    },

    {
        id: "PT002",
        nombre: "Pintura látex interior 4 litros (varios col.)",
        categoria: "Pinturas",
        subcategoria: "Látex",
        marca: "Sipa",
        unidad: "Envase 4L",
        precio: 12990,
        stock: 30,
        stockMinimo: 8,
        descripcion: "Pintura látex interior en presentación de 4 litros.",
        imagen: "img/PT002.jfif"
    },

    {
        id: "PT003",
        nombre: "Esmalte al agua interior blanco 1 galón",
        categoria: "Pinturas",
        subcategoria: "Esmalte",
        marca: "Sipa",
        unidad: "Galón",
        precio: 11990,
        stock: 25,
        stockMinimo: 8,
        descripcion: "Esmalte al agua de secado rápido para interiores.",
        imagen: "img/PT003.webp"
    },

    {
        id: "PT004",
        nombre: "Esmalte sintético brillante blanco 1 galón",
        categoria: "Pinturas",
        subcategoria: "Esmalte",
        marca: "Sipa",
        unidad: "Galón",
        precio: 9490,
        stock: 30,
        stockMinimo: 10,
        descripcion: "Esmalte sintético brillante para madera y metal.",
        imagen: "img/PT004.jfif"
    },

    {
        id: "PT005",
        nombre: "Anticorrosivo rojo óxido 1 galón",
        categoria: "Pinturas",
        subcategoria: "Anticorrosivo",
        marca: "Sipa",
        unidad: "Galón",
        precio: 8990,
        stock: 20,
        stockMinimo: 5,
        descripcion: "Anticorrosivo para protección de metales.",
        imagen: "img/PT005.jpg"
    },

    {
        id: "PT006",
        nombre: "Barniz marino brillante 1 galón",
        categoria: "Pinturas",
        subcategoria: "Barniz",
        marca: "Sipa",
        unidad: "Galón",
        precio: 14990,
        stock: 15,
        stockMinimo: 5,
        descripcion: "Barniz marino resistente a la humedad.",
        imagen: "img/PT006.jfif"
    },

    {
        id: "PT007",
        nombre: "Diluyente sintético 1 litro",
        categoria: "Pinturas",
        subcategoria: "Accesorios",
        marca: "Sipa",
        unidad: "Litro",
        precio: 2990,
        stock: 40,
        stockMinimo: 10,
        descripcion: "Diluyente para esmaltes sintéticos.",
        imagen: "img/PT007.jfif"
    },

    {
        id: "PT008",
        nombre: "Aguarrás mineral 1 litro",
        categoria: "Pinturas",
        subcategoria: "Accesorios",
        marca: "Sipa",
        unidad: "Litro",
        precio: 2490,
        stock: 40,
        stockMinimo: 10,
        descripcion: "Aguarrás mineral para limpieza y dilución.",
        imagen: "img/PT008.webp"
    },

    {
        id: "PT009",
        nombre: "Pasta muro interior 1 galón",
        categoria: "Pinturas",
        subcategoria: "Pastas",
        marca: "Volcán",
        unidad: "Galón",
        precio: 6990,
        stock: 25,
        stockMinimo: 8,
        descripcion: "Pasta muro para preparación de superficies interiores.",
        imagen: "img/PT009.png"
    },

    {
        id: "PT010",
        nombre: "Yeso cartón para reparación 1 kg",
        categoria: "Pinturas",
        subcategoria: "Pastas",
        marca: "Volcán",
        unidad: "Kg",
        precio: 1990,
        stock: 50,
        stockMinimo: 15,
        descripcion: "Yeso en polvo para reparaciones menores.",
        imagen: "img/PT010.jpeg"
    },

    {
        id: "FE001",
        nombre: "Fierro redondo 8 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Fierro redondo",
        marca: "CAP",
        unidad: "Unidad",
        precio: 3990,
        stock: 80,
        stockMinimo: 20,
        descripcion: "Fierro redondo de construcción 8 mm.",
        imagen: "img/FE001.jpg"
    },

    {
        id: "FE002",
        nombre: "Fierro redondo 10 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Fierro redondo",
        marca: "CAP",
        unidad: "Unidad",
        precio: 5490,
        stock: 70,
        stockMinimo: 15,
        descripcion: "Fierro redondo de construcción 10 mm.",
        imagen: "img/FE002.jfif"
    },

    {
        id: "FE003",
        nombre: "Fierro redondo 12 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Fierro redondo",
        marca: "CAP",
        unidad: "Unidad",
        precio: 6990,
        stock: 60,
        stockMinimo: 15,
        descripcion: "Fierro redondo de construcción 12 mm.",
        imagen: "img/FE003.jfif"
    },

    {
        id: "FE004",
        nombre: "Fierro cuadrado 10x10 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Fierro cuadrado",
        marca: "CAP",
        unidad: "Unidad",
        precio: 7990,
        stock: 50,
        stockMinimo: 12,
        descripcion: "Perfil cuadrado de acero para estructuras.",
        imagen: "img/FE004.webp"
    },

    {
        id: "FE005",
        nombre: "Fierro cuadrado 15x15 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Fierro cuadrado",
        marca: "CAP",
        unidad: "Unidad",
        precio: 9990,
        stock: 40,
        stockMinimo: 10,
        descripcion: "Perfil cuadrado de acero para trabajos estructurales.",
        imagen: "img/FE005.jpg"
    },

    {
        id: "FE006",
        nombre: "Perfil ángulo 20x20x3 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Perfiles",
        marca: "CAP",
        unidad: "Unidad",
        precio: 6990,
        stock: 45,
        stockMinimo: 10,
        descripcion: "Perfil ángulo de acero para estructuras y soportes.",
        imagen: "img/FE006.webp"
    },

    {
        id: "FE007",
        nombre: "Perfil ángulo 30x30x3 mm x 6 m",
        categoria: "Fierros",
        subcategoria: "Perfiles",
        marca: "CAP",
        unidad: "Unidad",
        precio: 8990,
        stock: 35,
        stockMinimo: 10,
        descripcion: "Perfil ángulo de acero para trabajos de construcción.",
        imagen: "img/FE007.webp"
    },

];

const CATALOGO_VERSION = 6;

// Obtener productos (sincroniza con la base si la versión cambió)
function obtenerProductos() {
    const versionGuardada = localStorage.getItem("catalogoVersion");
    const guardados = localStorage.getItem("productos");

    // Si no hay datos o la versión es distinta, usar el catálogo base
    if (!guardados || versionGuardada !== String(CATALOGO_VERSION)) {
        localStorage.setItem("productos", JSON.stringify(productosBase));
        localStorage.setItem("catalogoVersion", String(CATALOGO_VERSION));
        return productosBase.map(p => ({ ...p }));
    }

    return JSON.parse(guardados);
}

// Guardar productos actualizados (mantiene la versión)
function guardarProductos(lista) {
    localStorage.setItem("productos", JSON.stringify(lista));
    localStorage.setItem("catalogoVersion", String(CATALOGO_VERSION));
}

// Variable global de productos
let productos = obtenerProductos();

// Actualizar stock de un producto
function actualizarStock(id, cantidadVendida) {
    productos = obtenerProductos();
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos[index].stock = Math.max(0, productos[index].stock - cantidadVendida);
        guardarProductos(productos);
    }
}

// Formatear precio CLP
function formatoPrecio(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}

