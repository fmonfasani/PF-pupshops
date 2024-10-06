"use client"
import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { IUserResponse } from '@/Interfaces/interfaces'; // Asegúrate de importar la interfaz correcta
import { UserContext } from '@/context/userContext';

interface EditUserProfileProps {
  userData: IUserResponse;
  onCancel: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ userData, onCancel }) => {
  const [formData, setFormData] = useState({
    email: userData?.user?.email || '',
    name: userData?.user?.name || '',
    lastname: userData?.user?.lastname || '',
    phone: userData?.user?.phone || '',
    address: userData?.user?.address || '',
  });

  const [loading, setLoading] = useState(false);
  const { setUserProfile } = useContext(UserContext)!; // Usa setUserProfile del contexto

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!userData.user) {
      alert('No se encontraron datos del usuario.');
      setLoading(false);
      return;
    }

    try {
      const updatedUser = await updateUserData(userData.user.id.toString(), formData);

      // Actualiza el estado del perfil en el contexto
      setUserProfile(prevState => ({
        ...(prevState || { success: false, token: '' }), // Maneja el caso donde prevState es null
        id: userData.id, // Mantiene el id existente
        user: updatedUser,
        success: true,
        token: prevState?.token || '', // Mantiene el token existente
      }));

      alert('Datos actualizados correctamente');
      onCancel(); // Cierra el formulario al finalizar
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al actualizar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <label>Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500"
        >
          {loading ? 'Actualizando...' : 'Guardar cambios'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditUserProfile;
