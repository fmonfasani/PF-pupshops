"use client";
import React, { useContext, useEffect, useState } from 'react';
import { fetchAppointments, deleteAppointment } from '@/utils/fetchAdminAppointments'; 
import { IAppointment } from '@/Interfaces/interfaces';
import { UserContext } from '@/context/userContext';
import { NotificationRegister } from '../Notifications/NotificationRegister';

const AdminAppointmentsComponent = () => {
  const { token } = useContext(UserContext) || { token: '' };
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  useEffect(() => {
    const getAppointments = async () => {
      if (!token) {
        setError('No se ha proporcionado un token');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAppointments(token);
        setAppointments(data);
      } catch (err) {
        setError('Error al cargar los turnos');
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) {
      setError('No se ha proporcionado un token');
      return;
    }

    try {
      await deleteAppointment(token, id);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
      setError(null);
      setNotificationMessage(`Turno eliminado`);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el turno');
    }
  };

  if (loading) return <p className="mt-24">Cargando turnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">Mis Turnos</h2>
              <ul className="space-y-6">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col">
              <div>
                <p className="text-lg font-semibold text-teal-700 mb-2">
                  <strong>Servicio:</strong> {appointment.serviceName}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Fecha:</strong> {new Date(appointment.appointmentDate).toLocaleDateString('es-ES')}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Hora:</strong> {new Date(appointment.appointmentDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p
                  className={`text-sm font-bold ${
                    appointment.status === 'reserved'
                      ? 'text-teal-700'
                      : appointment.status === 'canceled'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  <strong>Estado:</strong> {appointment.status}
                </p>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showNotification && <NotificationRegister message={notificationMessage} />}
    </div>
  );
};

export default AdminAppointmentsComponent;
