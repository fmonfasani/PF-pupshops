import { ILoginUser, IUserRegister } from "@/Interfaces/interfaces";



export const fetchRegisterUser = async (user: IUserRegister) => {
    const response = await fetch(`http://localhost:3000/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
  if (!response.ok) {
    throw new Error("Error en el registro. Por favor, verifica los datos.");
  }

  return response.json();
};


export const fetchLoginUser = async (credentials: ILoginUser) => {
    const response = await fetch(`http://localhost:3000/auth/signin`, {
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