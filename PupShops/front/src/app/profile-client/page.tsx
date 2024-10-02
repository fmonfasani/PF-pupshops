"use client"
import { useUser, UserProfile } from '@auth0/nextjs-auth0/client';
import { IUserSession } from '@/Interfaces/types'; // Asegúrate de que IUserSession tenga las propiedades necesarias
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';

const ProfilePage = () => {
  const { user: auth0User, error, isLoading: auth0Loading } = useUser();
  const router = useRouter();
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Intentamos obtener la sesión del localStorage al iniciar
    const userData = localStorage.getItem('userSession');
    if (userData) {
      setUserSession(JSON.parse(userData)); // Cargar sesión del localStorage
    }
    
    // Si hay un usuario de Auth0, guardamos su información en localStorage
    if (auth0User) {
      const mappedUserSession: IUserSession = {
        token: '', // Asigna el token apropiado aquí si es necesario
        user: {
          id: auth0User.sub || '', // Asegúrate de que este valor esté siempre definido
          email: auth0User.email || '',
          name: auth0User.name || '',
          lastname: (auth0User['http://yourapp.com/lastname'] as string) || '', // Asegúrate de que esta propiedad esté disponible
          phone: (auth0User['http://yourapp.com/phone'] as string) || '', // Asegúrate de que esta propiedad esté disponible
          address: (auth0User['http://yourapp.com/address'] as string) || '', // Asegúrate de que esta propiedad esté disponible
          role: (auth0User['http://yourapp.com/role'] as string) || '', // Asegúrate de que esta propiedad esté disponible
          orders: [], // Inicializa con un array vacío o lo que necesites
        },
      };
      
      localStorage.setItem('userSession', JSON.stringify(mappedUserSession)); // Guardar en localStorage
      setUserSession(mappedUserSession);
    }

    setLoading(false);
  }, [auth0User]);

  useEffect(() => {
    // Si no hay sesión ni en Auth0 ni en localStorage, redirigir al login
    if (!loading && !auth0User && !userSession) {
      router.push('/userDashboard/login');
      setNotificationMessage("Debes iniciar sesión");
      setShowNotification(true);
    }
  }, [auth0User, userSession, loading, router]);

  const handleLogout = () => {
    if (auth0User) {
      window.location.href = '/api/auth/logout'; // Logout de Auth0
    } else {
      localStorage.removeItem('userSession'); // Limpiar localStorage
      setUserSession(null); // Limpiar el estado
      router.push('/userDashboard/login');
    }
  };

  // Si Auth0 está cargando, mostramos el estado de carga
  if (auth0Loading || loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  // Si hay un error en Auth0, mostramos el error
  if (error) return <div>{error.message}</div>;

  return (
    <section className="bg-gray-100 p-4 mt-20">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 sm:p-10">
          <h2 className="text-2xl text-center font-bold text-blue-950 mb-8">Perfil de Usuario</h2>
          {/* Renderizamos los datos de Auth0 si está logueado con Auth0 */}
          {auth0User ? (
            <div className="text-center">
              {auth0User.picture && (
                <div className="flex justify-center">
                  <img
                    className="max-w-full h-auto"
                    src={auth0User.picture || "default-avatar-url"}
                    alt={auth0User.name || 'Usuario'}
                  />
                </div>
              )}
              <div className="mt-2">
                <p>
                  <strong>Nombre:</strong> {auth0User.name || 'Nombre no disponible'}
                </p>
                <p>
                  <strong>Email:</strong> {auth0User.email || 'Email no disponible'}
                </p>
              </div>
            </div>
          ) : (
            // Si no está logueado con Auth0, mostramos los datos del usuario del localStorage
            userSession && (
              <div className="text-center">
                <p>
                  <strong>Email:</strong> {userSession.user.email}
                </p>
                <p>
                  <strong>Nombre:</strong> {userSession.user.name}
                </p>
                <p>
                  <strong>Apellido:</strong> {userSession.user.lastname}
                </p>
                <p>
                  <strong>Teléfono:</strong> {userSession.user.phone}
                </p>
                <p>
                  <strong>Dirección:</strong> {userSession.user.address}
                </p>
              </div>
            )
          )}
          <button
            onClick={handleLogout}
            className="ml-auto w-1/4 mt-4 justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      {showNotification && <NotificationRegister message={notificationMessage} />}
    </section>
  );
};

export default ProfilePage;
