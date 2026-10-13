import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (correo: string) => boolean;
  logout: () => void;
  updateProfile: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const sessionUser = localStorage.getItem('sessionUser');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  // Guardar la sesión actual cuando cambie
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sessionUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sessionUser');
    }
  }, [currentUser]);

  const login = (correo: string): boolean => {
    const usuarios: User[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userFound = usuarios.find((u) => u.correo.toLowerCase() === correo.toLowerCase());

    if (userFound) {
      setCurrentUser(userFound);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedUser: User) => {
    // 1. Actualizar el estado de sesión
    setCurrentUser(updatedUser);

    // 2. Actualizar en el arreglo general de usuarios de localStorage
    const usuarios: User[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const nuevosUsuarios = usuarios.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};