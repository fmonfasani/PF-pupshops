"use client";
import { ILoginUser, IUserContextType, IUserResponse } from '@/Interfaces/interfaces';
import { fetchLoginUser } from '@/utils/fetchUser';
import React, { createContext, useContext, useState } from 'react';

// Definimos el contexto con el tipo correcto
export const UserContext = createContext<IUserContextType>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
});

// Provider para el contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserResponse | null>({
    login: true,
    user: {
      id: 1,
      name: "Admin",
      lastname: "User",
      email: "admin@ejemplo.com",
      password: "hashedpassword",
      country: "País",
      city: "Ciudad",
      address: "Dirección",
      phone: 123456789,
      isAdmin: true, // Fuerzas el valor de isAdmin a true para pruebas
    },
    token: "token_simulado",
  });
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false); // Añadimos estado para isAdmin

    // LOGIN DE USUARIO
    const signIn = async (credentials: ILoginUser): Promise<boolean> => {
        try {
            const data = await fetchLoginUser(credentials);
            if (data.login) {
                const userData = {
                    login: data.login,
                    token: data.token,
                    user: data.findUser, // Asegúrate de asignar el objeto correcto
                };

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("token", data.token);
                }

                setUser(userData);
                setIsLogged(true);
                setIsAdmin(userData.user.isAdmin); // Establecemos si el usuario es admin

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            return false;
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged, signIn, signUp: async () => false }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
};
