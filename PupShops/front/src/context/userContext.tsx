"use client";

import { ILoginUser, IUserRegister, IUserResponse} from "@/Interfaces/interfaces";
import { IUserContextType } from "@/Interfaces/interfaces";
import { login, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAdminCreateUser } from "@/utils/fetchAdminCreateUser";

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
  signUpRegister: async () => false,
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
    const data = await login(credentials); // Llamada a la API para login

    if (data.login) { // Verifica si el login fue exitoso
      if (typeof window !== "undefined") {
        // Guarda los datos del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Guarda el objeto del usuario
        localStorage.setItem("token", data.token); // Guarda el token

        // Actualiza el estado del usuario en el contexto
        setUser({
          login: true,
          token: data.token,
          user: data.user,
        });

        setIsLogged(true); // Indica que el usuario ha iniciado sesión
        setIsAdmin(data.user.isAdmin); // Uso directo de data.user

        return true; // Login exitoso
      } else {
        return false; // Si `window` no está disponible
      }
    } else {
      console.error("Login failed. User may not exist.");
      return false; // Si el login falló
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return false; // Si ocurre un error durante el proceso
  }
};


//Funcion para registrarse
const signUp = async (user: IUserRegister): Promise<boolean> => {
  try {
      const data = await fetchRegisterUser(user);

      if (data) { 
          await signIn({ email: user.email, password: user.password });
          return true;
      }

      console.error(`Registration failed: ${JSON.stringify(data)}`);
      return false;
  } catch (error) {
      console.error(`Error during sign up: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error(error instanceof Error ? error.message : 'Error desconocido'); // Lanza el error para que pueda ser capturado en onSubmit
  }
};




  // Función para registrar nuevo administrador
  const signUpRegister = async (userAdmin: IUserRegister): Promise<boolean> => {
  try {
    const token = user?.token;
    
      if (!token) {
          console.error("No se encontró un token válido para realizar el registro.");
          return false;
      }

      // Llamada a la fetch con el token
      const data = await fetchAdminCreateUser(userAdmin, token);

      if (data.id) {
          // Realiza el signIn automáticamente después de registrar el administrador
          await signIn({ email: userAdmin.email, password: userAdmin.password });
          return true;
      } else {
          console.error("Registro fallido:", data);
          return false;
      }
  } catch (error) {
      console.error("Error durante el registro de administrador:", error);
      return false;
  }
};



  /* //OBTENER ORDENES DE COMPRA
    const getOrders = useCallback(async () => {
        try {
          const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
          const data = await fetchUserOrders(token);
          setOrders(data);
          localStorage.setItem("orders", JSON.stringify(data));
        } catch (error) {
          console.error("Error al obtener las órdenes:", error);
        }
      }, [setOrders]);*/

   // Efecto para cargar el estado del usuario desde localStorage al montar
   useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserSession = localStorage.getItem("userSession");
      
      if (storedUserSession) {
        try {
          const parsedSession = JSON.parse(storedUserSession);
          const { token, user } = parsedSession;
  
          if (user) {
            setUser(user); // Almacena el usuario
            setIsLogged(Boolean(token)); // Verifica que haya un token válido
            setIsAdmin(user.isAdmin); // Asigna si es admin
          }
        } catch (error) {
          console.error("Error al parsear userSession:", error);
          // Resetea los valores si hay un error
          setUser(null);
          setIsLogged(false);
          setIsAdmin(false);
        }
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
        signUpRegister,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};