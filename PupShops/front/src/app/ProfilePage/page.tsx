'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUserResponse } from '@/Interfaces/interfaces';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing authData", error);
      }
    }
    setLoading(false);
  }, []);
  

  useEffect(() => {
    if (!loading && !userData) {
      router.push("/userDashboard/login");
      alert("Debes loguearte primero");
    }
  }, [userData, loading, router]);

  const handleLogout = () => {
    localStorage.removeItem("authData");
    router.push("/userDashboard/login");
  };
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 p-4 mt-16">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">
            Perfil de Usuario
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Detalles de la cuenta:</h3>
            {userData ? (
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> {userData.user?.email}
                </p>
                <p>
                  <strong>Nombre:</strong> {userData.user?.name}
                </p>
                <p>
                  <strong>Apellido:</strong>
                  {userData.user?.lastname}
                </p>
                <p>
                  <strong>Telefono:</strong> {userData.user?.phone}
                </p>
                <p>
                  <strong>Direccion:</strong> {userData.user?.address}
                </p>
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
