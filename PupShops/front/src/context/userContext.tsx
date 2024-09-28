"use client";

import {
  ILoginUser,
  IUserRegister,
  IUserResponse
} from "@/Interfaces/interfaces";
import { IUserContextType } from "@/Interfaces/interfaces";
import { fetchLoginUser, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useContext, useEffect, useState } from "react";

// Creamos el contexto con un valor inicial
export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false,
  logOut: () => {},
});

// Provider para el contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Inicializa el usuario ficticio
 /* const initialUser: IUserResponse = {
    login: true,
    token: "token_simulado",
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
      isAdmin: true, // Establece isAdmin como true para pruebas
    },
    const [user, setUser] = useState<IUserResponse | null>(initialUser);
      const [isLogged, setIsLogged] = useState<boolean>(true); // Suponemos que el usuario está logueado por defecto
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Inicializa isAdmin como true para pruebas
  // Función para iniciar sesión
  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data = await fetchLoginUser(credentials);
      if (data.login) {
        const userData: IUserResponse = {
          login: data.login,
          token: data.token,
          user: data.findUser,
        };

        // Establecemos el estado de isAdmin
        setIsAdmin(userData.user?.isAdmin ?? false);

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
      console.error("Error during sign in:", error);
      return false;
    }
  };

  };*/

  // Inicializa el estado del usuario
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Estado para el rol de admin

  // Función para iniciar sesión
  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data = await fetchLoginUser(credentials);
      if (data.login) {
        const userData = {
          login: data.login,
          token: data.token,
          user: data.findUser
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
      console.error("Error during sign in:", error);
      return false;
    }
  };

  // Función para registrarse
  const signUp = async (user: IUserRegister): Promise<boolean> => {
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

   // Efecto para cargar el estado del usuario desde localStorage al montar
   useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser) {
        try {
          const parsedUser: IUserResponse = JSON.parse(storedUser);
          console.log("Parsed user from localStorage:", parsedUser);

          // Verificamos que parsedUser y parsedUser.user no sean null antes de acceder a ellos
          if (parsedUser && parsedUser.user) {
            setUser(parsedUser);
            setIsLogged(Boolean(token));
            setIsAdmin(parsedUser.user.isAdmin); // Aseguramos que user no sea null
          } else {
            // Si no hay usuario, reseteamos los estados
            setUser(null);
            setIsLogged(false);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error parsing stored user:", error);
          setUser(null);
          setIsLogged(false);
          setIsAdmin(false);
        }
      } else {
        // Si no hay un usuario guardado, reseteamos los estados
        setUser(null);
        setIsLogged(false);
        setIsAdmin(false);
      }
    }
  }, []);

 //CERRAR SESION DE USUARIO
 const logOut = () => {
  if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setIsLogged(false);
  }
};

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};