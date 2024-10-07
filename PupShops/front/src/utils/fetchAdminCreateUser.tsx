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
export const fetchGetUsers = async (token:string, page = 1, limit = 8) => {
  const response = await fetch(`http://localhost:3001/admin/users`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data;
};



//Ver usuario por Id
export const fetchUserById = async (id: string, token: string) => {
  const res = await fetch(`http://localhost:3001/admin/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  });
  
  if (!res.ok) {
    throw new Error('Error al obtener el usuario');
  }

  return await res.json();
};

// Eliminar usuario
export const deleteUser = async (id: string, token: string) => {
  const res = await fetch(`http://localhost:3001/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  });
  
  if (!res.ok) {
    throw new Error('Error al eliminar el usuario');
  }

  return await res.json();
};