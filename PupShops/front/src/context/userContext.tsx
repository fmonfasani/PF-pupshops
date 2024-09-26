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


export const UserContext = createContext<IUserContextType>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
   //getOrders: async () => {},
   //setOrders: () => {},
   //orders: [],
   //logOut: () => {},
});



export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
  //  const [orders, setOrders] = useState<IOrderResponse[]>([]);

//LOGIN DE USUARIO
const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
        const data = await fetchLoginUser(credentials);
        if (data.login) {
            const userData = {
                login: data.login,
                token: data.token,
                user: data.user,
            };
            if (typeof window !== "undefined") {
             
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", data.token);
            }
            
            setUser(userData);
            setIsLogged(true);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during sign in:', error);
        return false;
    }
};
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
  };