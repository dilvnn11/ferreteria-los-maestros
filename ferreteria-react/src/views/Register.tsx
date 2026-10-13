import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

export const Register: React.FC = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [region, setRegion] = useState('Metropolitana');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const usuarios: User[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase())) {
      setMensaje('El correo electrónico ya se encuentra registrado.');
      return;
    }

    // Regla de Negocio: El registro público asigna ROL CLIENTE exclusivamente
    const nuevoUsuario: User = {
      id: `USR-${Date.now()}`,
      nombreCompleto,
      correo,
      fechaNacimiento,
      direccion,
      region,
      rol: 'cliente',
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('sessionUser', JSON.stringify(nuevoUsuario));

    navigate('/catalogo');
    window.location.reload();
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-warning text-dark text-center py-3">
              <h4 className="mb-0 fw-bold">Registro de Cliente</h4>
            </div>
            <div className="card-body p-4">
              {mensaje && <div className="alert alert-danger">{mensaje}</div>}

              <form onSubmit={handleRegister}>
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
                  <label className="form-label fw-bold">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
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
                  <input
                    type="text"
                    className="form-control"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                  />
                </div>

                <div className="alert alert-info py-2 mb-3">
                  <small>Nota: Las nuevas cuentas creadas públicamente se registran con rol <strong>Cliente</strong>.</small>
                </div>

                <button type="submit" className="btn btn-dark w-100 btn-lg fw-bold">
                  Crear Cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};