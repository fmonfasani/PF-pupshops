"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { fetchUserAppointments, cancelAppointment } from "@/utils/fetchUser";
import { format } from "date-fns";
import { IAppointment } from "@/Interfaces/interfaces";
import { NotificationRegister } from "../Notifications/NotificationRegister";

interface IUserAppointments {
  scheduledAppointments: IAppointment[];
  historicalAppointments: IAppointment[];
}

const AppointmentHistory: React.FC = () => {
  const { token } = useContext(UserContext);
  const [appointments, setAppointments] = useState<IUserAppointments | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      if (!token) {
        setError("No se ha proporcionado un token");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchUserAppointments(token);
        setAppointments(data);
      } catch (err) {
        setError("Error al obtener los turnos");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getAppointments();
    }
  }, [token]);

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!token) {
      setError("No se ha proporcionado un token");
      return;
    }

    try {
      await cancelAppointment(appointmentId, token);
      setNotificationMessage(`Turno cancelado`);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      setAppointments((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          scheduledAppointments: prev.scheduledAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "cancelled" }
              : appointment
          ),
          historicalAppointments: prev.historicalAppointments || [],
        };
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error desconocido al cancelar el turno"
      );
      console.error("Error al cancelar el turno:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <p className="mt-28 text-center text-red-600 text-xl font-semibold">
        {error}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
        Historial de Turnos
      </h2>

      {/* Turnos Agendados */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-center text-teal-700 mb-4">
          Turnos Agendados
        </h3>
        {appointments?.scheduledAppointments.length ? (
          <ul className="space-y-6">
            {appointments.scheduledAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const formattedDate = format(appointmentDate, "yyyy-MM-dd");
              const formattedTime = format(appointmentDate, "HH:mm");

              return (
                <li
                  key={appointment.id}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-lg font-semibold text-teal-700 mb-2">
                    <strong>Servicio:</strong> {appointment.serviceName}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Fecha:</strong> {formattedDate}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Hora:</strong> {formattedTime}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      appointment.status === "reserved"
                        ? "text-teal-700"
                        : "text-gray-600"
                    }`}
                  >
                    <strong>Estado:</strong> {appointment.status}
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() =>
                        handleCancelAppointment(appointment.id as string)
                      }
                      className={`py-2 px-4 rounded text-white transition-colors ${
                        appointment.status === "reserved"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-300"
                      }`}
                      disabled={appointment.status === "canceled"}
                    >
                      {appointment.status === "reserved"
                        ? "Cancelar Turno"
                        : "Cancelado"}
                    </button>
                  </div>
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
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Turnos Históricos
        </h3>
        {appointments?.historicalAppointments.length ? (
          <ul className="space-y-6">
            {appointments.historicalAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointmentDate);
              const formattedDate = format(appointmentDate, "yyyy-MM-dd");
              const formattedTime = format(appointmentDate, "HH:mm");

              return (
                <li
                  key={appointment.id}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-lg font-semibold text-teal-700 mb-2">
                    <strong>Servicio:</strong> {appointment.serviceName}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Fecha:</strong> {formattedDate}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Hora:</strong> {formattedTime}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      appointment.status === "completed"
                        ? "text-green-700"
                        : "text-gray-600"
                    }`}
                  >
                    <strong>Estado:</strong> {appointment.status}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay turnos históricos.</p>
        )}
        {showNotification && (
          <NotificationRegister message={notificationMessage} />
        )}
      </section>
    </div>
  );
};

export default AppointmentHistory;
