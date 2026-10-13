document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formLogin");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const divError = document.getElementById("errorLogin");

        if (!correo || !password) {
            divError.textContent = "Debes completar correo y contraseña.";
            divError.style.display = "block";
            return;
        }

        if (estaBloqueado(correo)) {
            divError.textContent = "Esta cuenta está bloqueada por demasiados intentos fallidos. Contacta al administrador.";
            divError.style.display = "block";
            return;
        }

        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find(u => u.correo === correo && u.password === password);

        if (usuario) {
            resetearIntentos(correo);
            const { password: _, ...usuarioSeguro } = usuario;
            iniciarSesion(usuarioSeguro);
            alert("¡Bienvenido/a, " + usuario.nombre + "!");
            window.location.href = "index.html";
        } else {
            const intentos = sumarIntento(correo);
            const restantes = 3 - intentos;

            if (restantes <= 0) {
                divError.textContent = "Cuenta bloqueada por 3 intentos fallidos consecutivos.";
            } else {
                divError.textContent = "Credenciales incorrectas. Te quedan " + restantes + " intento(s).";
            }
            divError.style.display = "block";
        }
    });
});
