"use client";

import {
  ILoginUser,
  IUserContextType,
  IUserRegister,
  IUserResponse
} from "@/Interfaces/interfaces";
import { fetchLoginUser, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useContext, useEffect, useState } from "react";
=======
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



export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
=======


export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
  //  const [orders, setOrders] = useState<IOrderResponse[]>([]);


  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const response = await fetchLoginUser(credentials);
      console.log("Login response:", response);

      // Comprobar si la respuesta es exitosa
      if (response.success) {
        const userData: IUserResponse = {
          login: true,
          user: response.findUser,
          token: response.token
        };

        // Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.token);
        console.log(
          "LocalStorage after sign in:",
          localStorage.getItem("user"),
          localStorage.getItem("token")
        );

        // Actualizar el estado
        setUser(userData);
        setIsLogged(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }

  };

  const signUp = async (user: IUserRegister) => {
    try {
      const data = await fetchRegisterUser(user);
      if (data.id) {
        await signIn({ email: user.email, password: user.password });
        return true;
      }
      console.error("Registration failed:", data);
      return false;
    } catch (error) {
      console.error("Error during sign up:", error);
      return false;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser) {
        try {
          const parsedUser: IUserResponse = JSON.parse(storedUser);
          console.log("Parsed user from localStorage:", parsedUser);
          setUser(parsedUser);
          setIsLogged(Boolean(token));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          setUser(null);
          setIsLogged(false);
        }
      } else {
        setUser(null);
        setIsLogged(false);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        signIn,
        signUp
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};
=======
};
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
  };

