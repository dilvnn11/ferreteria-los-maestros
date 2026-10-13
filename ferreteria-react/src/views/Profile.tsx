import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface ProfileProps {
  currentUser: User;
  onUpdateProfile: (updatedUser: User) => void;
}

// Función auxiliar para calcular la edad derivada
export const calcularEdad = (fechaNacimiento: string): number => {
  if (!fechaNacimiento) return 0;
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  return edad < 0 ? 0 : edad;
};

export const Profile: React.FC<ProfileProps> = ({ currentUser, onUpdateProfile }) => {
  // Estados para el formulario
  const [nombreCompleto, setNombreCompleto] = useState(currentUser.nombreCompleto);
  const [fechaNacimiento, setFechaNacimiento] = useState(currentUser.fechaNacimiento);
  const [correo, setCorreo] = useState(currentUser.correo);
  const [direccion, setDireccion] = useState(currentUser.direccion);
  const [region, setRegion] = useState(currentUser.region);
  const [avatar, setAvatar] = useState(currentUser.avatar || '');

  // Estado para mensajes de éxito / error
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

  // Edad derivada en tiempo real
  const edadDerivada = calcularEdad(fechaNacimiento);

  // Sincronizar campos si el usuario prop cambia
  useEffect(() => {
    setNombreCompleto(currentUser.nombreCompleto);
    setFechaNacimiento(currentUser.fechaNacimiento);
    setCorreo(currentUser.correo);
    setDireccion(currentUser.direccion);
    setRegion(currentUser.region);
    setAvatar(currentUser.avatar || '');
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombreCompleto.trim() || !correo.trim() || !fechaNacimiento || !direccion.trim() || !region.trim()) {
      setMensaje({ tipo: 'danger', texto: 'Todos los campos son obligatorios.' });
      return;
    }

    if (edadDerivada < 18) {
      setMensaje({ tipo: 'danger', texto: 'Debes ser mayor de 18 años para actualizar tu perfil.' });
      return;
    }

    // Objeto usuario actualizado (Conservando el ROL original sin permitir cambios)
    const usuarioActualizado: User = {
      ...currentUser,
      nombreCompleto,
      fechaNacimiento,
      correo,
      direccion,
      region,
      avatar: avatar.trim() ? avatar : undefined,
      // rol: currentUser.rol -> Se mantiene intacto según requerimiento
    };

    // Actualizar estado superior y localStorage
    onUpdateProfile(usuarioActualizado);
    setMensaje({ tipo: 'success', texto: 'Perfil actualizado con éxito.' });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">Mi Perfil Personal</h4>
            </div>
            <div className="card-body p-4">
              {/* Alertas */}
              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
                  {mensaje.texto}
                  <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
                </div>
              )}

              {/* Encabezado con Avatar y Rol */}
              <div className="text-center mb-4">
                <img
                  src={
                    avatar ||
                    'https://via.placeholder.com/120/0d6efd/ffffff?text=Avatar'
                  }
                  alt="Avatar de usuario"
                  className="rounded-circle img-thumbnail mb-2"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <div>
                  <span className="badge bg-secondary text-uppercase px-3 py-2">
                    Rol: {currentUser.rol}
                  </span>
                  <p className="text-muted small mt-1">
                    (El rol no puede ser modificado desde el perfil)
                  </p>
                </div>
              </div>

              {/* Formulario de Perfil */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-7">
                    <label className="form-label fw-bold">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label fw-bold">Edad Derivada</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={`${edadDerivada} años`}
                      disabled
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Región</label>
                  <select
                    className="form-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una región</option>
                    <option value="Arica y Parinacota">Arica y Parinacota</option>
                    <option value="Tarapacá">Tarapacá</option>
                    <option value="Antofagasta">Antofagasta</option>
                    <option value="Atacama">Atacama</option>
                    <option value="Coquimbo">Coquimbo</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Metropolitana">Metropolitana de Santiago</option>
                    <option value="O'Higgins">O'Higgins</option>
                    <option value="Maule">Maule</option>
                    <option value="Ñuble">Ñuble</option>
                    <option value="Biobío">Biobío</option>
                    <option value="Araucanía">Araucanía</option>
                    <option value="Los Ríos">Los Ríos</option>
                    <option value="Los Lagos">Los Lagos</option>
                    <option value="Aysén">Aysén</option>
                    <option value="Magallanes">Magallanes y Antártica Chilena</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">URL del Avatar (Opcional)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://ejemplo.com/mi-foto.jpg"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};