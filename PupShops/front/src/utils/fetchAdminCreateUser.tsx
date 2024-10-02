import { IUser } from "@/Interfaces/interfaces";
import { IUserRegister } from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Crear usuario como administrador
export const fetchAdminCreateUser = async (userAdmin: IUserRegister, token: string) => {
  console.log("Token de autorización:", token);
 

  const response = await fetch(`${API_URL}/admin/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    
    body: JSON.stringify(userAdmin),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro. Por favor, verifica los datos.");
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

