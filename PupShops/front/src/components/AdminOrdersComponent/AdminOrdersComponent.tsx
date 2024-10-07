"use client";
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/userContext'; // Asegúrate de que este contexto esté correctamente configurado
import { IOrder } from '@/Interfaces/interfacesAdmin';


export default function AdminOrdersComponent() {
  const { token } = useContext(UserContext); // Obtén el token del contexto
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para la búsqueda

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('No se ha proporcionado un token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las órdenes');
        }

        const data = await response.json();
        setOrders(data); // Asegúrate de que data sea un array de IOrder
      } catch (err) {
        setError('Error al cargar las órdenes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter(order => {
    // Filtrar las órdenes según el término de búsqueda (puedes ajustar esto según tus necesidades)
    return (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-36">
      <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">
        Órdenes de Productos
      </h1>
      <input
        type="text"
        placeholder="Buscar por ID de orden o estado"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto"
      />
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Cargando órdenes...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No hay órdenes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col cursor-pointer"
                onClick={() => console.log(`Clicked on order: ${order.id}`)} 
            >
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-teal-600 mb-2">
                    Orden ID: {order.id}
                  </h2>
                  <p className="text-gray-600 mb-1 text-sm"><strong>Fecha: </strong>{new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-1 text-sm"><strong>Estado: </strong> {order.status}</p>
                  <p className="text-gray-600 mb-1 text-sm"><strong>ID del Usuario: </strong>{order.userId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
