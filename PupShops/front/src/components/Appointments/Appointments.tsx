"use client";

import { useState } from "react";
import {
  isDateValid,
  getMinAndMaxDates,
} from "@/utils/validationFormAppointments";
import { fetchAppointment } from "@/utils/fetchUser";
import { IAppointment } from "@/Interfaces/interfaces";
import { NotificationRegister } from "../Notifications/NotificationRegister";
import { NotificationError } from "../Notifications/NotificationError";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `Día seleccionado: ${selectedDate}, Horario seleccionado: ${selectedTime}`
    );
    const appointment : IAppointment = {
      date: selectedDate,
      time: selectedTime
    }
    
      const success = true;
      //await fetchAppointment(appointment)
      if(success) {
        setNotificationMessage(`Turno registrado. Dia: ${appointment.date}, Hora: ${appointment.time}`);
        setShowNotification(true);
        setTimeout(() => {
        setShowNotification(false);
                         }, 5000);
        setSelectedDate('');
        setSelectedTime('')
      } else {
        setErrors({ ...errors, general: "Error al sacar turno" });
      }
    /* catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido."); 
      setShowErrorNotification(true); 
      setTimeout(() => setShowErrorNotification(false), 3000); 
  }*/
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
        className="block w-full rounded-lg bg-sky-950 px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer hover:bg-cyan-900"
      >
        Reservar Turno
      </button>
      {showNotification && <NotificationRegister message={notificationMessage} />}
      {showErrorNotification && <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />}

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
