"use client";
import React, { useState, useEffect, useContext } from 'react';
import { fetchAppointments, fetchUserAppointments } from '@/utils/fetchAdminAppointments'; 
import { IAppointment } from '@/Interfaces/interfaces';
import { UserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { NotificationRegister } from '../Notifications/NotificationRegister';
import { NotificationError } from '../Notifications/NotificationError';

const AdminAppointments = () => {
  const { user, isAdmin, token } = useContext(UserContext); 
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [userAppointments, setUserAppointments] = useState<{ scheduledAppointments: IAppointment[], historicalAppointments: IAppointment[] }>({
    scheduledAppointments: [],
    historicalAppointments: [],
  });
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Cargar los turnos cuando el componente se monte
  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        if (isAdmin && token) { // Verifica que el usuario sea administrador y tenga un token
          const allAppointments = await fetchAppointments(token);
          setAppointments(allAppointments);
        }
      } catch (error) {
        setErrorMessage("Error al cargar los turnos.");
        setShowErrorNotification(true);
      }
    };

    fetchAllAppointments();
  }, [isAdmin, token]);

  // 2. Cargar turnos del usuario cuando el filtro sea "user"
  useEffect(() => {
    const fetchUserAppointmentsData = async () => {
      try {
        if (user && token && filter === 'user') {
          const userAppointmentsData = await fetchUserAppointments(user.id, token); // Asegúrate de definir esta función
          setUserAppointments(userAppointmentsData);
        }
      } catch (error) {
        setErrorMessage("Error al cargar los turnos del usuario.");
        setShowErrorNotification(true);
      }
    };

    fetchUserAppointmentsData();
  }, [user, token, filter]);

  // Filtrar los turnos según el filtro seleccionado en el dropdown
  const filteredAppointments = () => {
    if (filter === 'all') {
      return appointments;
    } else if (filter === 'user') {
      const allUserAppointments = [...userAppointments.scheduledAppointments, ...userAppointments.historicalAppointments];
      return statusFilter ? allUserAppointments.filter((appointment) => appointment.status === statusFilter) : allUserAppointments;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-36 mb-36 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Turnos Reservados</h2>

      {/* Filtro por tipo de turnos */}
      <div className="mb-4 hover:cursor-pointer">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos los Turnos</option>
          <option value="user">Turnos del Usuario</option>
        </select>
      </div>

      {/* Filtro por estado de los turnos del usuario */}
      {filter === 'user' && (
        <div className="mb-4">
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los Estados</option>
            <option value="reserved">Reservado</option>
            <option value="completed">Completado</option>
          </select>
        </div>
      )}

      {/* Mostrar los turnos filtrados */}
      <div className="space-y-4">
        {filteredAppointments()?.length > 0 ? (
          filteredAppointments()?.map((appointment) => (
            <div key={appointment.id} className="border border-gray-300 p-4 rounded-md">
              <p><strong>Fecha:</strong> {appointment.appointmentDate}</p>
              <p><strong>Hora:</strong> {appointment.time}</p>
              <p><strong>Estado:</strong> {appointment.status}</p>
              <p><strong>Servicio:</strong> {appointment.service?.name}</p>
            </div>
          ))
        ) : (
          <p>No hay turnos disponibles.</p>
        )}
      </div>

      {showNotification && <NotificationRegister message={notificationMessage} />}
      {showErrorNotification && (
        <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />
      )}
    </div>
  );
};

export default AdminAppointments;
