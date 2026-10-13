import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.imagen}
        className="card-img-top p-3"
        alt={product.nombre}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark">{product.nombre}</h5>
        <p className="card-text text-muted small flex-grow-1">{product.descripcion}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold text-primary">
            ${product.precio.toLocaleString('es-CL')}
          </span>
          <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
          </span>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3">
        <button
          className="btn btn-warning w-100 fw-bold"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? '🛒 Agregar al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};