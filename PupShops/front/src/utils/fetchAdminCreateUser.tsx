import { IUser, IUserResponse } from "@/Interfaces/interfaces";
import { IUserRegister } from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Crear usuario como administrador
export const fetchAdminCreateUser = async (userData: IUserRegister, token: string) => {
  try {
      const response = await fetch('http://localhost:3001/admin/users/register', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });

      // Si la respuesta no es ok, maneja el error
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorData.message || errorData}`);
      }

      // Aquí asumimos que la respuesta es un objeto JSON
      const responseData = await response.json();

      // Puedes añadir un manejo específico dependiendo de la estructura que devuelva tu backend
      // Si el backend devuelve un mensaje de éxito
      if (responseData && typeof responseData === 'object') {
          return responseData; // Devuelve los datos de respuesta
      }

      return responseData; // En caso de que sea una cadena o un objeto diferente
  } catch (error) {
      console.error('Error durante la solicitud de registro:', error);
      throw error; // Lanza el error para manejarlo en la función llamadora
  }
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

