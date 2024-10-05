"use client"; // Asegúrate de que esta línea esté al principio del archivo

import { UserContext } from '@/context/userContext';
import { IUser } from '@/Interfaces/interfaces';
import { fetchGetUsers } from '@/utils/fetchAdminCreateUser'; // Asegúrate de que esta función esté bien implementada
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function AdminUsersDataComponent() {
  const { user, token } = useContext(UserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Estado para cargar
  const [error, setError] = useState<string | null>(null); // Estado para errores
 
  const router = useRouter();

  // Función para obtener usuarios
  const fetchUsers = async () => {
    if (!token) {
      setError('Token no disponible.'); // Establece un mensaje de error
      router.push('/login'); // Redirige si no hay token
      return; // Sale de la función si no hay token
    }

    try {
      setLoading(true);
      setError(null);
      
      const fetchedUsers = await fetchGetUsers(token); // Llama a tu función de obtención de usuarios
      setUsers(fetchedUsers); // Asigna los usuarios obtenidos al estado
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error al obtener usuarios.'); // Manejo de errores
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    fetchUsers(); // Obtiene usuarios al cargar el componente
  }, [token]); // Elimina la condición dentro del useEffect, siempre se llamará al montar

  // Filtra los usuarios según el término de búsqueda
  const filteredUsers = users.filter(user => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseTerm) ||
      user.address.toLowerCase().includes(lowerCaseTerm) ||
      user.phone.toString().includes(lowerCaseTerm)
    );
  });

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-36">
      <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">
        Usuarios Registrados
      </h1>
      <input
        type="text"
        placeholder="Buscar por nombre, dirección o teléfono"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto"
      />
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Cargando usuarios...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No hay usuarios registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col"
            >
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-teal-600 mb-2">
                    {user.name} {user.lastname}
                  </h2>
                  <p className="text-gray-600 mb-1 text-sm">Email: {user.email}</p>
                  <p className="text-gray-600 mb-1 text-sm">País: {user.country}</p>
                  <p className="text-gray-600 mb-1 text-sm">Ciudad: {user.city}</p>
                  <p className="text-gray-600 mb-1 text-sm">Teléfono: {user.phone}</p>
                  <p className="text-gray-600 mb-1 text-sm">
                    Rol: {user.isAdmin ? "Administrador" : "Usuario"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
