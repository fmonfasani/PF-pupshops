"use client";
import React, { useContext, useEffect, useState } from 'react';
import { fetchAppointments } from '@/utils/fetchAdminAppointments';
import { IAppointment } from '@/Interfaces/interfaces';
import { UserContext } from '@/context/userContext';

const Appointments = () => {
  const { token } = useContext(UserContext) || { token: '' }; // Asegúrate de manejar el caso donde el contexto podría ser undefined
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAppointments = async () => {
      if (!token) {
        setError('No se ha proporcionado un token'); // Manejo de error si el token es null o undefined
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAppointments(token); // Asegúrate de que token sea un string
        setAppointments(data); // Suponiendo que `data` es un array de IAppointment
      } catch (err) {
        setError('Error al cargar los turnos');
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [token]); // Dependencia en el token para que vuelva a obtener turnos si cambia

  if (loading) return <p>Cargando turnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mis Turnos</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>Servicio:</strong> {appointment.serviceName}<br />
            <strong>Fecha:</strong> {appointment.appointmentDate}<br />
            <strong>Hora:</strong> {appointment.appointmentTime}<br />
            <strong>Estado:</strong> {appointment.status}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
