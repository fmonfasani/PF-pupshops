"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import { UserContext } from '@/context/userContext'; 
import { NotificationRegister } from '../Notifications/NotificationRegister';
import { NotificationError } from '../Notifications/NotificationError';

interface User {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

interface OrderDetails {
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  status: string;
  user: User;
  orderDetails: OrderDetails;
}

export default function OrderDetails() {
  const { token } = useContext(UserContext);
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotificationOrder, setShowNotificationOrder] = useState(false);
  const [notificationMessageOrder, setNotificationMessageOrder] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch de la orden
  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la orden');
        }

        const data: Order = await response.json();
        setOrder(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ha ocurrido un error inesperado');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id, token]);

  // Función para eliminar la orden
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setErrorMessage("'Error al eliminar la orden");
      }

      setNotificationMessageOrder(`Orden eliminada`);
      setShowNotificationOrder(true);
      setTimeout(() => {
        setShowNotificationOrder(false);
        router.push("/adminDashboard/orders");
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error inesperado');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!order) {
    return <p>No se encontró la orden.</p>;
  }

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-36 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-fit mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">
          Detalles de la Orden
        </h1>
        <p className="text-gray-600 mb-1 text-sm"> <strong>ID:  {order.id}</strong></p>
        <p className="text-gray-600 mb-1 text-sm">
          <strong>Fecha: </strong>{new Date(order.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1 text-sm"><strong>Estado: </strong>{order.status}</p>
        
        <h3 className="text-lg font-semibold text-teal-600 mb-2">Datos del Usuario</h3>
        <p className="text-gray-600 mb-1 text-sm"><strong>Nombre: </strong>{order.user.name}</p>
        <p className="text-gray-600 mb-1 text-sm"><strong>Apellido: </strong>{order.user.lastname}</p>
        <p className="text-gray-600 mb-1 text-sm"><strong>Email: </strong>{order.user.email}</p>
        <p className="text-gray-600 mb-1 text-sm"><strong>Teléfono: </strong>{order.user.phone}</p>
  
        <h3 className="text-lg font-semibold text-teal-600 mb-2">Detalles de la Orden</h3>
        <p className="text-gray-600 mb-1 text-sm"><strong>Precio: </strong>${order.orderDetails.price}</p>
        <p className="text-gray-600 mb-1 text-sm"><strong>Cantidad: </strong>{order.orderDetails.quantity}</p>

        <div className="flex justify-center">
        <button 
          onClick={handleDelete} 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Eliminar Orden
        </button>
        </div>
      </div>
      {showNotificationOrder && (
        <NotificationRegister message={notificationMessageOrder} />
      )}
       {showErrorNotification && (
        <NotificationError
          message={errorMessage}
          onClose={() => setShowErrorNotification(false)}
        />
      )}
    </div>
  );
}
