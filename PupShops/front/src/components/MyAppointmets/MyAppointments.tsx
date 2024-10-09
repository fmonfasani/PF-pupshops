"use client";
import Router from "next/router";
import { useEffect, useState } from "react";

interface IService {
  id: string;
  name: string;
}

interface IScheduledAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  service: IService;
}

interface IHistoricalAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  service: IService;
}

interface IAppointmentsResponse {
  scheduledAppointments: IScheduledAppointment[];
  historicalAppointments: IHistoricalAppointment[];
}

const MyAppointments = () => {
  const [appointments, setAppointments] =
    useState<IAppointmentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const authData = localStorage.getItem("authData");
      const token = authData ? JSON.parse(authData).token : null;

      if (!token) {
        setError("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/appointments/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los turnos.");
        }

        const data: IAppointmentsResponse = await response.json();
        setAppointments(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { scheduledAppointments = [], historicalAppointments = [] } =
    appointments || {};

  return (
    <div className="mt-36 mb-36 max-w-lg mx-auto p-8 bg-white shadow-xl rounded-xl space-y-8 border border-teal-200">
      <h2 className="text-3xl font-bold text-teal-800 text-center mb-6">
        Mis Turnos
      </h2>

      {scheduledAppointments.length === 0 &&
      historicalAppointments.length === 0 ? (
        <div className="flex justify-center column  text-gray-500 p-6 bg-teal-50 rounded-lg">
          <p>No tienes turnos programados.</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={35}
            height={20}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            ></path>
            <rect width={2} height={7} x={11} y={6} fill="currentColor" rx={1}>
              <animateTransform
                attributeName="transform"
                dur="13.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </rect>
            <rect width={2} height={9} x={11} y={11} fill="currentColor" rx={1}>
              <animateTransform
                attributeName="transform"
                dur="1.125s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </rect>
          </svg>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-teal-700 border-b border-teal-200 pb-2">
              Turnos Programados
            </h3>
            {scheduledAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-l-4 border-teal-800 pl-4 py-3 bg-teal-50 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="font-semibold text-teal-800 text-lg mb-2">
                  {appointment.service.name}
                </h4>
                <p className="text-teal-600 mb-1">
                  Fecha:{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <p className="text-teal-600 mb-1">
                  Hora:{" "}
                  {new Date(appointment.appointmentDate).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit"
                    }
                  )}
                </p>
                <p className="text-teal-700 font-medium">
                  Estado:{" "}
                  <span className="inline-block px-2 py-1 bg-teal-200 rounded-full text-sm">
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2">
              Turnos Históricos
            </h3>
            {historicalAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-l-4 border-gray-300 pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="font-semibold text-gray-800 text-lg mb-2">
                  {appointment.service.name}
                </h4>
                <p className="text-gray-600 mb-1">
                  Fecha:{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  Hora:{" "}
                  {new Date(appointment.appointmentDate).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit"
                    }
                  )}
                </p>
                <p className="text-gray-700 font-medium">
                  Estado:{" "}
                  <span className="inline-block px-2 py-1 bg-gray-200 rounded-full text-sm">
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointments;
