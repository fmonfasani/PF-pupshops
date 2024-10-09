'use client';
import { useContext, useEffect, useState } from 'react';
import { IUserResponse, IUserUpdateData } from '@/Interfaces/interfaces';
import { UserContext } from '@/context/userContext';

const EditProfile = () => {
  const { user,  logOut } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!user || !user.user) {
      logOut(); 
    } else {
      setLoading(false); 
    }
  }, [user, logOut]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !user.user) {
      console.log('No hay datos de usuario');
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    
    
    const updatedUserData: IUserUpdateData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      lastname: (form.elements.namedItem('lastname') as HTMLInputElement).value,
      email: user.user.email, // Se mantiene el email actual
      password: user.user.password, // Mantiene la contraseña actual
      confirmPassword: user.user.password, // Confirmación de contraseña
      phone: parseInt((form.elements.namedItem('phone') as HTMLInputElement).value, 10), // Convertir el teléfono a número
      country: user.user.country, // Mantiene el país actual
      city: user.user.city, // Mantiene la ciudad actual
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      isActive: user.user.isActive, // Mantener el estado de actividad
    };

    const userId = user.user.id?.toString(); // Convertir el ID a string

    if (!userId) {
      console.error("El ID de usuario no está disponible");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error('Error en la actualización del perfil');
      }

      const updatedUserResponse: IUserResponse = await response.json();
      setNotification('Perfil actualizado con éxito');
      console.log('Perfil actualizado:', updatedUserResponse);
      // Aquí puedes actualizar el estado del usuario si es necesario
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setNotification('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 p-6 mt-20">
      <div className="mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Nombre:</label>
              <input type="text" name="name" defaultValue={user?.user?.name || ''} className="w-full border rounded p-2" required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Apellido:</label>
              <input type="text" name="lastname" defaultValue={user?.user?.lastname || ''} className="w-full border rounded p-2" required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Teléfono:</label>
              <input type="text" name="phone" defaultValue={user?.user?.phone?.toString() || ''} className="w-full border rounded p-2" required />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Dirección:</label>
              <input type="text" name="address" defaultValue={user?.user?.address || ''} className="w-full border rounded p-2" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-xl rounded-lg hover:bg-teal-500 transition duration-300 mt-6">
            Guardar cambios
          </button>
        </form>
        {notification && <p className="mt-4 text-center text-green-500">{notification}</p>}
      </div>
    </section>
  );
};

export default EditProfile;
