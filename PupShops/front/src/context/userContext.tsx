"use client";
import { ILoginResponse, ILoginUser, IUserRegister, IUserResponse } from "@/Interfaces/interfaces";
import { IUserContextType } from "@/Interfaces/interfaces";
import { login, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAdminCreateUser } from "@/utils/fetchAdminCreateUser";

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
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data: ILoginResponse = await login(credentials);
      if (data.success) {
        if (typeof window !== "undefined") {
          const userData = {
            token: data.token,
            user: data.findUser,
          };
          localStorage.setItem("authData", JSON.stringify(userData));

          setUser({
            succes: true,
            token: data.token,
            user: data.findUser,
          });

          setToken(data.token);
          setIsLogged(true);

          if (data.findUser) {
            setIsAdmin(data.findUser.isAdmin);
          } else {
            setIsAdmin(false);
          }

          return true;
        } else {
          return false;
        }
      } else {
        console.error("Login failed. User may not exist.");
        return false;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
  };

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
      throw new Error(error instanceof Error ? error.message : 'Error desconocido');

    }
  };

  const signUpRegister = async (userAdmin: IUserRegister): Promise<boolean> => {
    try {
      const storedAuthData = localStorage.getItem("authData");
      const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
      if (!token) {
        console.error(
          "No se encontró un token válido para realizar el registro."
        );
        return false;
      }

      const data = await fetchAdminCreateUser(userAdmin, token);

      if (
        data &&
        typeof data === "string" &&
        data.includes("Cuenta creada correctamente")
      ) {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("authData");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { token, user } = parsedSession;

          if (user) {
            setUser(user);
            setToken(token);
            setIsLogged(Boolean(token));
            setIsAdmin(user.isAdmin);
          }
        } catch (error) {
          console.error("Error al parsear authData:", error);
          setUser(null);
          setToken(null);
          setIsLogged(false);
          setIsAdmin(false);
        }
      }
    }
  }, []);

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
      setUser(null);
      setToken(null);
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
        token,
        setToken,
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
