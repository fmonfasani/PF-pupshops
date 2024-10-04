"use client";

import { ILoginResponse, ILoginUser, IUserRegister, IUserResponse } from "@/Interfaces/interfaces";
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
  // Inicializa el estado del usuario y del token
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Estado para el rol de admin
  const [token, setToken] = useState<string | null>(null); // Estado para el token

  // Función para iniciar sesión
const signIn = async (credentials: ILoginUser): Promise<boolean> => {
  try {
    const data: ILoginResponse = await login(credentials); // Llamada a la API para login
    console.log("Credenciales enviadas:", credentials);

    if (data.success) { // Verifica si el login fue exitoso
      if (typeof window !== "undefined") {
        // Guarda el usuario y el token juntos en un solo objeto
        const userData = {
          token: data.token,
          user: data.findUser, // Cambiar a findUser
        };
        localStorage.setItem("authData", JSON.stringify(userData)); // Guarda ambos juntos
        console.log("Datos almacenados en localStorage:", localStorage.getItem("authData"));

        // Establece el estado
        setUser({
          succes: true, // Asegúrate de que este campo se esté usando en IUserResponse
          token: data.token,
          user: data.findUser, // Aquí usas findUser
        });

        setToken(data.token); // Guarda el token en el estado
        setIsLogged(true); // Indica que el usuario ha iniciado sesión

        // Asegúrate de que findUser no sea null antes de acceder a isAdmin
        if (data.findUser) {
          setIsAdmin(data.findUser.isAdmin); // Uso directo de data.findUser
        } else {
          setIsAdmin(false); // O maneja el caso donde no hay usuario
        }

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


  // Función para registrarse
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

  //Cread administrador
 const signUpRegister = async (userAdmin: IUserRegister): Promise<boolean> => {
    try {
        const storedAuthData = localStorage.getItem('authData');
        const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

        if (!token) {
            console.error("No se encontró un token válido para realizar el registro.");
            return false;
        }

        console.log("Token de autorización que se enviará:", token);

        const data = await fetchAdminCreateUser(userAdmin, token);

        // Verifica si el mensaje de éxito está presente en la respuesta
        if (data && typeof data === 'string' && data.includes("Cuenta creada correctamente")) {
            console.log("Administrador registrado exitosamente:", data);
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



  
  // Efecto para cargar el estado del usuario desde localStorage al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("authData");
      
      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { token, user } = parsedSession;

          if (user) {
            setUser(user); // Almacena el usuario
            setToken(token); // Almacena el token
            setIsLogged(Boolean(token)); // Verifica que haya un token válido
            setIsAdmin(user.isAdmin); // Asigna si es admin
          }
        } catch (error) {
          console.error("Error al parsear authData:", error);
          // Resetea los valores si hay un error
          setUser(null);
          setToken(null);
          setIsLogged(false);
          setIsAdmin(false);
        }
      }
    }
  }, []);
  
  // Cerrar sesión de usuario
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
      setUser(null);
      setToken(null); // Limpiar el token
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
