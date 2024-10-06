"use client"; 
import React, { useContext, useEffect, useState } from 'react';
import LoginPage from '@/components/Forms/FormsUser/LoginUser';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';

export default function Login() {
    const { isLogged, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true); 
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      setNotificationMessage(`Has iniciado sesión`);
      setShowNotification(true);
      setLoading(false);

      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        router.push("/home");
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    } else {
      setLoading(false);
    }
  }, [isLogged, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      {!isLogged &&  <LoginPage setToken={setToken}/>}
      {showNotification && <NotificationRegister message={notificationMessage} />} 
    </div>
  );
}