// ===== Gestión de usuarios y autenticación (LocalStorage) =====

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual")) || null;
}

function iniciarSesion(usuario) {
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
}

// Intentos fallidos de login
function obtenerIntentos(correo) {
    const intentos = JSON.parse(localStorage.getItem("intentosLogin")) || {};
    return intentos[correo] || 0;
}

function sumarIntento(correo) {
    const intentos = JSON.parse(localStorage.getItem("intentosLogin")) || {};
    intentos[correo] = (intentos[correo] || 0) + 1;
    localStorage.setItem("intentosLogin", JSON.stringify(intentos));
    return intentos[correo];
}

function resetearIntentos(correo) {
    const intentos = JSON.parse(localStorage.getItem("intentosLogin")) || {};
    delete intentos[correo];
    localStorage.setItem("intentosLogin", JSON.stringify(intentos));
}

function estaBloqueado(correo) {
    return obtenerIntentos(correo) >= 3;
}

// Actualizar menú según sesión
function actualizarMenu() {
    const usuario = obtenerUsuarioActual();
    const navLinks = document.querySelectorAll("nav ul, nav");
    // Se maneja en cada página o con un script común si se desea
}

// Validar contraseña (mínimo 8 caracteres, al menos 1 mayúscula, 1 número)
function validarPassword(pass) {
    if (pass.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Z]/.test(pass)) return "La contraseña debe contener al menos una mayúscula.";
    if (!/[0-9]/.test(pass)) return "La contraseña debe contener al menos un número.";
    return null;
}

// Calcular edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
