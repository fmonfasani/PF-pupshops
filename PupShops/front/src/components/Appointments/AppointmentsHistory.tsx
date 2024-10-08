import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { fetchUserAppointments } from '@/utils/fetchUser';
import { format } from 'date-fns';

interface IService {
  id: string;
  name: string;
}

interface IAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  service: IService;
}

interface IUserAppointments {
  scheduledAppointments: IAppointment[];
  historicalAppointments: IAppointment[];
}

const AppointmentHistory: React.FC = () => {
  const { token } = useContext(UserContext) 
  const [appointments, setAppointments] = useState<IUserAppointments | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAppointments = async () => {
      if (!token) {
        setError('No se ha proporcionado un token');
        setLoading(false);
        return;
      }
  
      try {
        const data = await fetchUserAppointments(token);
        setAppointments(data);
      } catch (err) {
        setError('Error al obtener los turnos');
      } finally {
        setLoading(false);
      }
    };
  
    if (token) { // Solo llama a la función si hay un token
      getAppointments();
    }
  }, [token]);
  
  

  if (loading) return <p>Cargando turnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">Historial de Turnos</h2>

      {/* Turnos Agendados */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-center text-green-700 mb-4">Turnos Agendados</h3>
        {appointments?.scheduledAppointments.length ? (
          <ul className="space-y-6">
            {appointments.scheduledAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const formattedDate = format(appointmentDate, 'yyyy-MM-dd');
              const formattedTime = format(appointmentDate, 'HH:mm');

              return (
                <li
                  key={appointment.id}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-lg font-semibold text-teal-700 mb-2">
                    <strong>Servicio:</strong> {appointment.service.name}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Fecha:</strong> {formattedDate}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Hora:</strong> {formattedTime}
                  </p>
                  <p className={`text-sm font-bold ${appointment.status === 'reserved' ? 'text-teal-700' : 'text-gray-600'}`}>
                    <strong>Estado:</strong> {appointment.status}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay turnos agendados.</p>
        )}
      </section>

      {/* Turnos Históricos */}
      <section>
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">Turnos Históricos</h3>
        {appointments?.historicalAppointments.length ? (
          <ul className="space-y-6">
            {appointments.historicalAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const formattedDate = format(appointmentDate, 'yyyy-MM-dd');
              const formattedTime = format(appointmentDate, 'HH:mm');

              return (
                <li
                  key={appointment.id}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-lg font-semibold text-teal-700 mb-2">
                    <strong>Servicio:</strong> {appointment.service.name}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Fecha:</strong> {formattedDate}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Hora:</strong> {formattedTime}
                  </p>
                  <p className={`text-sm font-bold ${appointment.status === 'completed' ? 'text-green-700' : 'text-gray-600'}`}>
                    <strong>Estado:</strong> {appointment.status}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay turnos históricos.</p>
        )}
      </section>
    </div>
  );
};

export default AppointmentHistory;
