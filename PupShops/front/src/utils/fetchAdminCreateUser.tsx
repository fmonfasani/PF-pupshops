import { IAdminRegisterUser, IUser } from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


//Crear usuario como administrador
export const fetchAdminCreateUser = async (user: IAdminRegisterUser) => {
  console.log("Datos a enviar:", JSON.stringify(user, null, 2));

  const response = await fetch("http://localhost:3001/admin/users/register", {
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

//Ver usuarios registrados
export const fetchGetUsers = async (token: string): Promise<IUser[]> => {
  const response = await fetch(`http://localhost:3001/admin/users`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return await response.json(); 
}

