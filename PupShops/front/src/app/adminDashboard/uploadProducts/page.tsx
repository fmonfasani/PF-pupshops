"use client";
import UploadProductComponent from '@/components/Forms/FormsAdmin/UploadProductComponent'
import React from 'react'
import { useUserContext } from '@/context/userContext';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';


export default function UploadProducts() {
  const { user } = useUserContext(); 
  const isAdmin = user?.user?.isAdmin;
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);

  //Ruta privada
  useEffect(() => {
    if (!isAdmin) {
      setNotificationMessage(`Debes ser administrador para poder cargar productos`);
      setShowNotification(true);
      setLoading(false)

      setTimeout(() => {
        setShowNotification(false);
        router.push("/home");
                }, 2000);
     } else {
      setLoading(false); // Si es admin, se termina la carga
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
       {isAdmin && <UploadProductComponent /> }
       {showNotification && <NotificationRegister message={notificationMessage} />}
             </>
    );
  }

 