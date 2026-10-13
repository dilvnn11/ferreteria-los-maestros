import React, { useState, useEffect } from 'react';
import type { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

export const Catalog: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    const prodsGuardados = JSON.parse(localStorage.getItem('productos') || '[]');
    const catsGuardadas = JSON.parse(localStorage.getItem('categorias') || '[]');
    setProductos(prodsGuardados);
    setCategorias(catsGuardadas);
  }, []);

  // Filtrado dinámico en tiempo real
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === '' || p.categoriaId === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Catálogo de Productos</h2>

      {/* Barra de Búsqueda y Filtro de Categoría */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Responsivo de Productos */}
      {productosFiltrados.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.map((prod) => (
            <div className="col" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center py-4">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
};