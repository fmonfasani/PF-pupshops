"use client";
import OrderDetails from "@/components/AdminOrdersComponent/OrderDetails";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { NotificationRegister } from "@/components/Notifications/NotificationRegister";

export default function OrderPage() {
  const { isAdmin, isLogged } = useContext(UserContext);
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!isLogged || !isAdmin) {
      setNotificationMessage('Debes ser administrador para acceder a esta sección.');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        router.push("/home");
      }, 2000);
    }
  }, [isAdmin, isLogged, loading, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  return (
    <>
      {isAdmin && <OrderDetails />} 
      {showNotification && <NotificationRegister message={notificationMessage} />}
    </>
  );
}
