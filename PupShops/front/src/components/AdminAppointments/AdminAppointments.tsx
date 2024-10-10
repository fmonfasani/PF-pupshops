"use client";
import React, { useContext, useEffect, useState } from 'react';
import { fetchAppointments, deleteAppointment } from '@/utils/fetchAdminAppointments'; 
import { IAppointmentAdmin } from '@/Interfaces/interfacesAdmin';
import { UserContext } from '@/context/userContext';
import { NotificationRegister } from '../Notifications/NotificationRegister';
import {isSameDay} from 'date-fns'

const AdminAppointmentsComponent = () => {
  const { token } = useContext(UserContext) || { token: '' };
  const [appointments, setAppointments] = useState<IAppointmentAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

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

  const filteredAppointments = appointments.filter((appointment) => {
    // Filtro por estado
    const statusMatches = statusFilter === 'all' || appointment.status === statusFilter;

    // Filtro por fecha
    const appointmentDate = new Date(appointment.appointmentDate); // Convertir a objeto de fecha
    const filterDate = dateFilter ? new Date(dateFilter) : null; // Convertir el filtro de fecha a un objeto de fecha

    // Aumentar la fecha de comparación en 1 día para resolver el problema de desfase
    const adjustedFilterDate = filterDate ? new Date(filterDate.getTime() + 24 * 60 * 60 * 1000) : null;

    // Asegurarte de que la comparación se realiza sin la parte de tiempo
    const dateMatches = !adjustedFilterDate || isSameDay(appointmentDate, adjustedFilterDate);

    return statusMatches && dateMatches;
  });

  if (loading) return <p className="mt-24">Cargando turnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Mis Turnos</h2>
      
      {/* Filtros */}
      <div className="flex justify-between text-gray-600 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all" className="text-gray-600">Todos</option>
          <option value="reserved" className="text-gray-600">Reservados</option>
          <option value="canceled" className="text-gray-600">Cancelados</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded text-gray-600"
        />
      </div>

      <ul className="space-y-6">
        {filteredAppointments.map((appointment) => (
          <li
            key={appointment.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col">
              <div>
                <p className="text-lg font-semibold text-teal-700 mb-2">
                  <strong>Servicio:</strong> {appointment.service.name}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Fecha:</strong> {new Date(appointment.appointmentDate).toLocaleDateString('es-ES')}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Hora:</strong> {new Date(appointment.appointmentDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className={`text-sm font-bold ${appointment.status === 'reserved' ? 'text-teal-700' : appointment.status === 'canceled' ? 'text-red-600' : 'text-gray-600'}`}>
                  <strong>Estado:</strong> {appointment.status}
                </p>
                <div className="text-lg text-teal-700 mt-4 pt-1"><strong>Cliente:</strong></div>
                <p className="text-gray-600 mb-1">
                  <strong>Nombre:</strong> {appointment.user.name} {appointment.user.lastname}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Teléfono:</strong> {appointment.user.phone}
                </p>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(appointment.id as string)}
                  className={`py-2 px-4 rounded text-white transition-colors ${
                    appointment.status === 'reserved' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300'
                  }`}
                  disabled={appointment.status === 'canceled'}  
                >
                  {appointment.status === 'reserved' ? 'Eliminar' : 'Cancelado'}
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
