"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import AdminAccesControlComponent from "@/components/AdminAccessControl/AdminAccesControlComponent";
import { NotificationRegister } from "@/components/Notifications/NotificationRegister";
import { useRouter } from "next/navigation";

export default function AdminAccesControl() {
  const { isAdmin, isLogged } = useContext(UserContext);
  const router = useRouter();
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar el estado de isAdmin y redirigir si no es admin o no está logueado
    if (loading) return;

    if (!isLogged || !isAdmin) {
      setNotificationMessage('Debes ser administrador para acceder a esta sección.');
      setShowNotification(true);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        setShowNotification(false);
        router.push("/home");
      }, 2000);
    }
  }, [isAdmin, isLogged, loading, router]);

  // Simulación de carga
  useEffect(() => {
    setLoading(false); // Finaliza la carga inmediatamente
  }, []);

  return (
    <>
      {isAdmin && <AdminAccesControlComponent />}
      {showNotification && <NotificationRegister message={notificationMessage} />}
    </>
  );
}
