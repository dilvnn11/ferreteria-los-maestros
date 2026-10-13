import React, { useState, useEffect } from 'react';
import type { Product, User, Category, Role } from '../types';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  // Estados para las listas
  const [productos, setProductos] = useState<Product[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);

  // Control de pestañas
  const [tabActiva, setTabActiva] = useState<'productos' | 'usuarios' | 'categorias'>('productos');
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

  // Estados para el formulario de producto
  const [prodEdit, setProdEdit] = useState<Partial<Product>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoriaId: '',
    imagen: '/img/placeholder.svg',
  });
  const [editandoProdId, setEditandoProdId] = useState<string | null>(null);

  // Estado para modificación rápida de stock (Vendedor / Admin)
  const [stockInput, setStockInput] = useState<{ [key: string]: number }>({});

  // Estados para formulario de usuario
  const [nuevoUser, setNuevoUser] = useState({
    nombreCompleto: '',
    correo: '',
    fechaNacimiento: '',
    direccion: '',
    region: 'Metropolitana',
    rol: 'cliente' as Role,
  });

  // Carga inicial desde LocalStorage
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const prods = JSON.parse(localStorage.getItem('productos') || '[]');
    const usrs = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const cats = JSON.parse(localStorage.getItem('categorias') || '[]');
    setProductos(prods);
    setUsuarios(usrs);
    setCategorias(cats);
  };

  // --- GESTIÓN DE PRODUCTOS ---
  const handleGuardarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser?.rol !== 'admin') {
      setMensaje({ tipo: 'danger', texto: 'Solo el Administrador puede editar datos completos de productos.' });
      return;
    }

    if (!prodEdit.nombre || !prodEdit.precio || prodEdit.precio <= 0) {
      setMensaje({ tipo: 'danger', texto: 'Complete los datos obligatorios del producto correctamente.' });
      return;
    }

    let nuevosProds: Product[];
    if (editandoProdId) {
      nuevosProds = productos.map((p) =>
        p.id === editandoProdId ? ({ ...p, ...prodEdit } as Product) : p
      );
      setMensaje({ tipo: 'success', texto: 'Producto actualizado con éxito.' });
    } else {
      const nuevoProducto: Product = {
        id: `PROD-${Date.now()}`,
        nombre: prodEdit.nombre || '',
        descripcion: prodEdit.descripcion || '',
        precio: Number(prodEdit.precio),
        stock: Number(prodEdit.stock),
        categoriaId: prodEdit.categoriaId || (categorias[0]?.id || 'CAT1'),
        imagen: prodEdit.imagen || '/img/placeholder.svg',
      };
      nuevosProds = [...productos, nuevoProducto];
      setMensaje({ tipo: 'success', texto: 'Producto creado con éxito.' });
    }

    localStorage.setItem('productos', JSON.stringify(nuevosProds));
    setProductos(nuevosProds);
    limpiarFormProducto();
  };

  const handleEliminarProducto = (id: string) => {
    if (currentUser?.rol !== 'admin') return;
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      const nuevosProds = productos.filter((p) => p.id !== id);
      localStorage.setItem('productos', JSON.stringify(nuevosProds));
      setProductos(nuevosProds);
      setMensaje({ tipo: 'success', texto: 'Producto eliminado.' });
    }
  };

  const handleActualizarStock = (id: string) => {
    const nuevoStock = stockInput[id];
    if (nuevoStock === undefined || nuevoStock < 0) {
      setMensaje({ tipo: 'danger', texto: 'Ingrese un número de stock válido.' });
      return;
    }

    const nuevosProds = productos.map((p) =>
      p.id === id ? { ...p, stock: Number(nuevoStock) } : p
    );
    localStorage.setItem('productos', JSON.stringify(nuevosProds));
    setProductos(nuevosProds);
    setMensaje({ tipo: 'success', texto: 'Stock actualizado con éxito.' });
  };

  const limpiarFormProducto = () => {
    setProdEdit({ nombre: '', descripcion: '', precio: 0, stock: 0, categoriaId: '', imagen: '/img/placeholder.svg' });
    setEditandoProdId(null);
  };

  // --- GESTIÓN DE USUARIOS ---
  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoUser.nombreCompleto || !nuevoUser.correo) {
      setMensaje({ tipo: 'danger', texto: 'Nombre y correo son requeridos.' });
      return;
    }

    // Regla Vendedor: Solo puede crear clientes
    const rolAsignado: Role = currentUser?.rol === 'vendedor' ? 'cliente' : nuevoUser.rol;

    const uNuevo: User = {
      id: `USR-${Date.now()}`,
      ...nuevoUser,
      rol: rolAsignado,
    };

    const nuevosUsrs = [...usuarios, uNuevo];
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsrs));
    setUsuarios(nuevosUsrs);
    setMensaje({ tipo: 'success', texto: `Usuario creado correctamente con rol (${rolAsignado}).` });
    setNuevoUser({ nombreCompleto: '', correo: '', fechaNacimiento: '', direccion: '', region: 'Metropolitana', rol: 'cliente' });
  };

  const handleEliminarUsuario = (id: string) => {
    if (currentUser?.rol !== 'admin') return;
    if (id === currentUser.id) {
      setMensaje({ tipo: 'danger', texto: 'No puedes eliminar tu propio usuario.' });
      return;
    }
    const nuevosUsrs = usuarios.filter((u) => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsrs));
    setUsuarios(nuevosUsrs);
    setMensaje({ tipo: 'success', texto: 'Usuario eliminado.' });
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Panel de Administración</h2>
        <span className="badge bg-primary fs-6">Rol Actual: {currentUser?.rol.toUpperCase()}</span>
      </div>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
          {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
        </div>
      )}

      {/* Navegación por Pestañas */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tabActiva === 'productos' ? 'active fw-bold' : ''}`}
            onClick={() => setTabActiva('productos')}
          >
            Gestión de Productos y Stock
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tabActiva === 'usuarios' ? 'active fw-bold' : ''}`}
            onClick={() => setTabActiva('usuarios')}
          >
            Gestión de Usuarios
          </button>
        </li>
      </ul>

      {/* PESTAÑA 1: PRODUCTOS */}
      {tabActiva === 'productos' && (
        <div className="row">
          {/* Formulario (Exclusivo Admin) */}
          {currentUser?.rol === 'admin' && (
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                  {editandoProdId ? 'Editar Producto' : 'Nuevo Producto'}
                </div>
                <div className="card-body">
                  <form onSubmit={handleGuardarProducto}>
                    <div className="mb-2">
                      <label className="form-label small">Nombre</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={prodEdit.nombre || ''}
                        onChange={(e) => setProdEdit({ ...prodEdit, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small">Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        value={prodEdit.descripcion || ''}
                        onChange={(e) => setProdEdit({ ...prodEdit, descripcion: e.target.value })}
                      />
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <label className="form-label small">Precio ($)</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={prodEdit.precio || 0}
                          onChange={(e) => setProdEdit({ ...prodEdit, precio: Number(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="col">
                        <label className="form-label small">Stock Inicial</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={prodEdit.stock || 0}
                          onChange={(e) => setProdEdit({ ...prodEdit, stock: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small">Categoría</label>
                      <select
                        className="form-select form-select-sm"
                        value={prodEdit.categoriaId || ''}
                        onChange={(e) => setProdEdit({ ...prodEdit, categoriaId: e.target.value })}
                      >
                        <option value="">Seleccione Categoría</option>
                        {categorias.map((c) => (
                          <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary btn-sm flex-grow-1">
                        {editandoProdId ? 'Guardar Cambios' : 'Crear Producto'}
                      </button>
                      {editandoProdId && (
                        <button type="button" className="btn btn-secondary btn-sm" onClick={limpiarFormProducto}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de Productos (Admin y Vendedor) */}
          <div className={currentUser?.rol === 'admin' ? 'col-md-8' : 'col-md-12'}>
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img src={p.imagen} alt={p.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      </td>
                      <td>{p.nombre}</td>
                      <td>${p.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1" style={{ maxWidth: '140px' }}>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            defaultValue={p.stock}
                            onChange={(e) => setStockInput({ ...stockInput, [p.id]: Number(e.target.value) })}
                          />
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleActualizarStock(p.id)}
                            title="Actualizar Stock"
                          >
                            ✓
                          </button>
                        </div>
                      </td>
                      <td>
                        {currentUser?.rol === 'admin' ? (
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                setProdEdit(p);
                                setEditandoProdId(p.id);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleEliminarProducto(p.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small">Solo Modificación de Stock Permitida</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: USUARIOS */}
      {tabActiva === 'usuarios' && (
        <div className="row">
          {/* Formulario Crear Usuario */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                Crear Nuevo Usuario
              </div>
              <div className="card-body">
                <form onSubmit={handleCrearUsuario}>
                  <div className="mb-2">
                    <label className="form-label small">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={nuevoUser.nombreCompleto}
                      onChange={(e) => setNuevoUser({ ...nuevoUser, nombreCompleto: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      value={nuevoUser.correo}
                      onChange={(e) => setNuevoUser({ ...nuevoUser, correo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={nuevoUser.fechaNacimiento}
                      onChange={(e) => setNuevoUser({ ...nuevoUser, fechaNacimiento: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small">Rol de Usuario</label>
                    {currentUser?.rol === 'admin' ? (
                      <select
                        className="form-select form-select-sm"
                        value={nuevoUser.rol}
                        onChange={(e) => setNuevoUser({ ...nuevoUser, rol: e.target.value as Role })}
                      >
                        <option value="cliente">Cliente</option>
                        <option value="vendedor">Vendedor</option>
                        <option value="admin">Administrador</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value="cliente (Restricción Vendedor)"
                        disabled
                      />
                    )}
                  </div>
                  <button type="submit" className="btn btn-success btn-sm w-100">
                    Crear Usuario
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Lista de Usuarios */}
          <div className="col-md-8">
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nombreCompleto}</td>
                      <td>{u.correo}</td>
                      <td>
                        <span className={`badge bg-${u.rol === 'admin' ? 'danger' : u.rol === 'vendedor' ? 'warning' : 'info'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        {currentUser?.rol === 'admin' ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleEliminarUsuario(u.id)}
                            disabled={u.id === currentUser.id}
                          >
                            Eliminar
                          </button>
                        ) : (
                          <span className="text-muted small">Sin permisos</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};