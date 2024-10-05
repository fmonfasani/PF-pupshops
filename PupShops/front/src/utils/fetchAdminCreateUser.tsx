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

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorData.message || errorData}`);
      }

      const responseData = await response.json();

      if (responseData && typeof responseData === 'object') {
          return responseData;
      }

      return responseData; 
  } catch (error) {
      console.error('Error durante la solicitud de registro:', error);
      throw error; 
  }
};


//Ver usuarios registrados
export const fetchGetUsers = async (token:string) => {
  const response = await fetch('http://localhost:3001/admin/users', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los usuarios');
  }

  const data = await response.json();
  return data; 
};


// Obtener un usuario por ID
export const fetchGetUserById = async (token: string, userId: string) => {
  const response = await fetch(`http://localhost:3001/admin/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el usuario'); // Manejo de errores
  }

  const data = await response.json(); // Convierte la respuesta a JSON
  return data; // Devuelve el usuario
};
