"use client"
import { ILoginUser, IUserContextType, IUserRegister, IUserResponse } from "@/Interfaces/interfaces"
import { fetchLoginUser, fetchRegisterUser } from "@/utils/fetchUser";
import { createContext, useState } from "react"


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

//REGISTRO DE USUARIO
const signUp = async (user: IUserRegister) => {
    try {
        const data = await fetchRegisterUser(user);
        if (data.id) {
            await signIn({ email: user.email, password: user.password });
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};    

return (
    <UserContext.Provider
    value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        signIn,
        signUp,
     //   getOrders,
     //   setOrders,
     //   orders,
     //   logOut
    }}
>
    {children}
</UserContext.Provider>
);
};