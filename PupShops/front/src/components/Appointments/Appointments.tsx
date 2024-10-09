"use client";

import { useState } from "react";
import Link from "next/link";
import {
  isDateValid,
  getMinAndMaxDates,
} from "../../utils/validationFormAppointments";
import { IAppointment } from "../../Interfaces/interfaces";
import { NotificationRegister } from "../Notifications/NotificationRegister";
import { NotificationError } from "../Notifications/NotificationError";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const { minDate, maxDate } = getMinAndMaxDates();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    if (!isDateValid(dateValue)) {
      alert(
        "La fecha no es válida. Debe ser a partir de mañana, dentro de 5 días y no ser domingo."
      );
      setSelectedDate("");
    } else {
      setSelectedDate(dateValue);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData).token : null;

    if (!token) {
      alert("Usuario no autenticado. Inicia sesión para reservar un turno.");
      return;
    }

    const appointment: IAppointment = {
      id: "",
      userId: "",
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      serviceName: "peluqueria",
      status: "reserved",
      isDeleted: false,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            serviceName: appointment.serviceName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationMessage(data.message);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setSelectedDate("");
          setSelectedTime("");
        }, 5000);
      } else {
        const errorData = await response.json();
        setErrors({
          ...errors,
          general: errorData.message || "Error al sacar turno",
        });
        setShowErrorNotification(true);
        setTimeout(() => setShowErrorNotification(false), 3000);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrors({ ...errors, general: "Error desconocido." });
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Reservar Turno
      </h2>
      <div className="flex flex-col">
        <label htmlFor="date" className="font-medium text-gray-700 mb-2">
          Día:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={minDate}
          max={maxDate}
        />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="time" className="font-medium text-gray-700 mb-2">
          Horario:
        </label>
        <select
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="" disabled>
            Seleccionar horario
          </option>
          {generateTimeSlots().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="block w-full rounded-lg bg-teal-600 hover:bg-orange-300 px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer"
      >
        Reservar Turno
      </button>
      {showNotification && (
        <NotificationRegister message={notificationMessage} />
      )}
      {showErrorNotification && (
        <NotificationError
          message={errors.general || "Error al sacar turno"}
          onClose={() => setShowErrorNotification(false)}
        />
      )}

      {/* Aquí está el botón que enlaza a MyAppointments */}
      <Link href="/MisTurnos">
        <p className="block w-full rounded-lg bg-orange-300 hover:bg-orange-500 px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer mt-4">
          Ver mis Turnos
        </p>
      </Link>
    </form>
  );
};

const generateTimeSlots = () => {
  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
  }
  return timeSlots;
};

export default AppointmentForm;
