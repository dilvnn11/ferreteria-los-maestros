import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

export const CartView: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const handleProcesarCompra = () => {
    if (cart.length === 0) return;

    // 1. Obtener los productos actuales de localStorage
    const productosLocales: Product[] = JSON.parse(
      localStorage.getItem('productos') || '[]'
    );

    // 2. Descontar el stock de cada producto comprado
    const productosActualizados = productosLocales.map((prod) => {
      const itemEnCarrito = cart.find((item) => item.product.id === prod.id);
      if (itemEnCarrito) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - itemEnCarrito.cantidad),
        };
      }
      return prod;
    });

    // 3. Persistir en localStorage y vaciar carrito
    localStorage.setItem('productos', JSON.stringify(productosActualizados));
    clearCart();
    setCompraExitosa(true);
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>

      {compraExitosa && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          🎉 <strong>¡Compra realizada con éxito!</strong> El stock ha sido actualizado en la tienda.
          <button
            type="button"
            className="btn-close"
            onClick={() => setCompraExitosa(false)}
          ></button>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="card text-center p-5 shadow-sm border-0">
          <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
          <div>
            <Link to="/catalogo" className="btn btn-warning fw-bold">
              Ir al Catálogo
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Tabla de Productos en Carrito */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.product.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.product.imagen}
                              alt={item.product.nombre}
                              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            />
                            <span className="fw-bold small">{item.product.nombre}</span>
                          </div>
                        </td>
                        <td>${item.product.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: '70px' }}
                            min="1"
                            max={item.product.stock}
                            value={item.cantidad}
                            onChange={(e) =>
                              updateQuantity(item.product.id, Number(e.target.value))
                            }
                          />
                        </td>
                        <td className="fw-bold">
                          ${(item.product.precio * item.cantidad).toLocaleString('es-CL')}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Resumen de Compra */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white py-3">
                <h5 className="card-title mb-0">Resumen del Pedido</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Total de productos:</span>
                  <span className="fw-bold">
                    {cart.reduce((acc, i) => acc + i.cantidad, 0)}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                  <span>Total a Pagar:</span>
                  <span className="text-primary">${totalPrice.toLocaleString('es-CL')}</span>
                </div>
                <button
                  className="btn btn-success w-100 btn-lg fw-bold mb-2"
                  onClick={handleProcesarCompra}
                >
                  Confirmar y Pagar
                </button>
                <button
                  className="btn btn-outline-secondary w-100 btn-sm"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};