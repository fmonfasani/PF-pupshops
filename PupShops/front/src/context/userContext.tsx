"use client";

import {
  ILoginUser,
  IUserRegister,
  IUserResponse,
} from "@/Interfaces/interfaces";
import { IUserContextType } from "@/Interfaces/interfaces";
import { login, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useEffect, useState } from "react";

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

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};

// Provider para el contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.id == null || typeof data.user.phone !== "number") {
        throw new Error(
          "El usuario no tiene un ID válido o el número de teléfono no es válido"
        );
      }

      setUser({
        login: true,
        user: {
          id: Number(data.user.id), // Aseguramos que sea un número
          name: data.user.name,
          lastname: data.user.lastname,
          email: data.user.email,
          country: data.user.country,
          city: data.user.city,
          address: data.user.address,
          phone: Number(data.user.phone), // Aseguramos que sea un número
          isAdmin: data.user.isAdmin,
        },
        token: data.token,
      });

      setIsLogged(true);
      setIsAdmin(data.user.isAdmin); // Asegúrate de establecer el estado de isAdmin
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const signUp = async (user: IUserRegister): Promise<boolean> => {
    try {
      const data = await fetchRegisterUser(user);
      if (data.id) {
        await signIn({ email: user.email, password: user.password });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error durante el registro:", error);
      return false;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLogged(Boolean(storedToken));
          setIsAdmin(parsedUser.user?.isAdmin || false);
          console.log("Usuario recuperado del localStorage:", parsedUser); // Debug
        } catch (error) {
          console.error("Error al parsear el usuario:", error);
          setUser(null);
          setIsLogged(false);
          setIsAdmin(false);
        }
      }
    }
  }, []);

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setIsLogged(false);
      setIsAdmin(false);
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
