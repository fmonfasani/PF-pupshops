"use client";

import { useContext, useState } from "react";
import {
  isDateValid,
  getMinAndMaxDates,
} from "@/utils/validationFormAppointments";
import { IAppointment } from "@/Interfaces/interfaces";
import { NotificationRegister } from "../Notifications/NotificationRegister";
import { NotificationError } from "../Notifications/NotificationError";
import { fetchAppointment } from "@/utils/fetchUser";
import { UserContext } from "@/context/userContext";

const AppointmentForm = () => {
  const {token} = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  //TODO Obtener las fechas mínima y máxima permitidas

  const { minDate, maxDate } = getMinAndMaxDates();

  //TODO Manejar cambios en la fecha seleccionada

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    //TODO Si la fecha no es válida, limpiamos el campo y mostramos alerta

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
    console.log(
      `Día seleccionado: ${selectedDate}, Horario seleccionado: ${selectedTime}`
    );
  
    const appointment: IAppointment = {
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      serviceName: "Peluquería",
    };
  
 
    if (!token) {
      console.error("No se encontró un token de autenticación.");
      setErrors({ ...errors, general: "No se encontró un token de autenticación." });
      setShowErrorNotification(true);
      return; 
    }
  
    try {
      const success = await fetchAppointment(appointment, token);
      
      if (success) {
        setNotificationMessage(
          `Turno registrado. Día: ${appointment.appointmentDate}, Hora: ${appointment.appointmentTime}`
        );
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        
       
        setSelectedDate("");
        setSelectedTime("");
      } else {
        setErrors({ ...errors, general: "Error al sacar turno" });
        setShowErrorNotification(true);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrors({ ...errors, general: "Error durante el registro" });
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-lg space-y-6 border border-gray-200"
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
      <div className="flex flex-col">
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
        className="block w-full rounded-lg bg-teal-600 hover:bg-orange-300 px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer "
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
    </form>
  );
};

//TODO Generar los horarios de 9:00 a 20:00 con incrementos de 1 hora
const generateTimeSlots = () => {
  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
  }
  return timeSlots;
};

export default AppointmentForm;
