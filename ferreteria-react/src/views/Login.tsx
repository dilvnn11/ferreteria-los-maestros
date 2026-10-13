import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(correo)) {
      navigate('/catalogo');
    } else {
      setError('Correo no registrado. Utiliza admin@maestros.cl, vendedor@maestros.cl o cliente@maestros.cl');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white text-center py-3">
              <h4 className="mb-0">Iniciar Sesión</h4>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@maestros.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">
                  Ingresar
                </button>
              </form>

              <div className="bg-light p-3 rounded border mb-3">
                <small className="d-block fw-bold mb-1">Cuentas de Prueba:</small>
                <small className="d-block text-muted">• Admin: admin@maestros.cl</small>
                <small className="d-block text-muted">• Vendedor: vendedor@maestros.cl</small>
                <small className="d-block text-muted">• Cliente: cliente@maestros.cl</small>
              </div>

              <p className="text-center mb-0 small">
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};