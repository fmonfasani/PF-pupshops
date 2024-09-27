// components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setNotification('Debes estar registrado para ingresar.');
        router.push('/login'); // Redirige a la página de inicio de sesión
      } else if (!isAdmin) {
        setNotification('Debes ser administrador para acceder a esta sección.');
        router.push('/home'); // Redirige a la página de inicio
      }
      setLoading(false);
    }, 1000); // Simula un retraso de 1 segundo

    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      {notification && <p className="text-red-600 text-center">{notification}</p>}
      {children}
    </div>
  );
};

export default PrivateRoute;
