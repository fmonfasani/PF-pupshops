"use client";
import React, { createContext, useContext, useState } from 'react';

// Definimos la interfaz para el tipo de usuario
interface IUserContext {
  isAdmin: boolean;
}

// Creamos el contexto con un valor inicial
const UserContext = createContext<IUserContext | undefined>(undefined);

// Provider para el contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true); // Estado de administrador


  return (
    <UserContext.Provider value={{ isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
  };