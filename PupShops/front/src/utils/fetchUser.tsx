import { ILoginUser, IUserRegister } from "@/Interfaces/interfaces";


//Cambiar rutas segun back
export const fetchRegisterUser = async (user: IUserRegister) => {
    const response = await fetch(`/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
}


export const fetchLoginUser = async (credentials: ILoginUser) => {
    const response = await fetch(`/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("Response data from login:", data);
      return data;
    }