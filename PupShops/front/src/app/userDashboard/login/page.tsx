"use client"
import React, { useContext, useEffect, useState } from 'react'
import LoginPage from '@/components/Forms/FormsUser/LoginUser';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';



export default function Login() {
  const [token, setToken] = useState<string | null>(null);
  const { isLogged } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      setNotificationMessage(`Ya has iniciado sesión`);
      setShowNotification(true);
      setTimeout(() => {
      setShowNotification(false);
      router.push("/home");
      }, 3000);
    }
  }, [isLogged, router]);


  if (isLogged) {
    return null;
  }
  return (
    <div>
    <LoginPage setToken={setToken}/>
      {showNotification && <NotificationRegister message={notificationMessage} />}</div>
  )
}
