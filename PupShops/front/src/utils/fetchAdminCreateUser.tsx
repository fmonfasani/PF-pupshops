import { IAdminRegisterUser } from "@/Interfaces/interfaces";

export const fetchAdminCreateUser = async (user: IAdminRegisterUser) => {
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