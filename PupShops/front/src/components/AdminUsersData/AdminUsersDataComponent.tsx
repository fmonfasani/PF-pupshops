"use client"; // Asegúrate de que esta línea esté al principio del archivo

import { useUserContext } from '@/context/userContext';
import { IUser } from '@/Interfaces/interfaces';
import { fetchGetUsers } from '@/utils/fetchAdminCreateUser';
import React, { useEffect, useState } from 'react';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
// Array ficticio de usuarios
const mockUsers = [
  {
    id: 1,
    name: "Juan",
    lastname: "Pérez",
    email: "juan.perez@example.com",
    country: "Argentina",
    city: "Buenos Aires",
    phone: 123456789,
    address: "Av. Libertador 1234",
    isAdmin: true,
  },
  {
    id: 2,
    name: "María",
    lastname: "Gómez",
    email: "maria.gomez@example.com",
    country: "Chile",
    city: "Santiago",
    phone: 987654321,
    address: "Calle San Martín 567",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Carlos",
    lastname: "Fernández",
    email: "carlos.fernandez@example.com",
    country: "México",
    city: "Ciudad de México",
    phone: 456789123,
    address: "Calle Reforma 890",
    isAdmin: false,
  },
  {
    id: 4,
    name: "Lucía",
    lastname: "Rodríguez",
    email: "lucia.rodriguez@example.com",
    country: "España",
    city: "Madrid",
    phone: 321654987,
    address: "Calle Gran Vía 234",
    isAdmin: true,
  },
  {
    id: 5,
    name: "Sofía",
    lastname: "Martínez",
    email: "sofia.martinez@example.com",
    country: "Colombia",
    city: "Bogotá",
    phone: 654321789,
    address: "Carrera 7 456",
    isAdmin: false,
  },
];

export default function AdminUsersDataComponent() {
  const { user } = useUserContext(); // Obtén el usuario del contexto
  const [users, setUsers] = useState<IUser[]>(mockUsers); // Inicializa con mockUsers
  const [loading, setLoading] = useState(false); // Puedes cambiar esto si deseas simular carga
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const token = user?.token; // Aquí se utiliza el token del contexto

  // Comentamos la función de carga si solo usamos mockUsers
  // useEffect(() => {
  //   async function loadUsers() {
  //     if (!token) {
  //       console.error('Token no disponible');
  //       setLoading(false);
  //       return; // Sale si el token no está disponible
  //     }
  //     // Lógica para cargar usuarios aquí...
  //   }
  //   loadUsers();
  // }, [token]); // Cambia la dependencia a `token`

  // Simulando carga
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula un retraso de 1 segundo
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
    <PrivateRoute>
    <div className="bg-pink-100/80 py-12 px-4 sm:px-6 lg:px-8 mt-36">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Usuarios Registrados
      </h1>
      <input
        type="text"
        placeholder="Buscar por nombre, dirección o teléfono"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto"
      />
      {filteredUsers.length === 0 ? (
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
    </PrivateRoute>
  );
}
