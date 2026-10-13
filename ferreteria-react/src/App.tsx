import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { inicializarStorage } from './utils/Storage';

// Componentes y Vistas
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './views/Profile';
import { AdminDashboard } from './views/AdminDashboard';
import { Catalog } from './views/Catalog';
import { CartView } from './views/CartView';
import { Login } from './views/Login';
import { Register } from './views/Register';

// Wrapper para pasar las props necesarias a Profile
const ProfileWrapper = () => {
  const { currentUser, updateProfile } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Profile currentUser={currentUser} onUpdateProfile={updateProfile} />;
};

export function App() {
  useEffect(() => {
    inicializarStorage();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Página Inicio Redirige al Catálogo */}
                <Route path="/" element={<Navigate to="/catalogo" replace />} />

                {/* Rutas Públicas */}
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/carrito" element={<CartView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />

                {/* Ruta Protegida: Perfil de Usuario */}
                <Route
                  path="/perfil"
                  element={
                    <ProtectedRoute>
                      <ProfileWrapper />
                    </ProtectedRoute>
                  }
                />

                {/* Ruta Protegida: Panel Admin (Administrador y Vendedor) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'vendedor']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/catalogo" replace />} />
              </Routes>
            </main>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
              <small>Ferretería Los Maestros © 2026 - Evaluación Parcial N.º 2 (DSY1104 / DSY1105)</small>
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;