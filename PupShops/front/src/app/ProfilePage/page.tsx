'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUserResponse } from '@/Interfaces/interfaces';
import { UserContext } from '@/context/userContext';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';


const ProfilePage = () => {
  const router = useRouter();
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const [logoutNotificationMessage, setLogoutNotificationMessage] = useState('');
  const [showNotificationRedirect, setShowNotificationRedirect] = useState(false);
  const [notificationMessageRedirect, setNotificationMessageRedirect] = useState('');
  const [userData, setUserData] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { logOut } = useContext(UserContext);
  
  useEffect(() => {
    if (typeof window !== "undefined") { 
      const authData = localStorage.getItem("authData");
      if (authData) {
        try {
          const parsedData = JSON.parse(authData);
          setUserData(parsedData);
        } catch (error) {
          console.error("Error parsing authData", error);
        }
      }
    }
    setLoading(false); 
  }, []);
  

  useEffect(() => {
    if (!loading && !userData) {
      router.push("/userDashboard/login");
      setNotificationMessageRedirect("Debes loguearte primero");
      setShowNotificationRedirect(true);
    }
  }, [userData, loading, router]);

  const handleEdit = () => {
    router.push('ProfilePage/edit'); 
  };

  const handleLogout = () => {
    logOut();
    setLogoutNotificationMessage("Has cerrado sesión correctamente");
    setShowLogoutNotification(true);

    const logoutNotificationTimeout = setTimeout(() => {
      setShowLogoutNotification(false);
      router.push("/userDashboard/login");
    }, 3000);

    return () => clearTimeout(logoutNotificationTimeout);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!loading && !userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
          {showNotificationRedirect && (
            <NotificationRegister message={notificationMessageRedirect} />
          )}

      </div>
    );
  }

  

  return (
    <section className="bg-gray-100 p-6 mt-20">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-6 py-8">
        <div className="bg-white shadow-xl rounded-lg p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Perfil de Usuario
          </h2>
          <div className="space-y-4">
            {userData ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-gray-700 text-left">
                    Email:
                  </p>
                  <p className="text-gray-600 break-words">
                    {userData.user?.email}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-gray-700 text-left">
                    Nombre:
                  </p>
                  <p className="text-gray-600">{userData.user?.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-gray-700 text-left">
                    Apellido:
                  </p>
                  <p className="text-gray-600">{userData.user?.lastname}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-gray-700 text-left">
                    Teléfono:
                  </p>
                  <p className="text-gray-600">{userData.user?.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold text-gray-700 text-left">
                    Dirección:
                  </p>
                  <p className="text-gray-600">{userData.user?.address}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Cargando...</p>
            )}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleEdit}
              className="w-40 bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-xl rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Modificar datos
            </button>
            <button
              onClick={handleLogout}
              className="w-40 bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xl rounded-lg hover:bg-red-500 transition duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {showLogoutNotification && (
          <NotificationRegister message={logoutNotificationMessage} />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;