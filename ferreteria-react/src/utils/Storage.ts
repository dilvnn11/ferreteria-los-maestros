import type { Product, User, Category } from '../types';

export const inicializarStorage = (): void => {
  // 1. Categorías iniciales
  if (!localStorage.getItem('categorias')) {
    const categoriasIniciales: Category[] = [
      { id: 'CAT1', nombre: 'Herramientas Manuales' },
      { id: 'CAT2', nombre: 'Materiales de Construcción' },
      { id: 'CAT3', nombre: 'Pinturas y Acabados' }
    ];
    localStorage.setItem('categorias', JSON.stringify(categoriasIniciales));
  }

  // 2. Productos iniciales (utilizando imágenes del proyecto original)
  if (!localStorage.getItem('productos')) {
    const productosIniciales: Product[] = [
      { id: 'FE001', nombre: 'Martillo de Uña Carpintero', descripcion: 'Martillo de acero forjado con mango ergonómico.', precio: 12990, stock: 15, categoriaId: 'CAT1', imagen: '/img/FE001.jpg' },
      { id: 'FE002', nombre: 'Juego de Destornilladores', descripcion: 'Set de 6 piezas plano y phillips en aleación cromo-vanadio.', precio: 8990, stock: 20, categoriaId: 'CAT1', imagen: '/img/FE002.jfif' },
      { id: 'FE003', nombre: 'Alicante Universal 8"', descripcion: 'Alicate multiuso aislado antideslizante.', precio: 9990, stock: 12, categoriaId: 'CAT1', imagen: '/img/FE003.jfif' },
      { id: 'MC001', nombre: 'Saco de Cemento 25kg', descripcion: 'Cemento de alta resistencia para estructuras y albañilería.', precio: 4990, stock: 50, categoriaId: 'CAT2', imagen: '/img/MC001.png' },
      { id: 'PT001', nombre: 'Esmalte al Agua Blanco 1 Galón', descripcion: 'Pintura lavable de alto rendimiento para interiores y exteriores.', precio: 24990, stock: 10, categoriaId: 'CAT3', imagen: '/img/PT001.jpg' }
    ];
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
  }

  // 3. Usuarios iniciales (3 Roles requeridos)
  if (!localStorage.getItem('usuarios')) {
    const usuariosIniciales: User[] = [
      {
        id: '1',
        nombreCompleto: 'Administrador General',
        correo: 'admin@maestros.cl',
        fechaNacimiento: '1988-03-25',
        direccion: 'Av. Gran Avenida 10200',
        region: 'Metropolitana',
        rol: 'admin'
      },
      {
        id: '2',
        nombreCompleto: 'Vendedor Ferretería',
        correo: 'vendedor@maestros.cl',
        fechaNacimiento: '1992-07-14',
        direccion: 'Calle Freire 456',
        region: 'Metropolitana',
        rol: 'vendedor'
      },
      {
        id: '3',
        nombreCompleto: 'Juan Pérez Cliente',
        correo: 'cliente@maestros.cl',
        fechaNacimiento: '1998-11-05',
        direccion: 'Pasaje Los Aromos 789',
        region: 'Valparaíso',
        rol: 'cliente'
      }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
  }
};