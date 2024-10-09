"use client"
import React, { useContext, useEffect, useState } from 'react';
import RegisterUser from '@/components/Forms/FormsUser/RegisterUser';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';

export default function RegisterPage() {
  const { isLogged } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [justRegistered, setJustRegistered] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (isLogged && !justRegistered) {  
      setNotificationMessage(`Debes cerrar sesión para registrar un usuario`);
      setShowNotification(true);
      setLoading(false);

      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        router.push("/ProfilePage");
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    } else {
      setLoading(false);
    }
  }, [isLogged, justRegistered, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isLogged && !showNotification && !justRegistered) { 
    return null;
  }

  return (
    <div>
      {!isLogged && <RegisterUser setJustRegistered={setJustRegistered} />}
      {showNotification && <NotificationRegister message={notificationMessage} />}
    </div>
  );
}
