export type Role = 'admin' | 'vendedor' | 'cliente';

export interface User {
  id: string;
  nombreCompleto: string;
  correo: string;
  fechaNacimiento: string;
  direccion: string;
  region: string;
  rol: Role;
  avatar?: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoriaId: string;
  imagen: string;
}

export interface Category {
  id: string;
  nombre: string;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}