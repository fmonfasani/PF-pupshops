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
<<<<<<< HEAD
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
=======
  });

  export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    export const UserProvider = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
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
              token: response.token,
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
>>>>>>> db26c85e14b85e821afec46bcc9df00d02ea887d
            return false;
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
<<<<<<< HEAD
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
=======
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
            signUp,
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

    export const useUserContext = () => {
      const context = useContext(UserContext);
      if (!context) {
        throw new Error(
          "useUserContext debe ser usado dentro de un UserProvider"
        );
      }
      return context;
    };
  };
};
>>>>>>> db26c85e14b85e821afec46bcc9df00d02ea887d
