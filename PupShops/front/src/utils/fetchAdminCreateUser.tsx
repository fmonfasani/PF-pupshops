import { IAdminRegisterUser, IUser } from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


//Crear usuario como administrador
export const fetchAdminCreateUser = async (user: IAdminRegisterUser) => {
    const response = await fetch(`${API_URL}/admin/users/register`, {
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
  const response = await fetch(`${API_URL}/admin/users`, {
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

