"use client"
import AdminAccesControlComponent from '@/components/AdminAccessControl/AdminAccesControlComponent'
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'



export default function AdminAccesControl() {
  const { isAdmin } = useContext(UserContext);
const router = useRouter()

const [showNotification, setShowNotification] = useState(false);
const [notificationMessage, setNotificationMessage] = useState('');
const [loading, setLoading] = useState(true);

//Ruta privada
useEffect(() => {
  if (!isAdmin) {
    setNotificationMessage(`Debes ser administrador para ver permisos`);
    setShowNotification(true);
    setLoading(false)

    setTimeout(() => {
      setShowNotification(false);
      router.push("/home");
              }, 2000);
   } else {
    setLoading(false); 
  }
}, [isAdmin, router]);

if (loading)
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
 
  return (
    <>
     {isAdmin && <AdminAccesControlComponent/> }
     {showNotification && <NotificationRegister message={notificationMessage} />}
           </>
  );
}
