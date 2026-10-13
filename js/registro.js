document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRegistro");
    if (!form) return;

    const regiones = [
        "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama",
        "Coquimbo", "Valparaíso", "Metropolitana", "O'Higgins",
        "Maule", "Ñuble", "Biobío", "La Araucanía",
        "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
    ];

    const selectRegion = document.getElementById("region");
    regiones.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r;
        opt.textContent = r;
        selectRegion.appendChild(opt);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const errores = [];

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const fechaNac = document.getElementById("fechaNacimiento").value;
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const direccion = document.getElementById("direccion").value.trim();
        const region = document.getElementById("region").value;
        const genero = document.querySelector('input[name="genero"]:checked');
        const terminos = document.getElementById("terminos").checked;

        if (!nombre) errores.push("El nombre es obligatorio.");
        if (!apellido) errores.push("El apellido es obligatorio.");
        if (!fechaNac) errores.push("La fecha de nacimiento es obligatoria.");
        if (!correo) errores.push("El correo electrónico es obligatorio.");
        if (!password) errores.push("La contraseña es obligatoria.");
        if (!confirmPassword) errores.push("Debes confirmar la contraseña.");
        if (!direccion) errores.push("La dirección es obligatoria.");
        if (!region) errores.push("Debes seleccionar una región.");
        if (!genero) errores.push("Debes seleccionar un género.");
        if (!terminos) errores.push("Debes aceptar los términos y condiciones.");

        if (fechaNac) {
            const edad = calcularEdad(fechaNac);
            if (edad < 14) {
                errores.push("Debes tener al menos 14 años para registrarte.");
            }
        }

        if (correo && !correo.endsWith("@duoc.cl")) {
            errores.push("Solo se permiten correos del dominio @duoc.cl.");
        }

        if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            errores.push("El formato del correo no es válido.");
        }

        const errorPass = validarPassword(password);
        if (errorPass) errores.push(errorPass);

        if (password && confirmPassword && password !== confirmPassword) {
            errores.push("Las contraseñas no coinciden.");
        }

        const usuarios = obtenerUsuarios();
        if (usuarios.some(u => u.correo === correo)) {
            errores.push("Ya existe una cuenta con ese correo electrónico.");
        }

        const divErrores = document.getElementById("errores");
        if (errores.length > 0) {
            divErrores.innerHTML = "<ul>" + errores.map(e => "<li>" + e + "</li>").join("") + "</ul>";
            divErrores.style.display = "block";
            return;
        }

        divErrores.style.display = "none";

        const nuevoUsuario = {
            id: Date.now().toString(),
            nombre,
            apellido,
            fechaNacimiento: fechaNac,
            correo,
            password,
            direccion,
            region,
            genero: genero.value,
            fechaRegistro: new Date().toISOString()
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        window.location.href = "login.html";
    });
});
