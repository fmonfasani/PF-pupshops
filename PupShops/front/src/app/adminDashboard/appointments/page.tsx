"use client";
import React, { useContext } from 'react'
import { UserContext} from '@/context/userContext';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';
import AdminAppointments from '@/components/AdminAppointments/AdminAppointments';



export default function adminAppointments() {
  const { user,isAdmin } = useContext(UserContext);
    const router = useRouter()

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);

  //Ruta privada
  useEffect(() => {
    if (!isAdmin) {
      setNotificationMessage(`Debes ser administrador para ver turnos`);
      setShowNotification(true);
       router.push("/home");
              
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
       {isAdmin && <AdminAppointments/> }
       {showNotification && <NotificationRegister message={notificationMessage} />}
             </>
    );
  }

 